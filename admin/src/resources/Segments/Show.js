import React from "react";
import { Show, SimpleShowLayout, ImageField, TextField } from "react-admin";

const SegmentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ImageField source="imageUrl" />
      <TextField source="header" />
      <TextField source="text" />
    </SimpleShowLayout>
  </Show>
);

export default SegmentShow;
