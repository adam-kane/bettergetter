import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import ScreenTitle from "../components/ScreenTitle";

function CreateAccount() {
  return (
    <View>
      <ScreenTitle>Create Account</ScreenTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});

export default CreateAccount;
