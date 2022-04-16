import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartVisible: true },
    reducers: {
        toggle(state) {
            return {
                ...state,
                cartVisible: !state.cartVisible
            }
        }
    }
})

const { actions, reducer } = uiSlice;

export const { toggle } = actions;

export default reducer;