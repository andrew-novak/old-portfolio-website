import React from "react";
import {
  Create,
  SimpleForm,
  ImageField,
  ImageInput,
  TextInput,
} from "react-admin";

const SegmentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ImageInput source="image">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="header" />
      <TextInput multiline source="text" />
    </SimpleForm>
  </Create>
);

export default SegmentCreate;
