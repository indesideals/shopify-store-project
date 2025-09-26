// Alternative: Direct Shopify Integration in Superblocks
// This approach uses Superblocks' built-in Shopify integration

// 1. Add Shopify as a data source in Superblocks
// 2. Create queries to fetch order data
// 3. Use scheduled workflows to sync data

export default async function syncShopifyOrders() {
  try {
    // Query Shopify for recent orders
    const ordersQuery = `
      query getOrders($first: Int!, $after: String) {
        orders(first: $first, after: $after) {
          edges {
            node {
              id
              orderNumber
              name
              email
              totalPrice
              subtotalPrice
              totalTax
              currency
              financialStatus
              fulfillmentStatus
              createdAt
              updatedAt
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    price
                    sku
                    variantTitle
                  }
                }
              }
              shippingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              billingAddress {
                address1
                address2
                city
                province
                country
                zip
                phone
              }
              tags
              note
              sourceName
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Execute the query
    const response = await fetch('https://your-shop.myshopify.com/admin/api/2023-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'YOUR_ACCESS_TOKEN'
      },
      body: JSON.stringify({
        query: ordersQuery,
        variables: {
          first: 50,
          after: null
        }
      })
    });

    const data = await response.json();
    const orders = data.data.orders.edges.map(edge => edge.node);

    // Process each order
    const processedOrders = orders.map(order => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      orderName: order.name,
      customerEmail: order.email,
      totalPrice: order.totalPrice,
      subtotalPrice: order.subtotalPrice,
      totalTax: order.totalTax,
      currency: order.currency,
      financialStatus: order.financialStatus,
      fulfillmentStatus: order.fulfillmentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      lineItems: order.lineItems.edges.map(edge => edge.node),
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      tags: order.tags,
      note: order.note,
      sourceName: order.sourceName,
      syncedAt: new Date().toISOString()
    }));

    // Write to Google Sheets
    const sheetsData = processedOrders.map(order => [
      order.orderId,
      order.orderNumber,
      order.orderName,
      order.customerEmail,
      order.totalPrice,
      order.currency,
      order.financialStatus,
      order.fulfillmentStatus,
      order.createdAt,
      order.updatedAt,
      JSON.stringify(order.lineItems),
      JSON.stringify(order.shippingAddress),
      JSON.stringify(order.billingAddress),
      order.tags,
      order.note,
      order.sourceName,
      order.syncedAt
    ]);

    return {
      success: true,
      ordersProcessed: processedOrders.length,
      data: sheetsData
    };

  } catch (error) {
    console.error('Shopify sync error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
