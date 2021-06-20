import simpleRestProvider from "ra-data-simple-rest";

import { API_URL } from "../constants/urls";
import httpClient from "./httpClient";
import convertFileToBase64 from "./convertFileToBase64";

const url = `${API_URL}/admin`;

const dataProvider = simpleRestProvider(url, httpClient);

const modifyRequest = async (method, resource, params) => {
  const { image, imageExtra } = params.data;
  let image64, image64Extra;
  if (image) {
    image64 = await convertFileToBase64(image);
    delete params.data.image;
  }
  if (imageExtra) {
    image64Extra = await convertFileToBase64(imageExtra);
    delete params.data.imageExtra;
  }

  return await dataProvider[method](resource, {
    ...params,
    data: {
      ...params.data,
      ...(image64 ? { image64 } : null),
      ...(image64Extra ? { image64Extra } : null),
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

  /*
  create: async (resource, params) => {
    const { image, imageExtra } = params.data;
    let image64, image64Extra;
    if (image) {
      image64 = await convertFileToBase64(image);
      delete params.data.image;
    }
    if (imageExtra) {
      image64Extra = await convertFileToBase64(imageExtra);
      delete params.data.imageExtra;
    }
    return dataProvider.create(resource, {
      ...params,
      data: {
        ...params.data,
        image64: image64 ? image64 : null,
        ...(image64 ? { image64 } : null),
        ...(image64Extra ? { image64Extra } : null),
      },
    });
  },

  update: async (resource, params) => {
    const { image, imageExtra } = params.data;
    let image64, image64Extra;
    if (image) {
      image64 = await convertFileToBase64(image);
      delete params.data.image;
    }
    if (imageExtra) {
      image64Extra = await convertFileToBase64(imageExtra);
      delete params.data.imageExtra;
    }
    return dataProvider.update(resource, {
      ...params,
      data: {
        ...params.data,
        image64: image64 ? image64 : null,
        ...(image64 ? { image64 } : null),
        ...(image64Extra ? { image64Extra } : null),
      },
    });
  },
  */
};

export default uploadCapableDataProvider;
