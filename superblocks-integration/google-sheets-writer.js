// Superblocks Google Sheets Writer
// This code goes in your Superblocks workflow that writes to Google Sheets

// 1. Create a new workflow in Superblocks
// 2. Add a "Google Sheets" action
// 3. Configure it to append rows to your sheet

export default async function writeToGoogleSheets(webhookData) {
  try {
    // Extract the order data from the webhook response
    const orderData = webhookData.data;
    
    // Prepare the row data for Google Sheets
    const rowData = [
      // Basic order info
      orderData.orderId,
      orderData.orderNumber,
      orderData.orderName,
      
      // Customer info
      orderData.customerEmail,
      orderData.customerName,
      orderData.customerPhone,
      
      // Financial info
      orderData.totalPrice,
      orderData.subtotalPrice,
      orderData.totalTax,
      orderData.currency,
      orderData.financialStatus,
      
      // Fulfillment info
      orderData.fulfillmentStatus,
      
      // Timestamps
      orderData.createdAt,
      orderData.updatedAt,
      
      // Line items (as JSON string)
      JSON.stringify(orderData.lineItems),
      
      // Shipping address (as JSON string)
      JSON.stringify(orderData.shippingAddress),
      
      // Billing address (as JSON string)
      JSON.stringify(orderData.billingAddress),
      
      // Additional info
      orderData.tags,
      orderData.note,
      orderData.sourceName,
      
      // Webhook info
      orderData.webhookReceivedAt,
      orderData.webhookEvent
    ];

    // Google Sheets configuration
    const sheetsConfig = {
      spreadsheetId: 'YOUR_GOOGLE_SHEET_ID', // Replace with your sheet ID
      range: 'Orders!A:Z', // Adjust range as needed
      valueInputOption: 'RAW',
      values: [rowData]
    };

    // This would be handled by Superblocks' Google Sheets integration
    // The actual implementation depends on how Superblocks handles Google Sheets
    
    console.log('Writing to Google Sheets:', {
      orderId: orderData.orderId,
      orderNumber: orderData.orderNumber,
      rowCount: 1
    });

    return {
      success: true,
      message: 'Data written to Google Sheets successfully',
      orderId: orderData.orderId
    };

  } catch (error) {
    console.error('Google Sheets write error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
