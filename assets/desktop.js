/**
 * DESKTOP JAVASCRIPT - CLEAN AND OPTIMIZED
 * Modern desktop interactions with hover effects and animations
 */

(function() {
  'use strict';

  // Desktop state management
  const DesktopState = {
    isMenuOpen: false,
    isSearchOpen: false,
    isCartOpen: false
  };

  // Desktop Search System
  const DesktopSearch = {
    searchInput: null,
    suggestionsContainer: null,
    originalLogoHTML: '',

    showSearchInput: function() {
      const headerCenter = document.querySelector('.desktop-header-center');
      const logoArea = document.querySelector('.desktop-logo');
      
      if (!headerCenter || !logoArea) {
        console.error('Header center or logo area not found');
        return;
      }

      // Remove any existing search
      this.hideSearchInput();

      // Store original logo HTML and show/hide state
      this.originalLogoHTML = logoArea.outerHTML;
      this.originalLogoDisplay = logoArea.style.display;
      
      // Hide logo
      logoArea.style.display = 'none';

      // Create search container
      const searchContainer = document.createElement('div');
      searchContainer.id = 'desktopSearchContainer';
      searchContainer.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
      `;

      // Create search input
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.id = 'desktopSearchInput';
      searchInput.placeholder = 'Search products...';
      searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem 2.5rem 0.75rem 1rem;
        border: 2px solid #6366f1;
        border-radius: 12px;
        font-size: 16px;
        outline: none;
        background: white;
        color: #1f2937;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      `;

      // Create close button
      const closeButton = document.createElement('button');
      closeButton.id = 'desktopSearchCloseButton';
      closeButton.innerHTML = '×';
      closeButton.style.cssText = `
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 24px;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 6px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      closeButton.onclick = () => this.hideSearchInput();

      // Create suggestions container
      const suggestionsContainer = document.createElement('div');
      suggestionsContainer.id = 'desktopSearchSuggestions';
      suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: none;
      `;

      // Assemble search container
      searchContainer.appendChild(searchInput);
      searchContainer.appendChild(closeButton);
      searchContainer.appendChild(suggestionsContainer);
      headerCenter.appendChild(searchContainer);

      // Store references
      this.searchInput = searchInput;
      this.suggestionsContainer = suggestionsContainer;

      // Focus and show all products
      searchInput.focus();
      this.showAllProducts();

      // Add event listeners
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 1) {
          this.showSuggestions(query);
        } else {
          this.showAllProducts();
        }
      });

      // Close on outside click
      setTimeout(() => {
        const outsideClickHandler = (e) => {
          if (!searchContainer.contains(e.target)) {
            this.hideSearchInput();
            document.removeEventListener('click', outsideClickHandler);
          }
        };
        document.addEventListener('click', outsideClickHandler);
      }, 100);

      DesktopState.isSearchOpen = true;
    },

    hideSearchInput: function() {
      const searchContainer = document.getElementById('desktopSearchContainer');
      const headerCenter = document.querySelector('.desktop-header-center');
      const logoArea = document.querySelector('.desktop-logo');
      
      if (searchContainer) {
        searchContainer.remove();
      }

      // Restore the logo properly
      if (headerCenter && this.originalLogoHTML) {
        // Clear the header center first
        headerCenter.innerHTML = '';
        
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.originalLogoHTML;
        const restoredLogo = tempDiv.firstElementChild;
        
        if (restoredLogo) {
          // Restore the original display state
          if (this.originalLogoDisplay) {
            restoredLogo.style.display = this.originalLogoDisplay;
          } else {
            restoredLogo.style.display = 'block';
          }
          
          headerCenter.appendChild(restoredLogo);
        }
      } else if (logoArea) {
        // Fallback: just show the logo if it exists
        logoArea.style.display = 'block';
      }

      this.searchInput = null;
      this.suggestionsContainer = null;
      this.originalLogoHTML = null;
      this.originalLogoDisplay = null;
      DesktopState.isSearchOpen = false;
      
      console.log('Search hidden, logo restored');
    },

    showAllProducts: function() {
      if (!this.suggestionsContainer) return;
      
      this.suggestionsContainer.style.display = 'block';
      this.suggestionsContainer.innerHTML = '<div style="padding: 1rem; text-align: center; color: #6b7280;">Loading all products...</div>';
      
      this.fetchProducts().then(products => {
        this.displayProductSuggestions(products);
      });
    },

    showSuggestions: function(query) {
      if (!this.suggestionsContainer) return;
      
      if (query.length < 1) {
        this.showAllProducts();
        return;
      }

      this.fetchProducts().then(products => {
        const filteredProducts = products.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.price.toString().includes(query)
        );
        this.displayProductSuggestions(filteredProducts);
      });
    },

    fetchProducts: function() {
      return fetch('/collections/all/products.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => data.products || [])
        .catch(error => {
          console.error('Error fetching products:', error);
          // Return some sample products if fetch fails
          return [
            {
              title: 'Sample Product 1',
              handle: 'sample-product-1',
              price: 299,
              images: [''],
              variants: [{ price: 299 }]
            },
            {
              title: 'Sample Product 2', 
              handle: 'sample-product-2',
              price: 499,
              images: [''],
              variants: [{ price: 499 }]
            }
          ];
        });
    },

    displayProductSuggestions: function(products) {
      if (!this.suggestionsContainer) return;

      if (products.length === 0) {
        this.suggestionsContainer.innerHTML = '<div style="padding: 1rem; text-align: center; color: #6b7280;">No products found</div>';
        this.suggestionsContainer.style.display = 'block';
        return;
      }

      const html = products.slice(0, 10).map(product => {
        const image = product.images && product.images[0] ? product.images[0] : '';
        const price = product.variants && product.variants[0] ? product.variants[0].price : 0;
        const comparePrice = product.variants && product.variants[0] && product.variants[0].compare_at_price ? product.variants[0].compare_at_price : null;
        
        return `
          <div style="display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #f3f4f6; cursor: pointer; transition: background 0.2s;" 
               onmouseover="this.style.background='#f9fafb'" 
               onmouseout="this.style.background='white'"
               onclick="window.location.href='/products/${product.handle}'">
            <img src="${image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 1rem;" loading="lazy">
            <div style="flex: 1;">
              <div style="font-size: 14px; font-weight: 500; color: #1f2937; margin-bottom: 0.25rem;">${product.title}</div>
              <div style="font-size: 14px; color: #6366f1; font-weight: 600;">
                ${comparePrice && comparePrice > price ? `<span style="text-decoration: line-through; color: #9ca3af; margin-right: 0.5rem;">₹${comparePrice}</span>` : ''}
                ₹${price}
              </div>
            </div>
          </div>
        `;
      }).join('');

      this.suggestionsContainer.innerHTML = html;
      this.suggestionsContainer.style.display = 'block';
    }
  };

  // Desktop Menu System
  const DesktopMenu = {
    toggleBurgerMenu: function() {
      const burgerMenu = document.getElementById('burgerMenu');
      const burgerOverlay = document.getElementById('burgerOverlay');
      
      if (burgerMenu && burgerOverlay) {
        DesktopState.isMenuOpen = !DesktopState.isMenuOpen;
        burgerMenu.classList.toggle('active', DesktopState.isMenuOpen);
        burgerOverlay.classList.toggle('active', DesktopState.isMenuOpen);
        document.body.style.overflow = DesktopState.isMenuOpen ? 'hidden' : '';
      }
    },

    closeBurgerMenu: function() {
      const burgerMenu = document.getElementById('burgerMenu');
      const burgerOverlay = document.getElementById('burgerOverlay');
      
      if (burgerMenu && burgerOverlay) {
        DesktopState.isMenuOpen = false;
        burgerMenu.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  };

  // Desktop Cart System
  const DesktopCart = {
    items: [],
    
    init: function() {
      this.loadFromStorage();
      this.initializeDrawer();
      this.updateDisplay();
    },

    loadFromStorage: function() {
      try {
        const stored = localStorage.getItem('desktop_cart');
        this.items = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error('Error loading cart from storage:', e);
        this.items = [];
      }
    },

    saveToStorage: function() {
      try {
        localStorage.setItem('desktop_cart', JSON.stringify(this.items));
      } catch (e) {
        console.error('Error saving cart to storage:', e);
      }
    },

    addItem: function(productId, variantId, title, price, image, url, quantity = 1) {
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
      this.showSuccessNotification(title);
    },

    showSuccessNotification: function(productTitle) {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <div style="font-weight: 600; color: #065f46; margin-bottom: 2px;">Added to Cart!</div>
            <div style="font-size: 13px; color: #047857;">${productTitle}</div>
          </div>
        </div>
      `;
      
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        border: 1px solid #10b981;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        z-index: 3000;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 300px;
      `;

      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after 4 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 4000);
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
      const counts = document.querySelectorAll('.desktop-cart-count');
      const itemCount = this.getItemCount();
      
      counts.forEach(count => {
        count.textContent = itemCount;
        count.style.display = itemCount > 0 ? 'flex' : 'none';
      });

      this.updateDrawerContent();
      
    },

    initializeDrawer: function() {
      const existingPanel = document.getElementById('desktop-cart-panel');
      if (existingPanel) return;

      const panel = document.createElement('div');
      panel.id = 'desktop-cart-panel';
              panel.innerHTML = `
          <div class="desktop-cart-overlay" onclick="DesktopCart.closeDrawer()"></div>
          <div class="desktop-cart-drawer">
            <div class="desktop-cart-header">
              <div>
                <h3>Shopping Cart</h3>
                <div class="desktop-cart-security-badges">
                  <div class="security-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    Secure
                  </div>
                  <div class="security-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    SSL
                  </div>
                </div>
              </div>
              <button class="desktop-cart-close" onclick="DesktopCart.closeDrawer()">×</button>
            </div>
            <div class="desktop-cart-free-shipping" id="desktop-cart-free-shipping">
              <!-- Free shipping progress will be inserted here -->
            </div>
            <div class="desktop-cart-body" id="desktop-cart-body">
              <!-- Cart items will be inserted here -->
            </div>
            <div class="desktop-cart-footer">
              <div class="desktop-cart-breakdown">
                <div class="desktop-cart-breakdown-header" onclick="DesktopCart.toggleBreakdown()">
                  <span>Order Summary</span>
                  <svg class="breakdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
                <div class="desktop-cart-breakdown-content" id="desktop-cart-breakdown-content">
                  <!-- Breakdown content will be inserted here -->
                </div>
              </div>
              <div class="desktop-cart-total">
                <strong>Total: ₹<span id="desktop-cart-total">0.00</span></strong>
              </div>
              <button class="desktop-checkout-btn" onclick="DesktopCart.proceedToCheckout()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Secure Checkout
              </button>
              <div class="desktop-cart-payment-methods">
                <div class="payment-method-logo visa-logo" title="Visa">
                  <span>VISA</span>
                </div>
                <div class="payment-method-logo mastercard-logo" title="Mastercard">
                  <div class="mastercard-circles">
                    <div class="circle red"></div>
                    <div class="circle orange"></div>
                    <div class="circle overlap"></div>
                  </div>
                </div>
                <div class="payment-method-logo upi-logo" title="UPI">
                  <span>UPI</span>
                </div>
                <div class="payment-method-logo cod-logo" title="Cash on Delivery">
                  <span>COD</span>
                </div>
                <div class="payment-method-logo gpay-logo" title="Google Pay">
                  <span>GPay</span>
                </div>
                <div class="payment-method-logo paytm-logo" title="Paytm">
                  <span>Paytm</span>
                </div>
                <div class="payment-method-logo phonepe-logo" title="PhonePe">
                  <span>PhonePe</span>
                </div>
              </div>
            </div>
          </div>
        `;

      // Add CSS for cart drawer
      const style = document.createElement('style');
      style.textContent = `
        #desktop-cart-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2000;
          display: none;
        }
        #desktop-cart-panel.active {
          display: block;
        }
        .desktop-cart-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
        }
        .desktop-cart-drawer {
          position: absolute;
          top: 0;
          right: 0;
          width: 35%;
          min-width: 400px;
          max-width: 600px;
          height: 100%;
          background: white;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        #desktop-cart-panel.active .desktop-cart-drawer {
          transform: translateX(0);
        }
        .desktop-cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        .desktop-cart-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
        }
        .desktop-cart-security-badges {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .security-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: #10b981;
          color: white;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .desktop-cart-free-shipping {
          padding: 1rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 8px;
          margin: 0 1.5rem;
          border: 1px solid #f59e0b;
        }
        .free-shipping-progress {
          background: #e5e7eb;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin: 0.5rem 0;
        }
        .free-shipping-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          transition: width 0.3s ease;
        }
        .free-shipping-text {
          font-size: 0.85rem;
          color: #92400e;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .free-shipping-eligible {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border: 1px solid #10b981;
        }
        .free-shipping-eligible .free-shipping-text {
          color: #065f46;
        }
        .desktop-cart-close {
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
        }
        .desktop-cart-close:hover {
          background: #e5e7eb;
        }
        .desktop-cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }
        .desktop-cart-footer {
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        .desktop-cart-total {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 18px;
          color: #1f2937;
        }
        .desktop-cart-breakdown {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .desktop-cart-breakdown-header {
          padding: 0.75rem 1rem;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: #374151;
          transition: all 0.3s ease;
        }
        .desktop-cart-breakdown-header:hover {
          background: #f3f4f6;
        }
        .desktop-cart-breakdown-content {
          padding: 1rem;
          display: none;
        }
        .desktop-cart-breakdown-content.active {
          display: block;
        }
        .breakdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .breakdown-row:last-child {
          border-bottom: none;
        }
        .breakdown-label {
          color: #6b7280;
          font-size: 14px;
        }
        .breakdown-value {
          font-weight: 600;
          color: #1f2937;
        }
        .breakdown-savings {
          color: #10b981;
          font-weight: 700;
        }
        .breakdown-original {
          text-decoration: line-through;
          color: #9ca3af;
        }
        .breakdown-discount {
          color: #ef4444;
          font-weight: 600;
        }
        .breakdown-shipping {
          color: #6366f1;
          font-weight: 600;
        }
        .breakdown-arrow {
          transition: transform 0.3s ease;
        }
        .breakdown-arrow.active {
          transform: rotate(180deg);
        }
        .desktop-checkout-btn {
          width: 100%;
          padding: 1rem;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .desktop-checkout-btn:hover {
          background: #4f46e5;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .desktop-cart-payment-methods {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }
        .payment-method-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          background: white;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .payment-method-logo:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-color: #d1d5db;
        }
        .payment-method-logo svg {
          display: block;
        }
        .visa-logo {
          background: #1A1F71;
          color: white;
          font-weight: bold;
          font-size: 10px;
          letter-spacing: 1px;
        }
        .mastercard-logo {
          background: white;
          position: relative;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mastercard-circles {
          position: relative;
          width: 24px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mastercard-circles .circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: absolute;
        }
        .mastercard-circles .circle.red {
          background: #EB001B;
          left: 0;
          z-index: 1;
        }
        .mastercard-circles .circle.orange {
          background: #F79E1B;
          right: 0;
          z-index: 1;
        }
        .mastercard-circles .circle.overlap {
          background: #FF5F00;
          left: 6px;
          z-index: 2;
        }
        .upi-logo {
          background: #6F42C1;
          color: white;
          font-weight: bold;
          font-size: 9px;
        }
        .cod-logo {
          background: #059669;
          color: white;
          font-weight: bold;
          font-size: 9px;
        }
        .gpay-logo {
          background: white;
          color: #5F6368;
          font-weight: bold;
          font-size: 9px;
          border: 1px solid #E5E5E5;
        }
        .paytm-logo {
          background: #00BAF2;
          color: white;
          font-weight: bold;
          font-size: 9px;
        }
        .phonepe-logo {
          background: #5F259F;
          color: white;
          font-weight: bold;
          font-size: 8px;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(panel);
    },

    updateDrawerContent: function() {
      const cartBody = document.getElementById('desktop-cart-body');
      const cartTotal = document.getElementById('desktop-cart-total');
      const freeShippingDiv = document.getElementById('desktop-cart-free-shipping');
      
      if (!cartBody || !cartTotal || !freeShippingDiv) return;

      // Calculate total
      let total = 0;
      this.items.forEach(item => {
        total += item.price * item.quantity;
      });

      // Free shipping logic (₹299 threshold)
      const freeShippingThreshold = 299;
      const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
      const isEligibleForFreeShipping = total >= freeShippingThreshold;
      const progressPercentage = Math.min(100, (total / freeShippingThreshold) * 100);

      // Update free shipping section
      if (isEligibleForFreeShipping) {
        freeShippingDiv.className = 'desktop-cart-free-shipping free-shipping-eligible';
        freeShippingDiv.innerHTML = `
          <div class="free-shipping-text">
            🎉 You've qualified for FREE shipping!
          </div>
          <div class="free-shipping-progress">
            <div class="free-shipping-fill" style="width: 100%"></div>
          </div>
        `;
      } else {
        freeShippingDiv.className = 'desktop-cart-free-shipping';
        freeShippingDiv.innerHTML = `
          <div class="free-shipping-text">
            🚚 Add ₹${remainingForFreeShipping.toFixed(2)} more for FREE shipping
          </div>
          <div class="free-shipping-progress">
            <div class="free-shipping-fill" style="width: ${progressPercentage}%"></div>
          </div>
        `;
      }

      if (this.items.length === 0) {
        cartBody.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #6b7280;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom: 1rem; opacity: 0.5;">
              <path d="M9 22c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
              <path d="M20 22c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
              <path d="M1 1h4l2.68 13.39c.09.46.46.78.92.78h9.4c.46 0 .83-.32.92-.78L23 6H6"/>
            </svg>
            <h3 style="margin: 0 0 0.5rem 0; color: #374151;">Your cart is empty</h3>
            <p style="margin: 0 0 1rem 0; color: #6b7280;">Add some products to get started!</p>
            <button onclick="DesktopCart.closeDrawer()" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">Continue Shopping</button>
          </div>
        `;
        cartTotal.textContent = '0.00';
        freeShippingDiv.style.display = 'none';
        return;
      }

      freeShippingDiv.style.display = 'block';
      let cartHTML = '';

      this.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        cartHTML += `
          <div style="display: flex; gap: 1rem; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 1rem; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)'">
            <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #f3f4f6;">
            <div style="flex: 1;">
              <h4 style="margin: 0 0 0.5rem 0; font-size: 16px; color: #1f2937; font-weight: 600;">${item.title}</h4>
              <p style="margin: 0 0 0.75rem 0; color: #6366f1; font-weight: 700; font-size: 18px;">₹${item.price.toFixed(2)}</p>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                <div style="display: flex; align-items: center; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                  <button onclick="DesktopCart.updateQuantity('${item.variantId}', ${item.quantity - 1})" style="background: #f9fafb; border: none; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #374151; transition: all 0.2s ease;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#f9fafb'">−</button>
                  <span style="min-width: 40px; text-align: center; font-weight: 600; color: #1f2937;">${item.quantity}</span>
                  <button onclick="DesktopCart.updateQuantity('${item.variantId}', ${item.quantity + 1})" style="background: #f9fafb; border: none; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #374151; transition: all 0.2s ease;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#f9fafb'">+</button>
                </div>
                <button onclick="DesktopCart.removeItem('${item.variantId}')" style="background: none; border: none; color: #ef4444; font-size: 13px; cursor: pointer; padding: 0.5rem; border-radius: 6px; transition: all 0.2s ease; font-weight: 500;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>
                  </svg>
                  Remove
                </button>
              </div>
              <div style="font-size: 14px; color: #6b7280; font-weight: 500;">
                Subtotal: ₹${itemTotal.toFixed(2)}
              </div>
            </div>
          </div>
        `;
      });

      cartBody.innerHTML = cartHTML;
      cartTotal.textContent = total.toFixed(2);
      
      // Update breakdown
      this.updateBreakdown();
    },

    updateBreakdown: function() {
      const breakdownContent = document.getElementById('desktop-cart-breakdown-content');
      if (!breakdownContent) return;

      // Calculate totals
      let subtotal = 0;
      let originalTotal = 0;
      
      this.items.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        
        // Calculate original price (if current price is 60% of original due to 40% discount)
        // Original Price = Current Price ÷ 0.6
        const originalPricePerItem = item.price / 0.6;
        const originalItemTotal = originalPricePerItem * item.quantity;
        originalTotal += originalItemTotal;
      });

      const discountAmount = originalTotal - subtotal;
      const shippingCost = subtotal >= 299 ? 0 : 49;
      const finalTotal = subtotal + shippingCost;
      const totalSavings = discountAmount + (shippingCost === 0 ? 49 : 0); // Include shipping savings if free

      breakdownContent.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 700; color: #1f2937; font-size: 1.25rem;">Total</span>
            <span style="font-weight: 700; color: #1f2937; font-size: 1.25rem;">₹${finalTotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #6b7280; font-size: 0.875rem;">You save ₹${totalSavings.toFixed(2)}</span>
            <span style="color: #6b7280; font-size: 0.875rem;">${shippingCost === 0 ? 'Free shipping' : 'Shipping calculated at checkout'}</span>
          </div>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="color: #374151;">Subtotal</span>
            <span style="color: #1f2937;">₹${originalTotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="color: #374151;">Discount</span>
            <span style="color: #dc2626;">-₹${discountAmount.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="color: #374151;">Shipping</span>
            <span style="color: #1f2937;">${shippingCost === 0 ? 'FREE' : '₹' + shippingCost.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid #e5e7eb;">
            <span style="font-weight: 700; color: #1f2937;">Total</span>
            <span style="font-weight: 700; color: #1f2937;">₹${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      `;
    },

    toggleBreakdown: function() {
      const content = document.getElementById('desktop-cart-breakdown-content');
      const arrow = document.querySelector('.breakdown-arrow');
      
      if (content && arrow) {
        content.classList.toggle('active');
        arrow.classList.toggle('active');
      }
    },

    openDrawer: function() {
      const panel = document.getElementById('desktop-cart-panel');
      if (panel) {
        DesktopState.isCartOpen = true;
        panel.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeDrawer: function() {
      const panel = document.getElementById('desktop-cart-panel');
      if (panel) {
        DesktopState.isCartOpen = false;
        panel.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    proceedToCheckout: function() {
      if (this.items.length === 0) {
        this.showNotification('Your cart is empty');
        return;
      }

      // Add items to Shopify cart and redirect to checkout
      const formData = new FormData();
      this.items.forEach(item => {
        formData.append('items[][id]', item.variantId);
        formData.append('items[][quantity]', item.quantity);
      });

      fetch('/cart/add', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        window.location.href = '/checkout';
      })
      .catch(error => {
        console.error('Error adding items to cart:', error);
        this.showNotification('Error adding items to cart');
      });
    },

    showNotification: function(message) {
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 3000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 3000);
    }
  };

  // Global functions
  window.toggleSearch = function() {
    if (DesktopState.isSearchOpen) {
      DesktopSearch.hideSearchInput();
    } else {
      DesktopSearch.showSearchInput();
    }
  };

  window.toggleBurgerMenu = function() {
    DesktopMenu.toggleBurgerMenu();
  };

  window.closeBurgerMenu = function() {
    DesktopMenu.closeBurgerMenu();
  };

  window.openDesktopCart = function() {
    DesktopCart.openDrawer();
  };

  window.addToDesktopCart = function(productId, variantId, title, price, image, url, quantity = 1) {
    DesktopCart.addItem(productId, variantId, title, price, image, url, quantity);
    DesktopCart.openDrawer(); // Automatically open cart drawer after adding item
  };

  // Make all objects available globally
  window.DesktopCart = DesktopCart;
  window.DesktopMenu = DesktopMenu;
  window.DesktopSearch = DesktopSearch;

  // Initialize desktop functionality
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Desktop experience initialized');
    
    // Add desktop-ready class
    document.body.classList.add('desktop-ready');
    
    // Initialize cart system
    DesktopCart.init();
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (DesktopState.isSearchOpen) DesktopSearch.hideSearchInput();
        if (DesktopState.isMenuOpen) DesktopMenu.closeBurgerMenu();
        if (DesktopState.isCartOpen) DesktopCart.closeDrawer();
      }
    });

    console.log('Desktop JavaScript loaded successfully');
  });

})();
