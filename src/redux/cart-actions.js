import { setNotification } from './ui-slice';
import { replaceCart } from './cart-slice';

export const sendCartData = (cart) => {
  return async (dispatch) => {
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

export const fetchCart = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-3606c-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        return new Error('Could not fetched');
      }

      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(replaceCart(data));
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
