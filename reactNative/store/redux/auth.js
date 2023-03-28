import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Network from "../../constants/Network";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    token: "",
    status: "idle",
    error: null,
  },
  reducers: {
    attemptLogin: (state, action) => {
      state.token = action.payload.token;
      AsyncStorage.setItem("token", action.payload.token);
      state.authenticated = true;
    },
    attemptLogout: (state, action) => {
      AsyncStorage.removeItem("token");
      state.authenticated = false;
      state.token = "";
    },
    attemptRefresh: (state, action) => {
      state.authenticated = true;
    },
    updateAccessToken: (state, action) => {
      state.token = action.payload.token;
      state.authenticated = true;
    },
  },
});

export function doLogin(email, password) {
  return async function saveCompletionThunk(dispatch) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    try {
      const response = await fetch(
        `${Network.baseUrl}/api/auth/signin`,
        requestOptions
      );
      const json = await response.json();
      dispatch({ type: "auth/attemptLogin", payload: json });
    } catch (e) {
      console.error(e);
    }
  };
}

export function updateToken(token) {
  return async function saveCompletionThunk(dispatch) {
    try {
      dispatch({ type: "auth/updateAccessToken", payload: { token } });
    } catch (e) {
      console.error(e);
    }
  };
}

export default authSlice.reducer;
export const userAuthenticated = (state) => state.auth.authenticated;
export const accessToken = (state) => state.auth.token;
