import { React } from "react";
import { View, Image, Text, useColorScheme, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { doLogin } from "../store/redux/auth";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";

function LoginScreen({ navigation }) {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "" },
      onSubmit: (values) => dispatch(doLogin(values.email, values.password)),
    });

  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const createAccountPressed = () => {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/growth.png")}
        style={{ height: 100, width: 100, marginBottom: 16 }}
      />
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
        />
      </View>
      <View style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}>
        <TextInput
          icon="key"
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          error={errors.password}
          touched={touched.password}
        />
      </View>
      <PrimaryButton style={{ width: 100 }} onPress={handleSubmit}>
        <Text>Login</Text>
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    justifyContent: "center",
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
