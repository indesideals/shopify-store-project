# Shopify to Google Sheets via Superblocks

This guide shows you how to set up a complete integration using Superblocks as the middleman between Shopify webhooks and Google Sheets.

## 🎯 Overview

**Flow:** Shopify → Webhook → Superblocks API → Google Sheets

1. Shopify sends webhook when order events occur
2. Superblocks API receives and processes the data
3. Superblocks writes the data to Google Sheets

## 📋 Step-by-Step Setup

### Step 1: Create Superblocks API Endpoint

1. **Login to Superblocks**
   - Go to [superblocks.com](https://superblocks.com)
   - Create a new project

2. **Create API Endpoint**
   - Click "Create" → "API"
   - Set method to `POST`
   - Name it "Shopify Webhook Handler"
   - Copy the code from `shopify-webhook-endpoint.js`

3. **Deploy the API**
   - Save and deploy your API
   - Copy the API URL (you'll need this for Shopify webhooks)

### Step 2: Create Google Sheets

1. **Create a new Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Create a new sheet
   - Name it "Shopify Orders"

2. **Add Headers (Row 1)**
   ```
   A: Order ID
   B: Order Number  
   C: Order Name
   D: Customer Email
   E: Customer Name
   F: Customer Phone
   G: Total Price
   H: Subtotal Price
   I: Total Tax
   J: Currency
   K: Financial Status
   L: Fulfillment Status
   M: Created At
   N: Updated At
   O: Line Items
   P: Shipping Address
   Q: Billing Address
   R: Tags
   S: Note
   T: Source Name
   U: Webhook Received At
   V: Webhook Event
   ```

3. **Get Sheet ID**
   - Copy the Sheet ID from the URL
   - Format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Step 3: Create Superblocks Workflow

1. **Create New Workflow**
   - In Superblocks, create a new workflow
   - Name it "Write Orders to Google Sheets"

2. **Add Trigger**
   - Add "API Call" trigger
   - Connect it to your Shopify webhook endpoint

3. **Add Google Sheets Action**
   - Add "Google Sheets" action
   - Configure to append rows to your sheet
   - Use the data from the webhook response

### Step 4: Configure Shopify Webhooks

1. **Go to Shopify Admin**
   - Settings → Notifications
   - Scroll down to "Webhooks"

2. **Create Webhooks**
   Create these webhooks (replace `YOUR_SUPERBLOCKS_API_URL`):

   **Order Created:**
   - Event: `Order creation`
   - URL: `YOUR_SUPERBLOCKS_API_URL`
   - Format: `JSON`

   **Order Updated:**
   - Event: `Order updated`
   - URL: `YOUR_SUPERBLOCKS_API_URL`
   - Format: `JSON`

   **Order Fulfilled:**
   - Event: `Order fulfillment`
   - URL: `YOUR_SUPERBLOCKS_API_URL`
   - Format: `JSON`

   **Order Paid:**
   - Event: `Order payment`
   - URL: `YOUR_SUPERBLOCKS_API_URL`
   - Format: `JSON`

### Step 5: Test the Integration

1. **Create Test Order**
   - Go to your Shopify store
   - Create a test order
   - Check your Google Sheet for the new row

2. **Monitor Logs**
   - Check Superblocks logs for any errors
   - Verify data is being written correctly

## 🔧 Configuration Details

### Superblocks API Endpoint
- **Method:** POST
- **Content-Type:** application/json
- **Authentication:** None (or add API key if needed)

### Google Sheets Integration
- **Action:** Append Row
- **Sheet:** Your Shopify Orders sheet
- **Range:** A:Z (adjust based on your columns)

### Webhook Events to Track
- `orders/create` - New order created
- `orders/updated` - Order status changed
- `orders/fulfilled` - Order fulfilled
- `orders/paid` - Payment completed
- `orders/cancelled` - Order cancelled

## 📊 Data Structure

The webhook will send comprehensive order data including:
- Customer information
- Order details and line items
- Financial status
- Fulfillment status
- Shipping and billing addresses
- Timestamps
- Tags and notes

## 🚨 Troubleshooting

1. **Webhook not firing**
   - Check Shopify webhook configuration
   - Verify API URL is correct
   - Check Superblocks API logs

2. **Data not appearing in sheets**
   - Verify Google Sheets integration
   - Check Superblocks workflow logs
   - Ensure sheet permissions are correct

3. **Missing data**
   - Check webhook payload structure
   - Verify data mapping in Superblocks
   - Review error logs

## 💡 Benefits of This Approach

- ✅ No Google Cloud Console needed
- ✅ Visual workflow builder
- ✅ Easy to modify and maintain
- ✅ Built-in error handling
- ✅ Real-time data sync
- ✅ Free tier available

## 🔄 Alternative: Direct Superblocks Integration

You can also use Superblocks' built-in Shopify integration:
1. Add Shopify as a data source
2. Create queries to fetch order data
3. Use scheduled workflows to sync data
4. Write results to Google Sheets

This approach gives you more control over when and how data is synced.
