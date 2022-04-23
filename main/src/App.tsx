import React from 'react';
import Header from './components/Header';

const ProductsButton = React.lazy(
  // @ts-ignore
  () => import('PRODUCTS/Button')
);
const CartsButton = React.lazy(
  // @ts-ignore
  () => import('CART/Button')
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
      <h1>Carts</h1>
      <div>
        <React.Suspense fallback='Loading Button'>
          <CartsButton />
        </React.Suspense>
      </div>
    </>
  );
}
export default App;