import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { sendCartData, fetchCart } from './redux/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData({ items: cart.items, totalQuantity: cart.totalQuantity }))    
    }

  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
