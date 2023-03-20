import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Text,
} from "react-native";
import Colors from "../constants/Colors";

const AddCompletionButton = ({ style, onPress }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        styles.completionButton,
        { backgroundColor: Colors[colorScheme].tint },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.completionButtonText}>Add completion for today?</Text>
      <Image
        style={styles.buttonImage}
        source={require("../assets/growth.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  completionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 8,
  },
  completionButtonText: {
    marginStart: 8,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonImage: {
    marginStart: 8,
    height: 30,
    width: 30,
  },
});

export default AddCompletionButton;
