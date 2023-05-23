import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider, User } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// dev-2xo4e01pzbwvv8st.us.auth0.com
// LdYyf3DfdgK56C2SDVJtlE1nNjRGfxkD

root.render(
  <Auth0Provider
    domain="dev-2xo4e01pzbwvv8st.us.auth0.com"
    clientId="LdYyf3DfdgK56C2SDVJtlE1nNjRGfxkD
"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
