import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export const RemoteControls = () => {
  return (
    <List>
      <ListItem>Cart Remote: <a target="_blank" rel="noreferrer" href={process.env.CART_HOST}>{process.env.CART_HOST}</a></ListItem>
      <ListItem>Products Remote: <a target="_blank" rel="noreferrer" href={process.env.PRODUCTS_HOST}>{process.env.PRODUCTS_HOST}</a></ListItem>
    </List>
  );
};

export default RemoteControls;