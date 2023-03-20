import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

PrimaryButton.propTypes = {
  children: PropTypes.element,
  onPress: PropTypes.func,
};

PrimaryButton.defaultProps = {
  children: [],
  onPress: null,
};

function PrimaryButton({ children, onPress, style }) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [
                styles.customButton,
                styles.pressed,
                { backgroundColor: Colors[colorScheme].tint },
              ]
            : [
                styles.customButton,
                { backgroundColor: Colors[colorScheme].tint },
              ]
        }
        android_ripple={{ color: "#DDC9B4" }}
        onPress={onPress}
      >
        <Text
          style={styles.customButtonText}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  customButton: {
    backgroundColor: "white",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 24,
  },
  customButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PrimaryButton;
