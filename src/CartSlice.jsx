import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCost: 0
  },
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost, numericCost } = action.payload; // Use name as unique identifier
      const existingItem = state.items.find(item => item.name === name); // Check for item by name
      
      if (existingItem) {
        // If the item exists, just increase the quantity by 1
        existingItem.quantity++;
      } else {
        // If the item doesn't exist, add it with a quantity of 1
        state.items.push({
          name,
          image,
          cost,
          numericCost,
          quantity: 1,
        });
      }
      // Update total cost
      state.totalCost += numericCost;  // Add new item cost to totalCost
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const removedItem = state.items.find(item => item.name === action.payload);
      if (removedItem) {
        state.totalCost -= removedItem.numericCost * removedItem.quantity;  // Subtract the item's total cost from the total cost
      }
      state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        const prevQuantity = itemToUpdate.quantity;
        if (quantity <= 0) {
          // If quantity is less than or equal to 0, remove the item
          state.items = state.items.filter(item => item.name !== name);
        } else {
          // Otherwise, update the item's quantity
          itemToUpdate.quantity = quantity;
        }
        // Update total cost based on the change in quantity
        state.totalCost += itemToUpdate.numericCost * (quantity - prevQuantity);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
