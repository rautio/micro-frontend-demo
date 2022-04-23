import React from 'react';

const PRODUCTSButton = React.lazy(
  // @ts-ignore
  () => import('PRODUCTS/Button')
);

export const App = () => {
  return (
    <div>
      <h1>Products</h1>
      <div>
        <React.Suspense fallback='Loading Button'>
          <PRODUCTSButton />
        </React.Suspense>
      </div>
      <h2>Main</h2>
    </div>
  );
}
export default App;