import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
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
      };
    },
  },
});

export const sendCartData = (cart) => {
  return async(dispatch) => {
    const request = async () => {
      const response = await fetch(
        'https://react-http-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    try {
      await request();

      dispatch(
        setNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data success',
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      ); 
    }
  };
};

const { actions, reducer } = cartSlice;

export const { addItem, removeItem } = actions;

export default reducer;
