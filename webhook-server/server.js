const express = require('express');
const crypto = require('crypto');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.raw({ type: 'application/json' }));

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SHEETS_CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Verify Shopify webhook signature
function verifyShopifyWebhook(data, signature) {
  const hmac = crypto.createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET);
  hmac.update(data, 'utf8');
  const hash = hmac.digest('base64');
  return hash === signature;
}

// Extract order data from webhook payload
function extractOrderData(orderData) {
  const order = JSON.parse(orderData);
  
  return {
    orderId: order.id,
    orderNumber: order.order_number,
    customerEmail: order.customer?.email || 'Guest',
    customerName: order.customer ? `${order.customer.first_name} ${order.customer.last_name}`.trim() : 'Guest',
    totalPrice: order.total_price,
    currency: order.currency,
    financialStatus: order.financial_status,
    fulfillmentStatus: order.fulfillment_status,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    lineItems: order.line_items?.map(item => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      sku: item.sku || 'N/A'
    })) || [],
    shippingAddress: order.shipping_address ? {
      address1: order.shipping_address.address1,
      city: order.shipping_address.city,
      province: order.shipping_address.province,
      country: order.shipping_address.country,
      zip: order.shipping_address.zip
    } : null,
    tags: order.tags || '',
    note: order.note || ''
  };
}

// Add order to Google Sheets
async function addOrderToSheet(orderData) {
  try {
    const values = [
      [
        orderData.orderId,
        orderData.orderNumber,
        orderData.customerEmail,
        orderData.customerName,
        orderData.totalPrice,
        orderData.currency,
        orderData.financialStatus,
        orderData.fulfillmentStatus,
        orderData.createdAt,
        orderData.updatedAt,
        JSON.stringify(orderData.lineItems),
        JSON.stringify(orderData.shippingAddress),
        orderData.tags,
        orderData.note,
        new Date().toISOString() // Webhook received timestamp
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${process.env.GOOGLE_SHEET_NAME}!A:N`,
      valueInputOption: 'RAW',
      resource: { values }
    });

    console.log(`Order ${orderData.orderNumber} added to Google Sheets`);
  } catch (error) {
    console.error('Error adding order to Google Sheets:', error);
    throw error;
  }
}

// Webhook endpoint for order events
app.post('/webhook/orders', async (req, res) => {
  try {
    const signature = req.get('X-Shopify-Hmac-Sha256');
    const body = req.body;

    // Verify webhook signature
    if (!verifyShopifyWebhook(body, signature)) {
      console.log('Invalid webhook signature');
      return res.status(401).send('Unauthorized');
    }

    const orderData = extractOrderData(body);
    await addOrderToSheet(orderData);

    console.log(`Webhook received for order: ${orderData.orderNumber}`);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize Google Sheets with headers if needed
async function initializeSheet() {
  try {
    const headers = [
      'Order ID',
      'Order Number',
      'Customer Email',
      'Customer Name',
      'Total Price',
      'Currency',
      'Financial Status',
      'Fulfillment Status',
      'Created At',
      'Updated At',
      'Line Items',
      'Shipping Address',
      'Tags',
      'Note',
      'Webhook Received At'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${process.env.GOOGLE_SHEET_NAME}!A1:O1`,
      valueInputOption: 'RAW',
      resource: { values: [headers] }
    });

    console.log('Google Sheet initialized with headers');
  } catch (error) {
    console.error('Error initializing sheet:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Webhook server running on port ${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/webhook/orders`);
  
  // Initialize Google Sheet with headers
  await initializeSheet();
});

module.exports = app;
