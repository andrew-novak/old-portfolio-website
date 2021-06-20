import React from "react";
import {
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  AutocompleteInput,
} from "react-admin";

const MediaLinkEdit = (props) => (
  <Edit {...props}>
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
  </Edit>
);

export default MediaLinkEdit;
