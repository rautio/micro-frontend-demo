# Micro Frontend Demo

Demoing a micro frontend architecture setup in a fictional online store selling different types of fruit.

## Getting started

1. Run: `yarn start`
2. Navigate to `http://localhost:9001/`

## Deployment

We are using environment variables to dynamically change where we fetch Products Remote and Cart Remote during deployment.

Webpack config:

```javascript
module.exports = (env) => {
  const PRODUCTS_HOST = env.PRODUCTS_HOST || "http://localhost:9002";
  const CART_HOST = env.CART_HOST || "http://localhost:9002";
  return {
    // ...
    plugins: [
      new ModuleFederationPlugin({
        name: "MAIN",
        remotes: {
          PRODUCTS: `PRODUCTS@${PRODUCTS_HOST}/remoteEntry.js`,
          CART: `CART@${CART_HOST}/remoteEntry.js`,
        },
        // ...
      }),
    ],
  };
};
```

Locally Products and Cart remotes point to `localhost:9002` and `localhost:9003` by default but when deployed will point to wherever the deployment's environment variables are configured.

For this app we are deploying using [Vercel](https://vercel.com/) and have defined the environment variables in the pipeline configurations to be:

`CART_HOST: 'https://micro-frontend-demo-seven.vercel.app'`

`PRODUCTS_HOST: 'https://micro-frontend-demo-products.vercel.app'`

## Tech Stack

- [Turborepo](https://turborepo.org/)
- React
- Typescript
- Webpack v5 (w/ Module Federation)
