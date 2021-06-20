import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  ShowButton,
} from "react-admin";

const SegmentList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ImageField source="imageUrl" />
      <TextField source="header" />
      <TextField source="text" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default SegmentList;
