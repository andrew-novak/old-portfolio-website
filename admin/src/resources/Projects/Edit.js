import React from "react";
import {
  Edit,
  SimpleForm,
  ImageField,
  ImageInput,
  TextField,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

const ProjectEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <ImageField source="imageUrl" />
      <ImageInput source="image">
        <ImageField source="src" />
      </ImageInput>
      <ImageField source="imageUrlExtra" />
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
  </Edit>
);

export default ProjectEdit;
