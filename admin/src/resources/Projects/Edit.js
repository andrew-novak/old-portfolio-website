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
      <ImageInput source="image" label="New graphic no. 1">
        <ImageField source="src" />
      </ImageInput>
      <ImageField source="imageUrl" label="Original graphic no.1" />
      <ImageInput source="imageExtra" label="New graphic no. 2">
        <ImageField source="src" />
      </ImageInput>
      <ImageField source="imageUrlExtra" label="Original graphic no. 2" />
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
