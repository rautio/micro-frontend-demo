import React from 'react';
import Header from './components/Header';
import RemoteControls from './components/RemoteControls';
import Product from './features/product';

export const App = () => {
  return (
    <>
      <Header />
      <RemoteControls />
      <Product />
    </>
  );
}
export default App;