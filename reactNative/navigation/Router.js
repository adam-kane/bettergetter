import React, { useState } from "react";
import { useColorScheme, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setJSExceptionHandler } from "react-native-exception-handler";
import Dashboard from "../screens/Dashboard";
import LoginScreen from "../screens/LoginScreen";
import HabitDetail from "../screens/HabitDetail";
import CreateHabit from "../screens/CreateHabit";
import Colors from "../constants/Colors";
import { userAuthenticated } from "../store/redux/auth";
import ErrorOverlay from "../components/ErrorOverlay";

const Stack = createNativeStackNavigator();

export const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      onPress={() => dispatch({ type: "auth/attemptLogout" })}
      title="Info"
      color="#fff"
      backgroundColor="#000"
    />
  );
};

function AppStack() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen name="Habit Detail" component={HabitDetail} />
      <Stack.Screen name="Create Habit" component={CreateHabit} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function Router() {
  const authenticated = useSelector(userAuthenticated);
  const [globalError, setGlobalError] = useState(null);

  setJSExceptionHandler((error, isFatal) => {
    // This is your custom global error handler
    // You do stuff like show an error dialog
    // or hit google analytics to track crashes
    // or hit a custom api to inform the dev team.
    console.log(`error caught:${error}`);
    setGlobalError(error);
  }, true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {globalError ? (
          <ErrorOverlay message={globalError.message} />
        ) : undefined}
        {authenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Router;
