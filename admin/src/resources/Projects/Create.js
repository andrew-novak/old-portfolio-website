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
      <ArrayInput source="graphics">
        <SimpleFormIterator>
          <ImageInput source="graphic">
            <ImageField source="src" />
          </ImageInput>
        </SimpleFormIterator>
      </ArrayInput>
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
