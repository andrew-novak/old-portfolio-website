import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  ArrayField,
  SimpleFormIterator,
} from "react-admin";

// the hasShow prop removed because of an error
const ProjectShow = ({ hasShow, ...rest }) => (
  <Show {...rest}>
    <SimpleShowLayout>
      <TextField disabled source="id" />
      <ImageField source="imageUrl" />
      <ImageField source="imageUrlExtra" />
      <TextField source="title" />
      <TextField source="shortDescription" />
      <TextField source="fullDescription" />
      <ArrayField source="links">
        <SimpleFormIterator>
          <TextField source="text" />
          <TextField source="link" />
        </SimpleFormIterator>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export default ProjectShow;
