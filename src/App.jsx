import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';  // Assuming CartItem is where you show cart details
import './App.css';  // Make sure your CSS is updated to reflect visibility transitions

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);  // To manage cart visibility
  const [showLandingPage, setShowLandingPage] = useState(true);  // Track landing page visibility

  const handleGetStartedClick = () => {
    setShowProductList(true);  // Show product list
    setShowLandingPage(false); // Hide landing page
  };

  const handleContinueShopping = () => {
    setShowProductList(true);  // Show product list again
    setShowCart(false);         // Hide the cart
  };

  const handleViewCart = () => {
    setShowCart(true);         // Show the cart
    setShowProductList(false); // Hide the product list
  };

  return (
    <div className="app-container">
      {/* Landing Page */}
      <div className={`landing-page ${showLandingPage ? '' : 'fade-out'}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>

            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList />
        <button className="view-cart-button" onClick={handleViewCart}>View Cart</button> {/* Add this button to navigate to cart */}
      </div>

      {/* Cart */}
      <div className={`cart-container ${showCart ? 'visible' : ''}`}>
        <CartItem onContinueShopping={handleContinueShopping} />
      </div>
    </div>
  );
}

export default App;
