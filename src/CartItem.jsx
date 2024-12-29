import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const handleContinueShopping = () => {
    onContinueShopping(); // Call the function passed from the parent component
  };

  const handleIncrement = (item) => {
    if (item) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (item) => {
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    if (item) {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity; // Simple multiplication of cost and quantity for each item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}> {/* Use item.name as key */}
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">${item.cost}</div>
                <div className="cart-item-quantity">
                  <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)} 
                    disabled={item.quantity === 1} // Disable decrement if quantity is 1
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button 
                  className="cart-item-delete" 
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
