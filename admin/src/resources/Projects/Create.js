import React from "react";
import {
  Create,
  SimpleForm,
  ImageField,
  ImageInput,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

const ProjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ImageInput source="image">
        <ImageField source="src" />
      </ImageInput>
      <ImageInput source="imageExtra">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="title" />
      <TextInput multiline source="shortDescription" />
      <TextInput multiline source="fullDescription" />
      <ArrayInput source="links">
        <SimpleFormIterator>
          <TextInput source="text" />
          <TextInput source="url" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default ProjectCreate;
