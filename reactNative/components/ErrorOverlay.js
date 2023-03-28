import React from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";

const ErrorOverlay = ({ message, onConfirm }) => {
  const displayAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View>
      <Text>Error occurred</Text>
      <Text>{message}</Text>
      <Button onPress={() => displayAlert()} title="Okay" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ErrorOverlay;
