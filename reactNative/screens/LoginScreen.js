import { React, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  Pressable,
  SafeAreaView,
  useColorScheme,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import PrimaryButton from "../components/PrimaryButton";

const navigationType = PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  state: PropTypes.shape({
    key: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired,
    path: PropTypes.string,
    params: PropTypes.object,
  }).isRequired,
}).isRequired;

LoginScreen.propTypes = {
  navigation: navigationType,
};

LoginScreen.defaultProps = {
  navigation: null,
};

function LoginScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const signInPressed = () => {
    navigation.navigate("Dashboard");
  };

  const createAccountPressed = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Better Getter</Text>
        <View style={styles.separator} />
        <View style={styles.form}>
          <Image
            source={require("../assets/growth.png")}
            style={{ height: 100, width: 100 }}
          />
          <View style={styles.separator} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => setEmailText(text)}
          />
          <View style={styles.separator} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPasswordText(text)}
          />
          <View style={styles.separator} />
          <PrimaryButton style={styles.mainButton} onPress={signInPressed}>
            <Text>Sign In</Text>
          </PrimaryButton>
          <View style={styles.visibleSeparator} />
          <PrimaryButton onPress={createAccountPressed}>
            <Text>Create Account</Text>
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 550,
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  form: {
    flex: 1,
    alignItems: "center",
    width: "80%",
  },
  textInput: {
    backgroundColor: "#f5f7f6",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 1,
    height: 45,
    padding: 10,
    width: "100%",
  },
  mainButton: {
    width: "100%",
  },
  buttonPressed: {
    opacity: 0.2,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  visibleSeparator: {
    marginVertical: 25,
    backgroundColor: "black",
    height: 1,
    width: "80%",
  },
  createAccountText: {
    color: "grey",
    fontSize: 16,
  },
});

export default LoginScreen;
