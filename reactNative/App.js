import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setJSExceptionHandler } from "react-native-exception-handler";
import Router from "./navigation/Router";
import { store } from "./store/redux/store";
import { updateToken } from "./store/redux/auth";
import { ErrorHandler } from "./components/ErrorHandler";

const App = () => {
  return (
    <ErrorHandler>
      <Provider store={store}>
        <Root />
      </Provider>
    </ErrorHandler>
  );
};

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const updateTokenThunk = updateToken(token);
        dispatch(updateTokenThunk);
      }
    }
    fetchToken();
  }, []);
  return <Router />;
};

export default App;
