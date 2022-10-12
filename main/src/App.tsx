import React from "react";
// @ts-ignore
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import StoreHeader from "./components/StoreHeader";
import RemoteControls from "./components/RemoteControls";
import RemoteComponent from "./components/RemoteComponent";
import RemotesProvider from "./context/remotes";
import PubSub from "./services/pubsub";

// Initialize PubSub Event messaging between apps
const events = new PubSub({ persistedTopics: ["cart"] });
// Set it at global level for all to consume (also passed as props)
// @ts-ignore
window.fsEvents = events;

export const App = () => {
  return (
    <RemotesProvider>
      <Header />
      <RemoteControls />
      <div style={{ margin: "10px", border: "1px solid black" }}>
        <BrowserRouter>
          <>
            <StoreHeader />
            <div style={{ marginTop: 40 }}>
              <Switch>
                <Route exact path="/">
                  <RemoteComponent
                    fallback="Loading Products..."
                    remote="PRODUCTS"
                    component="ProductsList"
                  />
                </Route>
                <Route exact path="/checkout">
                  <RemoteComponent
                    fallback="Loading Checkout..."
                    remote="CART"
                    component="CheckoutPage"
                  />
                </Route>
              </Switch>
            </div>
          </>
        </BrowserRouter>
      </div>
    </RemotesProvider>
  );
};
export default App;
