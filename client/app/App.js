import React from 'react';
//REMOVE
import Cart from '../features/users/Cart';

import Navbar from '../features/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Cart/>
    </div>
  );
};

export default App;
