import React, { useState, createContext } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Dashboard from "../screens/Dashboard";
import LoginScreen from "../screens/LoginScreen";
import HabitDetail from "../screens/HabitDetail";
import CreateHabit from "../screens/CreateHabit";
import Colors from "../constants/Colors";
import { store } from "../store/redux/store";

const Stack = createNativeStackNavigator();

function AppStack() {
  const colorScheme = useColorScheme();

  return (
    // <HabitsContextProvider>
    <Provider store={store}>
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
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Habit Detail" component={HabitDetail} />
        <Stack.Screen name="Create Habit" component={CreateHabit} />
      </Stack.Navigator>
    </Provider>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function Router() {
  // More explanations about "authData" below
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {true ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Router;
