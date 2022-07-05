import React, { useState } from "react";
import List from "@mui/material/List";
import Cached from "@mui/icons-material/Cached";
import Launch from "@mui/icons-material/Launch";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRemotes } from "../../context/remotes";
import { findRemoteUrl } from "../../utils/remote";

export const RemoteControls = () => {
  const [remotes, updateRemoteUrl] = useRemotes();
  const [productsUrl, setProductsUrl] = useState(
    findRemoteUrl("PRODUCTS", remotes)
  );
  const [cartUrl, setCartUrl] = useState(findRemoteUrl("CART", remotes));
  const handleProductsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsUrl(e.target.value);
  };
  const handleCartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCartUrl(e.target.value);
  };
  const handleReloadApp = () => {
    updateRemoteUrl("PRODUCTS", productsUrl);
    updateRemoteUrl("CART", cartUrl);
    window.location.reload();
  };
  return (
    <List>
      <ListItem>
        <TextField
          size="small"
          sx={{ width: "500px" }}
          id="outlined-name"
          label="Cart Remote URL"
          value={cartUrl}
          onChange={handleCartChange}
        />
        <a
          target="_blank"
          rel="noreferrer"
          href={cartUrl}
          style={{ textDecoration: "none" }}
        >
          <Button
            sx={{ marginLeft: "12px" }}
            variant="outlined"
            endIcon={<Launch />}
            size="small"
          >
            Link
          </Button>
        </a>
      </ListItem>
      <ListItem>
        <TextField
          size="small"
          sx={{ width: "500px" }}
          id="outlined-name"
          label="Products Remote URL"
          value={productsUrl}
          onChange={handleProductsChange}
        />
        <a
          target="_blank"
          rel="noreferrer"
          href={productsUrl}
          style={{ textDecoration: "none" }}
        >
          <Button
            sx={{ marginLeft: "12px" }}
            variant="outlined"
            endIcon={<Launch />}
            size="small"
          >
            Link
          </Button>
        </a>
      </ListItem>

      <Button
        sx={{ marginLeft: "12px" }}
        size="small"
        variant="contained"
        aria-label="reload products app"
        onClick={handleReloadApp}
        endIcon={<Cached />}
      >
        Reload
      </Button>
    </List>
  );
};

export default RemoteControls;
