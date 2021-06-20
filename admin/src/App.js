import React from "react";
import { Admin, Resource } from "react-admin";
import LinkIcon from "@material-ui/icons/Link";
import SubjectIcon from "@material-ui/icons/Subject";
import AppsIcon from "@material-ui/icons/Apps";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
// Resource Components
import MediaLinksCreate from "./resources/MediaLinks/Create";
import MediaLinksEdit from "./resources/MediaLinks/Edit";
import MediaLinksList from "./resources/MediaLinks/List";
import MediaLinksShow from "./resources/MediaLinks/Show";
import SegmentsCreate from "./resources/Segments/Create";
import SegmentsEdit from "./resources/Segments/Edit";
import SegmentsList from "./resources/Segments/List";
import SegmentsShow from "./resources/Segments/Show";
import ProjectsCreate from "./resources/Projects/Create";
import ProjectsEdit from "./resources/Projects/Edit";
import ProjectsList from "./resources/Projects/List";
import ProjectsShow from "./resources/Projects/Show";

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource
      icon={LinkIcon}
      name="media-links"
      create={MediaLinksCreate}
      edit={MediaLinksEdit}
      show={MediaLinksShow}
      list={MediaLinksList}
    />
    <Resource
      icon={SubjectIcon}
      name="segments"
      create={SegmentsCreate}
      edit={SegmentsEdit}
      show={SegmentsShow}
      list={SegmentsList}
    />
    <Resource
      icon={AppsIcon}
      name="projects"
      create={ProjectsCreate}
      edit={ProjectsEdit}
      show={ProjectsShow}
      list={ProjectsList}
    />
  </Admin>
);

export default App;
