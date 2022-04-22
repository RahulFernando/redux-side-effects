import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const index = state.items.findIndex((item) => item.id === newItem.id);
      const existing = state.items[index];

      if (!existing) {
        return {
          ...state,
          items: state.items.concat({
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
          }),
          totalQuantity: state.totalQuantity + 1,
          changed: true
        };
      }

      const updatedItem = {
        ...existing,
        quantity: existing.quantity + 1,
        totalPrice: existing.totalPrice + newItem.price,
      };

      const updatedItems = [...state.items];
      updatedItems[index] = updatedItem;

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1,
        changed: true
      };
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      const existing = state.items[index];

      if (existing.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
          totalQuantity: state.totalQuantity - 1,
          changed: true
        };
      }

      const updatedItem = {
        ...existing,
        quantity: existing.quantity - 1,
        totalPrice: existing.totalPrice - existing.price,
      };
      const updatedItems = [...state.items];
      updatedItems[index] = updatedItem;

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity - 1,
        changed: true
      };
    },
    replaceCart(state, action) {
      return {
        ...state,
        totalQuantity: action.payload.totalQuantity,
        items: action.payload.items,
      };
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addItem, removeItem, replaceCart } = actions;

export default reducer;
