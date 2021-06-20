import React from "react";
import {
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  ImageField,
  ImageInput,
} from "react-admin";

const SegmentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <ImageField source="imageUrl" />
      <ImageInput source="image">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="header" />
      <TextInput multiline source="text" />
    </SimpleForm>
  </Edit>
);

export default SegmentEdit;
