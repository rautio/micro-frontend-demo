import React from 'react';
import Header from './components/Header';

const ProductsButton = React.lazy(
  // @ts-ignore
  () => import('PRODUCTS/Button')
);

export const App = () => {
  return (
    <>
      <Header />
      <h1>Products</h1>
      <div>
        <React.Suspense fallback='Loading Button'>
          <ProductsButton />
        </React.Suspense>
      </div>
    </>
  );
}
export default App;