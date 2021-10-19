import simpleRestProvider from "ra-data-simple-rest";

import { API_URL } from "../constants/urls";
import httpClient from "./httpClient";
import convertFileToBase64 from "./convertFileToBase64";

const url = `${API_URL}/admin`;

const dataProvider = simpleRestProvider(url, httpClient);

const modifyRequest = async (method, resource, params) => {
  const { graphics } = params.data;
  let image64, image64Extra;
  if (graphics[0]) {
    image64 = await convertFileToBase64(graphics[0].graphic.rawFile);
  }
  if (graphics[1]) {
    image64Extra = await convertFileToBase64(graphics[1].graphic.rawFile);
  }
  var extensionRegex = /(?:\.([^.]+))?$/;
  const base64Graphics = await Promise.all(
    graphics.map(async ({ graphic }) => {
      const base64 = await convertFileToBase64(graphic.rawFile);
      const extension = extensionRegex.exec(graphic.rawFile.path)[1];
      return {
        base64,
        extension,
      };
    })
  );
  delete params.data.graphics;
  return await dataProvider[method](resource, {
    ...params,
    data: {
      ...params.data,
      ...(image64 ? { image64 } : null),
      ...(image64Extra ? { image64Extra } : null),
      graphics: base64Graphics,
    },
  });
};

const uploadCapableDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    return modifyRequest("create", resource, params);
  },
  update: (resource, params) => {
    return modifyRequest("update", resource, params);
  },
};

export default uploadCapableDataProvider;
