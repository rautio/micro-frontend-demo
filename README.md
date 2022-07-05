# Micro Frontend Demo

Demoing a micro frontend architecture setup in a fictional online store selling different types of fruit.

## Getting started

1. Run: `yarn start`
2. Navigate to `http://localhost:9001/`

## Deployment

Main Host App: `http://localhost:9001/`

Products Remote: `http://localhost:9002/`

Cart Remote: `http://localhost:9003/`

## Shared Global State

We are using [Zustand](https://github.com/pmndrs/zustand) as a global state management tool that is shared between the remote applications in this microfrontend app.

**Disclaimer**: This is only for demo purposes and you should try to not use any shared state, especially global state, in your microfrontend as much as possible. It can introduce unnecessary and hard to manage dependencies between your sub-apps reducing the independence and autonomy your teams experience.

The `Cart` Remote App initializes a Zustand store to manage the user's active cart. It exposes 3 items:

- `cart`: Array of products & quantities in the cart.
- `addItem`: Function to add a new item to the cart.
- `removeItem`: Function to remove an item from the cart.

It is initialized in: `cart/src/store/index.ts`

The `Product` Remote App uses this cart within the `<ProductCard />` component to render the fruit card differently depending on whether it is already in the cart or not. It displayes the quantity of that fruit in the cart and the ability to change the quantity or remove all items of that fruit. This card is rendered in the main homepage, the checkout side panel and the main checkout page.

`<ProductCard />` can be found at: `products/src/components/ProductCard/index.tsx`

## Tech Stack

- [Turborepo](https://turborepo.org/)
- React
- Typescript
- Webpack v5 (w/ Module Federation)
