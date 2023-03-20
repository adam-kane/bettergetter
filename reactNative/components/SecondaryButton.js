import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import PropTypes from "prop-types";

SecondaryButton.propTypes = {
  children: PropTypes.element,
  onPress: PropTypes.func,
};

SecondaryButton.defaultProps = {
  children: [],
  onPress: null,
};

function SecondaryButton({ children, onPress, style }) {
  const colorScheme = useColorScheme();

  return (
    <View style={[style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.customButton, styles.pressed]
            : [styles.customButton]
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
    backgroundColor: "#f7f7f7",
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
    borderWidth: 1,
    borderColor: "#04724D",
  },
  customButtonText: {
    color: "#04724D",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SecondaryButton;
