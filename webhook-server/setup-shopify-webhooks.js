const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupShopifyWebhooks() {
  console.log('🚀 Shopify Webhook Setup Helper\n');
  
  try {
    // Check if Shopify CLI is available
    execSync('shopify version', { stdio: 'pipe' });
    console.log('✅ Shopify CLI found\n');
  } catch (error) {
    console.log('❌ Shopify CLI not found. Please install it first:');
    console.log('npm install -g @shopify/cli\n');
    process.exit(1);
  }

  const shopDomain = await question('Enter your Shopify shop domain (e.g., your-shop.myshopify.com): ');
  const webhookUrl = await question('Enter your webhook server URL (e.g., https://your-app.herokuapp.com): ');
  
  console.log('\n📋 Webhook Events to Create:');
  console.log('1. orders/create - When a new order is created');
  console.log('2. orders/updated - When an order is updated');
  console.log('3. orders/fulfilled - When an order is fulfilled');
  console.log('4. orders/paid - When an order payment is completed');
  console.log('5. orders/cancelled - When an order is cancelled\n');

  const createWebhooks = await question('Do you want to create these webhooks? (y/n): ');
  
  if (createWebhooks.toLowerCase() === 'y') {
    const webhookSecret = await question('Enter webhook secret (or press Enter to generate): ');
    
    console.log('\n🔧 Creating webhooks...\n');
    
    const webhookEvents = [
      'orders/create',
      'orders/updated', 
      'orders/fulfilled',
      'orders/paid',
      'orders/cancelled'
    ];

    for (const event of webhookEvents) {
      try {
        const command = `shopify app generate webhook --topic=${event} --address=${webhookUrl}/webhook/orders`;
        console.log(`Creating webhook for ${event}...`);
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ Webhook created for ${event}\n`);
      } catch (error) {
        console.log(`❌ Failed to create webhook for ${event}: ${error.message}\n`);
      }
    }
    
    console.log('🎉 Webhook setup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Update your .env file with the webhook secret');
    console.log('2. Deploy your webhook server');
    console.log('3. Test with a sample order');
  }

  rl.close();
}

setupShopifyWebhooks().catch(console.error);
