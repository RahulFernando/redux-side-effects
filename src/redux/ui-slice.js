import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartVisible: true, notification: null },
  reducers: {
    toggle(state) {
      return {
        ...state,
        cartVisible: !state.cartVisible,
      };
    },
    setNotification(state, action) {
      return {
        ...state,
        notification: action.payload,
      };
    },
  },
});

const { actions, reducer } = uiSlice;

export const { toggle, setNotification } = actions;

export default reducer;
