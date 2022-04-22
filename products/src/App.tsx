import React from 'react';

const MFE1Button = React.lazy(
  // @ts-ignore
  () => import('MFE1/Button')
);

export const App = () => {
  return (
    <div>
      <h1>MFE2</h1>
      <div>
        <React.Suspense fallback='Loading Button'>
          <MFE1Button />
        </React.Suspense>
      </div>
      <h2>MFE2</h2>
    </div>
  );
}
export default App;