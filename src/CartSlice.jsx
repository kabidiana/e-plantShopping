import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload; // Ensure `id` is passed in payload for uniqueness
      const existingItem = state.items.find(item => item.id === id); // Use `id` for uniqueness
      console.log('Existing item:', existingItem);
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if the item exists
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 }); // Add item if it doesn't exist
      }
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Use `id` for removal
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload; // Use `id` for the item
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        // If quantity is 0, remove the item
        if (itemToUpdate.quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
