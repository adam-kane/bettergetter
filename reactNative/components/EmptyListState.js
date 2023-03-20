import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PrimaryButton from "./PrimaryButton";

function EmptyListState({ children, tapButtonHandler }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.emptyImage}
        source={require("../assets/growth.png")}
      />
      <Text style={styles.emptyStateText}>{children}</Text>
      <PrimaryButton style={styles.emptyStateButton} onPress={tapButtonHandler}>
        <Text>Create one?</Text>
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    height: 80,
    width: 80,
  },
  emptyStateText: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 16,
  },
  emptyStateButton: {
    marginTop: 16,
    width: "80%",
  },
});

export default EmptyListState;
