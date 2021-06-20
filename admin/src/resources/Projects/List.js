import React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  ShowButton,
  ArrayField,
} from "react-admin";

const ProjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ImageField source="imageUrl" />
      <ImageField source="imageUrlExtra" />
      <TextField source="title" />
      <TextField source="shortDescription" />
      <TextField source="fullDescription" />
      <ArrayField source="links">
        <Datagrid>
          <TextField source="text" />
          <TextField source="url" />
        </Datagrid>
      </ArrayField>
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ProjectList;
