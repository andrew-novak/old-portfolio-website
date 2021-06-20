import React from "react";
import { List, Datagrid, TextField, EditButton, ShowButton } from "react-admin";

const MediaLinkList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="variant" />
      <TextField source="url" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default MediaLinkList;
