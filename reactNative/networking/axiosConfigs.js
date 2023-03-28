import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "https://yourdomain.com/api/v1",
});

api.interceptors.request.use(
  function (config) {
    if (!config.url.includes("api/auth")) {
      const token = AsyncStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}
      )}`;
      return config;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export function defineCancelApiObject(apiObject) {
  // an object that will contain a cancellation handler
  // associated to each API property name in the apiObject API object
  const cancelApiObject = {};

  // each property in the apiObject API layer object
  // is associated with a function that defines an API call

  // this loop iterates over each API property name
  Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
    const cancellationControllerObject = {
      controller: undefined,
    };

    // associating the request cancellation handler with the API property name
    cancelApiObject[apiPropertyName] = {
      handleRequestCancellation: () => {
        // if the controller already exists,
        // canceling the request
        if (cancellationControllerObject.controller) {
          // canceling the request and returning this custom message
          cancellationControllerObject.controller.abort();
        }

        // generating a new controller
        // with the AbortController factory
        cancellationControllerObject.controller = new AbortController();

        return cancellationControllerObject.controller;
      },
    };
  });

  return cancelApiObject;
}
