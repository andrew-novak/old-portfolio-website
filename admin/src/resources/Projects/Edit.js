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
      <ImageInput source="image" label="New graphic no. 1">
        <ImageField source="src" />
      </ImageInput>
      <ImageField source="imageUrl" label="Original graphic no. 1" />

      <ImageInput source="imageExtra" label="New graphic no. 2">
        <ImageField source="src" />
      </ImageInput>
      <ImageField source="imageUrlExtra" label="Original graphic no. 2" />

      <TextField source="id" />
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

/*
<ArrayInput source="graphics">
  <SimpleFormIterator>
    <ImageInput source="graphic">
      <ImageField source="src" />
    </ImageInput>
    <ImageField source="imageUrl"
  </SimleFormIterator>
</ArrayInput>

<ImageField source="imageUrl" />

<ImageInput source="image">
  <ImageField source="src" />
</ImageInput>

<ImageField source="imageUrlExtra" />

<ImageInput source="imageExtra">
  <ImageField source="src" />
</ImageInput>
*/

export default ProjectEdit;
