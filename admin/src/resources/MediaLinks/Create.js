import React from "react";
import {
  Create,
  SimpleForm,
  TextField,
  TextInput,
  AutocompleteInput,
} from "react-admin";

const MediaLinkCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextField source="id" />
      <AutocompleteInput
        source="variant"
        choices={[
          { id: "facebook", name: "Facebook" },
          {
            id: "github",
            name: "GitHub",
          },
          { id: "linkedin", name: "LinkedIn" },
        ]}
      />
      <TextInput source="url" />
    </SimpleForm>
  </Create>
);

export default MediaLinkCreate;
