# Shopify to Google Sheets Webhook Integration

This server receives Shopify webhooks for order events and automatically syncs the data to Google Sheets.

## Setup Instructions

### 1. Install Dependencies
```bash
cd webhook-server
npm install
```

### 2. Google Sheets Setup

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google Sheets API

2. **Create Service Account:**
   - Go to IAM & Admin > Service Accounts
   - Create a new service account
   - Download the JSON credentials file
   - Rename it to `credentials.json` and place in this directory

3. **Create Google Sheet:**
   - Create a new Google Sheet
   - Share it with the service account email (found in credentials.json)
   - Copy the Sheet ID from the URL

4. **Configure Environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your values:
   ```
   SHOPIFY_WEBHOOK_SECRET=your_webhook_secret
   SHOPIFY_SHOP_DOMAIN=your-shop.myshopify.com
   GOOGLE_SHEETS_CREDENTIALS_PATH=./credentials.json
   GOOGLE_SHEET_ID=your_sheet_id_here
   GOOGLE_SHEET_NAME=Orders
   PORT=3000
   ```

### 3. Shopify Webhook Configuration

1. **Get Webhook Secret:**
   - In Shopify Admin, go to Settings > Notifications
   - Create a new webhook or edit existing
   - Copy the webhook secret

2. **Create Webhooks:**
   - Go to Settings > Notifications
   - Create webhooks for these events:
     - `orders/create` → `https://your-domain.com/webhook/orders`
     - `orders/updated` → `https://your-domain.com/webhook/orders`
     - `orders/fulfilled` → `https://your-domain.com/webhook/orders`
     - `orders/paid` → `https://your-domain.com/webhook/orders`

### 4. Deploy the Server

**Option A: Local Development with ngrok**
```bash
npm run dev
# In another terminal:
ngrok http 3000
# Use the ngrok URL for webhooks
```

**Option B: Deploy to Cloud**
- Deploy to Heroku, Railway, or any cloud provider
- Set environment variables in your hosting platform
- Use the deployed URL for webhooks

### 5. Test the Integration

1. Create a test order in your Shopify store
2. Check your Google Sheet for the new row
3. Monitor server logs for any errors

## Webhook Events Supported

- **orders/create** - New order created
- **orders/updated** - Order updated (status changes)
- **orders/fulfilled** - Order fulfilled
- **orders/paid** - Order payment completed
- **orders/cancelled** - Order cancelled

## Google Sheet Columns

The sheet will contain these columns:
- Order ID
- Order Number
- Customer Email
- Customer Name
- Total Price
- Currency
- Financial Status
- Fulfillment Status
- Created At
- Updated At
- Line Items (JSON)
- Shipping Address (JSON)
- Tags
- Note
- Webhook Received At

## Troubleshooting

1. **Check webhook signature verification**
2. **Verify Google Sheets API permissions**
3. **Check server logs for errors**
4. **Ensure webhook URL is accessible**

## Security Notes

- Always verify webhook signatures
- Use HTTPS in production
- Keep credentials secure
- Regularly rotate webhook secrets
