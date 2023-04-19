import React from 'react';
//REMOVE
import Cart from '../features/users/Cart';
import AllProducts from '../features/products/AllProducts';

import Navbar from '../features/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      {/* <AllProducts/> */}
      <Cart/>
    </div>
  );
};

export default App;
