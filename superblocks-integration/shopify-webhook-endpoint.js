// Superblocks API Endpoint for Shopify Webhooks
// This code goes in your Superblocks API endpoint

// 1. Create a new API endpoint in Superblocks
// 2. Set method to POST
// 3. Add this code to handle Shopify webhooks

export default async function handler(req, res) {
  try {
    // Verify the request is from Shopify (optional but recommended)
    const signature = req.headers['x-shopify-hmac-sha256'];
    const body = JSON.stringify(req.body);
    
    // Basic validation
    if (!req.body || !req.body.id) {
      return res.status(400).json({ error: 'Invalid webhook data' });
    }

    // Extract order data from Shopify webhook
    const orderData = {
      // Basic order info
      orderId: req.body.id,
      orderNumber: req.body.order_number,
      orderName: req.body.name,
      
      // Customer info
      customerEmail: req.body.customer?.email || 'Guest',
      customerName: req.body.customer ? 
        `${req.body.customer.first_name || ''} ${req.body.customer.last_name || ''}`.trim() : 'Guest',
      customerPhone: req.body.customer?.phone || '',
      
      // Financial info
      totalPrice: req.body.total_price,
      subtotalPrice: req.body.subtotal_price,
      totalTax: req.body.total_tax,
      currency: req.body.currency,
      financialStatus: req.body.financial_status,
      
      // Fulfillment info
      fulfillmentStatus: req.body.fulfillment_status,
      
      // Timestamps
      createdAt: req.body.created_at,
      updatedAt: req.body.updated_at,
      
      // Line items (products)
      lineItems: req.body.line_items?.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        sku: item.sku || 'N/A',
        variantTitle: item.variant_title || '',
        vendor: item.vendor || ''
      })) || [],
      
      // Shipping address
      shippingAddress: req.body.shipping_address ? {
        address1: req.body.shipping_address.address1,
        address2: req.body.shipping_address.address2,
        city: req.body.shipping_address.city,
        province: req.body.shipping_address.province,
        country: req.body.shipping_address.country,
        zip: req.body.shipping_address.zip,
        phone: req.body.shipping_address.phone
      } : null,
      
      // Billing address
      billingAddress: req.body.billing_address ? {
        address1: req.body.billing_address.address1,
        address2: req.body.billing_address.address2,
        city: req.body.billing_address.city,
        province: req.body.billing_address.province,
        country: req.body.billing_address.country,
        zip: req.body.billing_address.zip,
        phone: req.body.billing_address.phone
      } : null,
      
      // Additional info
      tags: req.body.tags || '',
      note: req.body.note || '',
      sourceName: req.body.source_name || '',
      
      // Webhook info
      webhookReceivedAt: new Date().toISOString(),
      webhookEvent: req.headers['x-shopify-topic'] || 'unknown'
    };

    // Log the received data (for debugging)
    console.log('Received Shopify webhook:', {
      orderId: orderData.orderId,
      orderNumber: orderData.orderNumber,
      event: orderData.webhookEvent,
      timestamp: orderData.webhookReceivedAt
    });

    // Return the processed data
    // Superblocks will use this data to write to Google Sheets
    return res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
      data: orderData
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
