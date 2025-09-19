/**
 * MOBILE JAVASCRIPT - CLEAN AND OPTIMIZED
 * Modern mobile interactions with touch-friendly interfaces
 */

(function() {
  'use strict';

  // Mobile state management
  const MobileState = {
    isMenuOpen: false,
    isCartOpen: false,
    isSearchOpen: false
  };

  // Mobile Menu Functions
  window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobileSideMenu');
    if (menu) {
      MobileState.isMenuOpen = !MobileState.isMenuOpen;
      menu.classList.toggle('active', MobileState.isMenuOpen);
      document.body.style.overflow = MobileState.isMenuOpen ? 'hidden' : '';
    }
  };

  window.closeMobileMenu = function() {
    const menu = document.getElementById('mobileSideMenu');
    if (menu) {
      MobileState.isMenuOpen = false;
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Mobile Search Functions
  window.openMobileSearch = function() {
    console.log('openMobileSearch called!');
    
    // Create a beautiful search overlay like desktop
    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'mobileSearchOverlay';
    searchOverlay.className = 'mobile-search-backdrop';
    searchOverlay.innerHTML = `
      <div class="mobile-search-backdrop-blur" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
        backdrop-filter: blur(12px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 60px 20px 20px 20px;
        animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        <div class="mobile-search-card" style="
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          border-radius: 24px;
          width: 100%;
          max-width: 420px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          overflow: hidden;
          transform: translateY(-20px);
          animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          position: relative;
        ">
          <!-- Header -->
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 28px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            position: relative;
            overflow: hidden;
          ">
            <!-- Background decoration -->
            <div style="
              position: absolute;
              top: -50%;
              right: -50%;
              width: 200px;
              height: 200px;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              border-radius: 50%;
            "></div>
            
            <div style="position: relative; z-index: 2;">
              <h3 style="
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: white;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
              ">🔍 Search Products</h3>
              <p style="
                margin: 2px 0 0 0;
                font-size: 12px;
                color: rgba(255,255,255,0.8);
                font-weight: 400;
              ">Find what you're looking for</p>
            </div>
            
            <button onclick="window.closeMobileSearch()" style="
              background: rgba(255, 255, 255, 0.2);
              border: 1px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              width: 32px;
              height: 32px;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
              position: relative;
              z-index: 2;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='scale(1.1)'" 
               onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1)'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- Search Form -->
          <div style="padding: 20px;">
            <div style="
              position: relative;
              margin-bottom: 16px;
            ">
              <!-- Search input container with glow effect -->
              <div style="
                position: relative;
                background: linear-gradient(145deg, #ffffff, #f8fafc);
                border-radius: 20px;
                padding: 2px;
                box-shadow: 
                  0 8px 32px rgba(99, 102, 241, 0.12),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8);
              ">
                <div style="
                  display: flex;
                  background: white;
                  border-radius: 18px;
                  overflow: hidden;
                  border: 1px solid rgba(99, 102, 241, 0.1);
                  transition: all 0.3s ease;
                " id="searchContainer">
                  <div style="
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: center;
                  ">
                    <svg style="
                      position: absolute;
                      left: 14px;
                      z-index: 2;
                      color: #9ca3af;
                      transition: color 0.3s ease;
                    " width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21L16.65 16.65"/>
                    </svg>
                    <input 
                      type="text" 
                      id="mobileSearchInput"
                      placeholder="Search products..." 
                      style="
                        width: 100%;
                        padding: 14px 14px 14px 40px;
                        border: none;
                        background: transparent;
                        font-size: 14px;
                        outline: none;
                        color: #1f2937;
                        font-weight: 500;
                      "
                      onfocus="
                        this.parentElement.parentElement.parentElement.style.boxShadow='0 12px 40px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
                        this.parentElement.parentElement.style.borderColor='rgba(99, 102, 241, 0.3)';
                        this.previousElementSibling.style.color='#6366f1';
                      "
                      onblur="
                        this.parentElement.parentElement.parentElement.style.boxShadow='0 8px 32px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
                        this.parentElement.parentElement.style.borderColor='rgba(99, 102, 241, 0.1)';
                        this.previousElementSibling.style.color='#9ca3af';
                      "
                      oninput="window.handleMobileSearchInput(this.value)"
                      onfocus="window.handleMobileSearchInput('')"
                    >
                  </div>
                  <button onclick="window.performMobileSearch()" style="
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    border: none;
                    padding: 14px 18px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                  " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21L16.65 16.65"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Search Results -->
            <div id="mobileSearchResults" style="
              max-height: 300px;
              overflow-y: auto;
              margin-top: 20px;
              display: none;
            ">
              <!-- Results will be inserted here -->
            </div>
            

            
            <!-- Popular Searches (shown when no search) -->
            <div id="mobilePopularSearches">
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                gap: 6px;
              ">
                <div style="
                  width: 3px;
                  height: 16px;
                  background: linear-gradient(135deg, #6366f1, #8b5cf6);
                  border-radius: 2px;
                "></div>
                <p style="
                  font-size: 14px;
                  color: #374151;
                  margin: 0;
                  font-weight: 600;
                ">Popular searches</p>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <button onclick="window.location.href='/products/oil-dispenser-silicone-brush-250ml'" style="
                  background: linear-gradient(135deg, #fef3e2, #fed7aa);
                  border: 1px solid #f59e0b;
                  padding: 8px 14px;
                  border-radius: 20px;
                  font-size: 12px;
                  color: #92400e;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-weight: 600;
                  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
                " onmouseover="this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(245, 158, 11, 0.3)'" 
                  onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(245, 158, 11, 0.2)'">
                  🍳 Oil Dispenser
                </button>
                <button onclick="window.location.href='/products/led-angel-night-light'" style="
                  background: linear-gradient(135deg, #f0f9ff, #bae6fd);
                  border: 1px solid #0ea5e9;
                  padding: 8px 14px;
                  border-radius: 20px;
                  font-size: 12px;
                  color: #0c4a6e;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-weight: 600;
                  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
                " onmouseover="this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(14, 165, 233, 0.3)'" 
                  onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(14, 165, 233, 0.2)'">
                  ✨ Night Light
                </button>
                <button onclick="window.location.href='/products/handheld-vegetable-slicer-4-in-1'" style="
                  background: linear-gradient(135deg, #f3e8ff, #d8b4fe);
                  border: 1px solid #a855f7;
                  padding: 8px 14px;
                  border-radius: 20px;
                  font-size: 12px;
                  color: #6b21a8;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-weight: 600;
                  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.2);
                " onmouseover="this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(168, 85, 247, 0.3)'" 
                  onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(168, 85, 247, 0.2)'">
                  🥕 Vegetable Slicer
                </button>
                <button onclick="window.handleMobileAccountAction()" style="
                  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                  border: 1px solid #10b981;
                  padding: 8px 14px;
                  border-radius: 20px;
                  font-size: 12px;
                  color: #065f46;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-weight: 600;
                  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
                " onmouseover="this.style.transform='translateY(-1px) scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.3)'" 
                  onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 2px 8px rgba(16, 185, 129, 0.2)'">
                  📦 My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing overlay if any
    const existingOverlay = document.getElementById('mobileSearchOverlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    document.body.appendChild(searchOverlay);
      document.body.style.overflow = 'hidden';
    
    // Add click outside to close functionality
    searchOverlay.addEventListener('click', function(e) {
      // Check if clicked element is the backdrop blur div or the main overlay
      if (e.target.classList.contains('mobile-search-backdrop') || 
          e.target.classList.contains('mobile-search-backdrop-blur')) {
        window.closeMobileSearch();
      }
    });
    
    // Focus on input after animation
    setTimeout(() => {
      const input = document.getElementById('mobileSearchInput');
      if (input) {
        input.focus();
      }
    }, 100);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInUp {
        from { 
          transform: translateY(40px); 
          opacity: 0; 
        }
        to { 
          transform: translateY(0); 
          opacity: 1; 
        }
      }
      .mobile-search-card:hover {
        transform: translateY(-2px) !important;
      }
    `;
    document.head.appendChild(style);
    
    console.log('Beautiful search overlay created');
  };


  window.closeMobileSearch = function() {
    const searchOverlay = document.getElementById('mobileSearchOverlay');
    if (searchOverlay) {
      MobileState.isSearchOpen = false;
      searchOverlay.remove();
      document.body.style.overflow = '';
    }
  };

  window.performMobileSearch = function() {
    const searchInput = document.getElementById('mobileSearchInput');
    if (searchInput && searchInput.value.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  };


  let searchTimeout;
  window.handleMobileSearchInput = function(query) {
    clearTimeout(searchTimeout);
    
    const resultsContainer = document.getElementById('mobileSearchResults');
    const popularSearches = document.getElementById('mobilePopularSearches');
    
    if (!query.trim()) {
      // Show all products when input is empty (focused)
      if (popularSearches) popularSearches.style.display = 'none';
      if (resultsContainer) {
        resultsContainer.style.display = 'block';
        window.searchProducts(''); // Show all products
      }
      return;
    }
    
    // Hide popular searches, show results
    if (popularSearches) popularSearches.style.display = 'none';
    if (resultsContainer) {
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b7280;">Searching...</div>';
    }
    
    // Debounce search
    searchTimeout = setTimeout(() => {
      window.searchProducts(query);
    }, 300);
  };

  window.searchProducts = function(query) {
    console.log('Searching for:', query);
    
    // Use hardcoded products with proper image URLs for now
    const hardcodedProducts = [
      {
        title: 'Oil Dispenser Silicone Brush 250ml',
        handle: 'oil-dispenser-silicone-brush-250ml',
        price: 29900,
        compare_at_price: 49900,
        featured_image: '/products/oil-dispenser-silicone-brush-250ml.jpg',
        url: '/products/oil-dispenser-silicone-brush-250ml'
      },
      {
        title: 'LED Angel Night Light',
        handle: 'led-angel-night-light',
        price: 39900,
        compare_at_price: 59900,
        featured_image: '/products/led-angel-night-light.jpg',
        url: '/products/led-angel-night-light'
      },
      {
        title: '4-in-1 Stainless Steel Bowl Colander Grater',
        handle: '4-in-1-stainless-steel-bowl-colander-grater',
        price: 69900,
        compare_at_price: 99900,
        featured_image: '/products/4-in-1-stainless-steel-bowl-colander-grater.jpg',
        url: '/products/4-in-1-stainless-steel-bowl-colander-grater'
      },
      {
        title: 'Kitchen Sink Strainer Basket',
        handle: 'kitchen-sink-strainer-basket',
        price: 14900,
        compare_at_price: 24900,
        featured_image: '/products/kitchen-sink-strainer-basket.jpg',
        url: '/products/kitchen-sink-strainer-basket'
      },
      {
        title: 'Heart Grater Slicer Set 4pc',
        handle: 'heart-grater-slicer-set-4pc',
        price: 34900,
        compare_at_price: 54900,
        featured_image: '/products/heart-grater-slicer-set-4pc.jpg',
        url: '/products/heart-grater-slicer-set-4pc'
      },
      {
        title: 'Vegetable Cleaning Brush',
        handle: 'vegetable-cleaning-brush',
        price: 19900,
        compare_at_price: 29900,
        featured_image: '/products/vegetable-cleaning-brush.jpg',
        url: '/products/vegetable-cleaning-brush'
      },
      {
        title: 'Mini Electric Food Chopper',
        handle: 'mini-electric-food-chopper',
        price: 79900,
        compare_at_price: 99900,
        featured_image: '/products/mini-electric-food-chopper.jpg',
        url: '/products/mini-electric-food-chopper'
      },
      {
        title: '360° Rotating Hook Hanger',
        handle: '360-rotating-hook-hanger',
        price: 9900,
        compare_at_price: 19900,
        featured_image: '/products/360-rotating-hook-hanger.jpg',
        url: '/products/360-rotating-hook-hanger'
      },
      {
        title: 'Mini Hand Press Chopper 3-Blade',
        handle: 'mini-hand-press-chopper-3-blade',
        price: 34900,
        compare_at_price: 54900,
        featured_image: '/products/mini-hand-press-chopper-3-blade.jpg',
        url: '/products/mini-hand-press-chopper-3-blade'
      },
      {
        title: 'Mini Steam Iron Garment Steamer',
        handle: 'mini-steam-iron-garment-steamer',
        price: 89900,
        compare_at_price: 129900,
        featured_image: '/products/mini-steam-iron-garment-steamer.jpg',
        url: '/products/mini-steam-iron-garment-steamer'
      },
      {
        title: 'Pink Flamingo LED Night Light',
        handle: 'pink-flamingo-led-night-light',
        price: 39900,
        compare_at_price: 59900,
        featured_image: '/products/pink-flamingo-led-night-light.jpg',
        url: '/products/pink-flamingo-led-night-light'
      }
    ];

    // Filter products based on search query
    let filteredProducts;
    if (!query.trim()) {
      // Show all products when query is empty
      filteredProducts = hardcodedProducts;
    } else {
      // Filter products based on search query
      filteredProducts = hardcodedProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.handle.toLowerCase().includes(query.toLowerCase())
      );
    }

    console.log('Filtered products for query:', query, filteredProducts);
    window.displayMobileSearchResults(filteredProducts);
  };

  window.displayMobileSearchResults = function(products) {
    const resultsContainer = document.getElementById('mobileSearchResults');
    if (!resultsContainer) return;

    if (products.length === 0) {
      resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b7280;">No products found</div>';
      return;
    }

    const html = products.map(product => {
      console.log('Processing product:', product);
      
      // Handle different data structures from suggest API
      let image = '';
      if (product.featured_image) {
        // Use proper Shopify image URL format
        image = product.featured_image + '&width=100&height=100&crop=center';
      } else if (product.image) {
        image = product.image + '&width=100&height=100&crop=center';
      } else if (product.featured_image_url) {
        image = product.featured_image_url + '&width=100&height=100&crop=center';
      } else if (product.images && product.images.length > 0) {
        image = product.images[0] + '&width=100&height=100&crop=center';
      } else {
        // For hardcoded products, construct proper Shopify image URL
        image = `https://cdn.shopify.com/s/files/1/0s3zsa-w1/153742344404/products/${product.handle}.jpg?width=100&height=100&crop=center`;
      }
      
      console.log('Image URL for', product.title, ':', image);
      
      const price = product.price ? (product.price / 100).toFixed(2) : '0.00';
      const comparePrice = product.compare_at_price ? (product.compare_at_price / 100).toFixed(2) : null;
      
      // Use product URL from API or fallback
      const productUrl = product.url || `/products/${product.handle}`;
      
      return `
        <div style="
          display: flex;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.2s;
          border-radius: 8px;
          margin-bottom: 4px;
        " 
        onmouseover="this.style.background='#f9fafb'" 
        onmouseout="this.style.background='white'"
        onclick="window.location.href='${productUrl}'">
          <div style="flex: 1;">
            <div style="
              font-size: 14px;
              font-weight: 500;
              color: #1f2937;
              margin-bottom: 4px;
              line-height: 1.3;
            ">${product.title}</div>
            <div style="font-size: 14px; color: #6366f1; font-weight: 600;">
              ${comparePrice && comparePrice > price ? `<span style="text-decoration: line-through; color: #9ca3af; margin-right: 8px;">₹${comparePrice}</span>` : ''}
              ₹${price}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      `;
    }).join('');

    resultsContainer.innerHTML = html;
  };

  // Mobile Cart System
  const MobileCart = {
    items: [],
    
    init: function() {
      console.log('MobileCart.init() called');
      this.loadFromStorage();
      console.log('Cart items loaded:', this.items);
      this.createCartDrawer();
      console.log('Cart drawer created');
      this.updateDisplay();
      console.log('Display updated');
      console.log('MobileCart.init() completed');
    },

    loadFromStorage: function() {
      try {
        const stored = localStorage.getItem('mobile_cart');
        this.items = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error('Error loading cart from storage:', e);
        this.items = [];
      }
    },

    saveToStorage: function() {
      try {
        localStorage.setItem('mobile_cart', JSON.stringify(this.items));
      } catch (e) {
        console.error('Error saving cart to storage:', e);
      }
    },

    addItem: function(productId, variantId, title, price, image, url, quantity = 1) {
      console.log('MobileCart.addItem called:', { productId, variantId, title, price, image, url, quantity });
      
      const existingItem = this.items.find(item => item.variantId === variantId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId: productId,
          variantId: variantId,
          title: title,
          price: parseFloat(price),
          image: image,
          url: url,
          quantity: quantity
        });
      }
      
      this.saveToStorage();
      this.updateDisplay();
      
      // Show beautiful notification
      console.log('Calling showAddToCartNotification with title:', title);
      this.showAddToCartNotification(title);
    },

    removeItem: function(variantId) {
      this.items = this.items.filter(item => item.variantId !== variantId);
      this.saveToStorage();
      this.updateDisplay();
    },

    updateQuantity: function(variantId, quantity) {
      const item = this.items.find(item => item.variantId === variantId);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(variantId);
        } else {
          item.quantity = quantity;
          this.saveToStorage();
          this.updateDisplay();
        }
      }
    },

    getTotal: function() {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getItemCount: function() {
      return this.items.reduce((count, item) => count + item.quantity, 0);
    },

    clear: function() {
      this.items = [];
      this.saveToStorage();
      this.updateDisplay();
    },

    updateDisplay: function() {
      const cartCount = document.querySelector('.mobile-cart-count');
      const itemCount = this.getItemCount();
      
      if (cartCount) {
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
      }

      this.updateDrawerContent();
    },

    createCartDrawer: function() {
      const existingDrawer = document.getElementById('mobileCartDrawer');
      if (existingDrawer) {
        existingDrawer.remove();
      }

      const drawer = document.createElement('div');
      drawer.id = 'mobileCartDrawer';
      drawer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2000;
          display: none;
      `;
      
      drawer.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);" onclick="closeMobileCart()"></div>
        <div id="mobileCartContent" style="
          position: absolute;
          top: 0;
          right: 0;
          width: 90%;
          max-width: 400px;
          height: 100%;
          background: white;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 15px rgba(0,0,0,0.2);
        ">
          <div style="padding: 12px; border-bottom: 1px solid #eee; background: linear-gradient(135deg, #f8fafc, #f1f5f9);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin: 0; font-size: 16px; color: #333;">Shopping Cart</h3>
                <div style="font-size: 12px; color: #666; margin-top: 2px;">
                  <span id="mobileCartItemCount">0</span> items
                </div>
              </div>
              <div style="display: flex; gap: 4px; align-items: center;">
                <a href="#" onclick="clearMobileCart(); return false;" style="
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  color: #dc3545;
                  text-decoration: none;
                  font-size: 12px;
                  font-weight: 500;
                  border-bottom: 1px dotted #dc3545;
                  padding-bottom: 1px;
                ">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
                  </svg>
                  Clear Cart
                </a>
                <button onclick="closeMobileCart()" style="
                  background: #f3f4f6;
                  border: none;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  font-size: 20px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">×</button>
              </div>
            </div>
          </div>
          
          <!-- Free Shipping Progress Bar -->
          <div id="mobileFreeShippingBar" style="
            padding: 7px 10px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            text-align: center;
            font-size: 12px;
            font-weight: 600;
          ">
            <!-- Free shipping content will be inserted here -->
          </div>
          
          <div id="mobileCartBody" style="flex: 1; overflow-y: auto; padding: 20px;">
            <div style="text-align: center; padding: 40px 20px; color: #666;">
              <p>Your cart is empty</p>
              <button onclick="closeMobileCart()" style="
                margin-top: 10px;
                padding: 10px 20px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
          border: none;
                border-radius: 8px;
          cursor: pointer;
              ">Continue Shopping</button>
            </div>
          </div>
          
          <div style="padding: 12px; border-top: 1px solid #eee; background: white;">
            <!-- Order Summary -->
            <div id="mobileOrderSummary" style="
              margin-bottom: 12px;
              background: #f8fafc;
              border-radius: 8px;
              overflow: hidden;
            ">
              <div onclick="window.toggleMobileOrderSummary()" style="
                padding: 8px 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                font-weight: 600;
                color: #374151;
                background: #f1f5f9;
                font-size: 14px;
              ">
                <span>Order Summary</span>
                <svg id="mobileOrderArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition: transform 0.3s ease;">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
              <div id="mobileOrderDetails" style="
                padding: 12px;
                background: white;
                display: none;
              ">
                <!-- Order breakdown will be inserted here -->
              </div>
            </div>
            
            <!-- Total -->
            <div style="margin-bottom: 12px; text-align: center;">
              <strong style="font-size: 18px;">Total: ₹<span id="mobileCheckoutTotal">0.00</span></strong>
            </div>
            
            <!-- Checkout Button -->
                        <button onclick="window.proceedToMobileCheckout()" style="
              width: 100%;
              padding: 10px;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              margin-bottom: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Secure Checkout
            </button>
            
            <!-- Payment Methods -->
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 6px;
              margin-top: 8px;
            ">
              <!-- Visa -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: #1a1f71;
                border-radius: 4px;
                font-size: 8px;
                font-weight: 700;
                color: white;
                letter-spacing: 0.5px;
              ">VISA</div>
              
              <!-- Mastercard -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                position: relative;
              ">
                <div style="position: relative; width: 20px; height: 12px;">
                  <div style="position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #eb001b; left: 0; top: 1px;"></div>
                  <div style="position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #ff5f00; left: 6px; top: 1px;"></div>
                </div>
              </div>
              
              <!-- UPI -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: #ff6600;
                border-radius: 4px;
                font-size: 8px;
                font-weight: 700;
                color: white;
              ">UPI</div>
              
              <!-- COD -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: #8b5a2b;
                border-radius: 4px;
                font-size: 8px;
                font-weight: 700;
                color: white;
              ">COD</div>
              
              <!-- GPay -->
              <div style="
          display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: #4285f4;
                border-radius: 4px;
                font-size: 7px;
                font-weight: 700;
                color: white;
              ">GPay</div>
              
              <!-- Paytm -->
              <div style="
          display: flex;
          align-items: center;
                justify-content: center;
                width: 36px;
                height: 24px;
                background: #00baf2;
                border-radius: 4px;
                font-size: 6px;
                font-weight: 700;
                color: white;
              ">Paytm</div>
              
              <!-- PhonePe -->
              <div style="
          display: flex;
          align-items: center;
          justify-content: center;
                width: 36px;
                height: 24px;
                background: #5f259f;
                border-radius: 4px;
                font-size: 6px;
                font-weight: 700;
                color: white;
              ">PhonePe</div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);
      
      // Add CSS for loading animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    },

    updateDrawerContent: function() {
      console.log('updateDrawerContent called');
      const cartBody = document.getElementById('mobileCartBody');
      const checkoutTotal = document.getElementById('mobileCheckoutTotal');
      const cartItemCount = document.getElementById('mobileCartItemCount');
      
      console.log('cartBody found:', !!cartBody);
      console.log('checkoutTotal found:', !!checkoutTotal);
      console.log('Cart items:', this.items);
      
      if (!cartBody || !checkoutTotal) {
        console.error('Cart elements not found!');
        return;
      }

      const itemCount = this.getItemCount();
      if (cartItemCount) {
        cartItemCount.textContent = itemCount;
      }

      if (this.items.length === 0) {
        cartBody.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: #666;">
            <p>Your cart is empty</p>
            <button onclick="closeMobileCart()" style="
              margin-top: 10px;
              padding: 10px 20px;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            ">Continue Shopping</button>
          </div>
        `;
        checkoutTotal.textContent = '0.00';
        return;
      }

      cartBody.innerHTML = this.items.map(item => `
        <div style="
          display: flex;
          gap: 10px;
          padding: 10px;
          background: white;
          border-radius: 8px;
          margin-bottom: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        ">
          <div style="
          width: 50px;
          height: 50px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          ">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex: 1;">
            <div style="font-size: 12px; font-weight: 600; color: #333; margin-bottom: 3px;">${item.title}</div>
            <div style="font-size: 14px; color: #6366f1; font-weight: 700; margin-bottom: 8px;">₹${(item.price * item.quantity).toFixed(2)}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button onclick="window.updateMobileCartQuantity('${item.variantId}', ${item.quantity - 1})" style="
                background: #f3f4f6;
                border: none;
                width: 26px;
                height: 26px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
          font-weight: 600;
              ">−</button>
              <span style="font-weight: 600; min-width: 16px; text-align: center; font-size: 12px;">${item.quantity}</span>
              <button onclick="window.updateMobileCartQuantity('${item.variantId}', ${item.quantity + 1})" style="
          background: #f3f4f6;
          border: none;
                width: 26px;
                height: 26px;
                border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
              ">+</button>
              <button onclick="window.removeMobileCartItem('${item.variantId}')" style="
          background: none;
          border: none;
          color: #ef4444;
          font-size: 10px;
          cursor: pointer;
                padding: 6px;
          border-radius: 4px;
          margin-left: auto;
                font-weight: 600;
              ">Remove</button>
            </div>
          </div>
        </div>
      `).join('');

      const subtotal = this.getTotal();
      const shippingCost = subtotal < 299 ? 49 : 0;
      const finalTotal = subtotal + shippingCost;
      checkoutTotal.textContent = finalTotal.toFixed(2);
      
      // Update free shipping and order summary
      this.updateMobileFreeShipping();
      this.updateMobileOrderSummary();
    },

    updateMobileFreeShipping: function() {
      const freeShippingBar = document.getElementById('mobileFreeShippingBar');
      if (!freeShippingBar) return;

      const total = this.getTotal();
      const freeShippingThreshold = 299;
      const remaining = Math.max(0, freeShippingThreshold - total);
      const progress = Math.min(100, (total / freeShippingThreshold) * 100);

      if (total >= freeShippingThreshold) {
        // Free shipping unlocked
        freeShippingBar.style.background = 'linear-gradient(135deg, #059669, #047857)';
        freeShippingBar.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>🚚</span>
            <span>FREE shipping unlocked! 🎉</span>
          </div>
        `;
      } else {
        // Show progress towards free shipping
        freeShippingBar.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        freeShippingBar.innerHTML = `
          <div style="margin-bottom: 8px;">
            <span>🚚 Add ₹${remaining.toFixed(2)} more for FREE shipping!</span>
          </div>
          <div style="
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            overflow: hidden;
          ">
            <div style="
              width: ${progress}%;
              height: 100%;
              background: white;
              border-radius: 4px;
              transition: width 0.3s ease;
            "></div>
          </div>
        `;
      }
    },

    updateMobileOrderSummary: function() {
      const orderDetails = document.getElementById('mobileOrderDetails');
      if (!orderDetails) return;

      const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const originalPrice = subtotal / 0.6; // Assuming 40% discount
      const discountAmount = originalPrice - subtotal;
      const shipping = subtotal >= 299 ? 0 : 49;
      const total = subtotal + shipping;
      const savings = discountAmount + (subtotal >= 299 ? 49 : 0);

      orderDetails.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #6b7280;">
          <span>Items Total</span>
          <span>₹${originalPrice.toFixed(2)}</span>
          </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #059669; font-weight: 600;">
          <span>Discount (40%)</span>
          <span>-₹${discountAmount.toFixed(2)}</span>
            </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #6b7280;">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toFixed(2)}</span>
          </div>
        <div style="border-top: 1px solid #e5e7eb; margin: 12px 0; padding-top: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 16px; font-weight: 700; color: #1f2937;">
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
        </div>
        <div style="
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin-top: 12px;
        ">
          <div style="font-size: 14px; font-weight: 600; color: #059669;">
            🎉 You're saving ₹${savings.toFixed(2)}!
          </div>
        </div>
      `;
    },

    proceedToCheckout: function() {
      if (this.items.length === 0) {
        this.showToast('Your cart is empty');
        return;
      }

      // Show loading state
      const checkoutBtn = document.querySelector('[onclick="window.proceedToMobileCheckout()"]');
      if (checkoutBtn) {
        checkoutBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Processing...
        `;
        checkoutBtn.disabled = true;
      }

      // Build cart URL with items
      const cartItems = this.items.map(item => `${item.variantId}:${item.quantity}`).join(',');
      const cartUrl = `/cart/${cartItems}`;
      
      // Redirect to cart with items
      setTimeout(() => {
        window.location.href = cartUrl;
      }, 800);
    },

    showAddToCartNotification: function(productTitle) {
      console.log('showAddToCartNotification called with:', productTitle);
      
      // Remove any existing notification
      const existingNotification = document.querySelector('.mobile-add-to-cart-notification');
      if (existingNotification) {
        existingNotification.remove();
      }

      const notification = document.createElement('div');
      notification.className = 'mobile-add-to-cart-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
            </svg>
          </div>
          <div class="notification-text">
            <div class="notification-title">Added to Cart!</div>
            <div class="notification-product">${productTitle}</div>
          </div>
          <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
        .mobile-add-to-cart-notification {
          position: fixed;
          top: 20px;
          left: 16px;
          right: 16px;
          z-index: 9999;
          animation: slideDownNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification-content {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .notification-icon {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .notification-text {
          flex: 1;
          min-width: 0;
        }
        
        .notification-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .notification-product {
          font-size: 13px;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .notification-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        
        .notification-close:active {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0.95);
        }
        
        @keyframes slideDownNotification {
          from { 
            transform: translateY(-100px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes slideUpNotification {
          from { 
            transform: translateY(0); 
            opacity: 1; 
          }
          to { 
            transform: translateY(-100px); 
            opacity: 0; 
          }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(notification);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.style.animation = 'slideUpNotification 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          setTimeout(() => {
            if (notification.parentElement) {
              notification.remove();
              style.remove();
            }
          }, 300);
        }
      }, 3000);
    },

    showToast: function(message) {
      // Fallback toast for other messages
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        animation: slideDown 0.3s ease;
      `;
      toast.textContent = message;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-50px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(toast);

      setTimeout(() => {
        if (toast.parentElement) {
        toast.remove();
        style.remove();
        }
      }, 3000);
    },

    updateFreeShipping: function() {
      const subtotal = this.getTotal();
      const freeShippingThreshold = 299;
      const remaining = Math.max(0, freeShippingThreshold - subtotal);
      const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
      
      const freeShippingDiv = document.getElementById('mobileFreeShipping');
      
      if (subtotal >= freeShippingThreshold) {
        if (freeShippingDiv) {
          freeShippingDiv.classList.add('unlocked');
          freeShippingDiv.innerHTML = `
            <div>🎉 FREE shipping unlocked!</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 100%"></div>
            </div>
          `;
        }
      } else {
        if (freeShippingDiv) {
          freeShippingDiv.classList.remove('unlocked');
          freeShippingDiv.innerHTML = `
            <div>Add ₹${remaining.toFixed(0)} for FREE shipping</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          `;
        }
      }
    },

    updateOrderSummary: function() {
      const subtotal = this.getTotal();
      const discountRate = 0.4; // 40% discount
      const discountAmount = subtotal * discountRate;
      const shippingCost = subtotal >= 299 ? 0 : 49;
      const total = subtotal - discountAmount + shippingCost;
      const totalSavings = discountAmount;
      
      const summaryDetails = document.getElementById('mobileSummaryDetails');
      const checkoutTotal = document.getElementById('mobileCheckoutTotal');
      
      if (summaryDetails) {
        summaryDetails.innerHTML = `
          <div class="breakdown-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          <div class="breakdown-row discount">
            <span>Discount (40%)</span>
            <span>-₹${discountAmount.toFixed(2)}</span>
          </div>
          <div class="breakdown-row">
            <span>Shipping</span>
            <span>₹${shippingCost.toFixed(2)}</span>
          </div>
          <div class="breakdown-row savings">
            <span>You Save</span>
            <span>₹${totalSavings.toFixed(2)}</span>
          </div>
        `;
      }
      
      if (checkoutTotal) checkoutTotal.textContent = total.toFixed(2);
    },

    toggleSummary: function() {
      const summaryDetails = document.getElementById('mobileSummaryDetails');
      const arrow = document.querySelector('.breakdown-arrow');
      
      if (summaryDetails) {
        summaryDetails.classList.toggle('expanded');
        if (arrow) {
          arrow.style.transform = summaryDetails.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    }
  };

  // Mobile Cart Functions
  window.openMobileCart = function() {
    console.log('openMobileCart called');
    const cartDrawer = document.getElementById('mobileCartDrawer');
    const cartContent = document.getElementById('mobileCartContent');
    console.log('Cart drawer found:', !!cartDrawer);
    console.log('Cart content found:', !!cartContent);
    
    if (cartDrawer && cartContent) {
      MobileState.isCartOpen = true;
      cartDrawer.style.display = 'block';
      setTimeout(() => {
        cartContent.style.transform = 'translateX(0)';
      }, 10);
      document.body.style.overflow = 'hidden';
      console.log('Cart opened successfully');
    } else {
      console.error('Cart drawer or content not found!');
    }
  };

  window.closeMobileCart = function() {
    const cartDrawer = document.getElementById('mobileCartDrawer');
    const cartContent = document.getElementById('mobileCartContent');
    
    if (cartDrawer && cartContent) {
      MobileState.isCartOpen = false;
      cartContent.style.transform = 'translateX(100%)';
      setTimeout(() => {
        cartDrawer.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    }
  };

  window.addToMobileCart = function(productId, variantId, title, price, image, url, quantity = 1) {
    console.log('window.addToMobileCart called:', { productId, variantId, title, price, image, url, quantity });
    MobileCart.addItem(productId, variantId, title, price, image, url, quantity);
    window.openMobileCart(); // Automatically open mobile cart after adding item
  };


  // Global functions for cart buttons
  window.updateMobileCartQuantity = function(variantId, newQuantity) {
    console.log('updateMobileCartQuantity called:', variantId, newQuantity);
    MobileCart.updateQuantity(variantId, newQuantity);
  };

  window.removeMobileCartItem = function(variantId) {
    console.log('removeMobileCartItem called:', variantId);
    MobileCart.removeItem(variantId);
  };

  window.clearMobileCart = function() {
    console.log('clearMobileCart called');
    try {
      if (typeof MobileCart !== 'undefined') {
        MobileCart.items = [];
        localStorage.setItem('mobile_cart', JSON.stringify([]));
        MobileCart.updateCartDisplay();
        MobileCart.updateCartCount();
        console.log('Cart cleared successfully');
      } else {
        console.error('MobileCart is not defined');
        // Fallback: clear localStorage directly
        localStorage.setItem('mobile_cart', JSON.stringify([]));
        localStorage.setItem('localCart', JSON.stringify([]));
        location.reload();
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Fallback: clear localStorage and reload
      localStorage.setItem('mobile_cart', JSON.stringify([]));
      localStorage.setItem('localCart', JSON.stringify([]));
      location.reload();
    }
  };

  window.handleMobileAccountAction = function() {
    console.log('handleMobileAccountAction called');
    // Check if user is logged in by looking for customer data
    fetch('/account')
      .then(response => {
        if (response.ok) {
          // User is logged in, redirect to account page
          console.log('User is logged in, redirecting to account');
          window.location.href = '/account';
        } else {
          // User is not logged in, redirect to login page
          console.log('User is not logged in, redirecting to login');
          window.location.href = '/account/login';
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
        // Fallback: redirect to login page
        window.location.href = '/account/login';
      });
  };

  window.proceedToMobileCheckout = function() {
    console.log('proceedToMobileCheckout called');
    MobileCart.proceedToCheckout();
  };

  window.toggleMobileOrderSummary = function() {
    const orderDetails = document.getElementById('mobileOrderDetails');
    const orderArrow = document.getElementById('mobileOrderArrow');
    
    if (orderDetails && orderArrow) {
      const isExpanded = orderDetails.style.display === 'block';
      orderDetails.style.display = isExpanded ? 'none' : 'block';
      orderArrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  };



  // Mobile Newsletter Function
  window.handleNewsletterSubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const messageDiv = document.getElementById('newsletter-message');
    
    if (email) {
      messageDiv.textContent = 'Thank you for subscribing!';
      messageDiv.style.display = 'block';
      messageDiv.style.color = '#10b981';
      document.getElementById('newsletter-email').value = '';
      
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000);
    }
  };

  // Initialize mobile functionality
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile experience initialized');
    console.log('Body classes:', document.body.className);
    
    // Add Enter key support for search (will be added dynamically when search opens)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const searchInput = document.getElementById('mobileSearchInput');
        if (searchInput && document.activeElement === searchInput) {
          performMobileSearch();
        }
      }
    });
    console.log('MobileCart object:', typeof MobileCart);
    
    // Add mobile-ready class
    document.body.classList.add('mobile-ready');
    
    // Initialize cart system
    console.log('Initializing MobileCart...');
    MobileCart.init();
    console.log('MobileCart initialized');
    


    // Close overlays when clicking outside
    document.addEventListener('click', function(e) {
      // Close search if clicking outside
      if (MobileState.isSearchOpen && !e.target.closest('.mobile-search-container') && !e.target.closest('.mobile-action-btn')) {
        closeMobileSearch();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (MobileState.isSearchOpen) closeMobileSearch();
        if (MobileState.isMenuOpen) closeMobileMenu();
        if (MobileState.isCartOpen) closeMobileCart();
      }
    });

    console.log('Mobile JavaScript loaded successfully');
  });

  // Global clear cart function (backup)
  window.clearMobileCart = function() {
    console.log('Global clearMobileCart called');
    try {
      if (typeof MobileCart !== 'undefined') {
        MobileCart.items = [];
        localStorage.setItem('mobile_cart', JSON.stringify([]));
        MobileCart.updateCartDisplay();
        MobileCart.updateCartCount();
        console.log('Cart cleared successfully');
      } else {
        console.error('MobileCart is not defined');
        localStorage.setItem('mobile_cart', JSON.stringify([]));
        localStorage.setItem('localCart', JSON.stringify([]));
        location.reload();
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      localStorage.setItem('mobile_cart', JSON.stringify([]));
      localStorage.setItem('localCart', JSON.stringify([]));
      location.reload();
    }
  };

})();
