import React from 'react';

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
    <div>
      <h1>Main</h1>
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
    </div>
  );
}
export default App;