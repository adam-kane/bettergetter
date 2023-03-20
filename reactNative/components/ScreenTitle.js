import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

function ScreenTitle({ children, style }) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[styles.title, { color: Colors[colorScheme].text }, style]}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "900",
    fontSize: 20,
  },
});

export default ScreenTitle;
