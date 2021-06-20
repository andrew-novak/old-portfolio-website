import React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

const MediaLinkShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="variant" />
      <TextField source="url" />
    </SimpleShowLayout>
  </Show>
);

export default MediaLinkShow;
