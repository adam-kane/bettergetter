import React, { useContext, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import ScreenTitle from "../components/ScreenTitle";
import { createHabit } from "../store/redux/habits";

function CreateHabit() {
  const [habitDetail, setHabitDetail] = useState({
    title: "",
    notes: "",
    completionsRequiredPerDay: 1,
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const createHabitThunk = createHabit(habitDetail);
    dispatch(createHabitThunk);
  };

  const handleChange = (key, value) => {
    setHabitDetail({ ...habitDetail, [key]: value });
  };

  const isFormValid = () => {
    if (
      habitDetail.title.length === 0 ||
      habitDetail.completionsRequiredPerDay.length === 0
    ) {
      setFormHasErrors(true);
      return false;
    }
    setFormHasErrors(false);
    return true;
  };

  return (
    <View style={styles.container}>
      <ScreenTitle>Create Habit</ScreenTitle>
      <View style={styles.form}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your name here"
          value={habitDetail.title}
          onChangeText={(text) => handleChange("title", text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your notes here"
          value={habitDetail.notes}
          onChangeText={(text) => handleChange("notes", text)}
        />
        <TextInput
          style={styles.inputField}
          inputMode="decimal"
          placeholder="Enter your completions required here"
          value={habitDetail.completionsRequiredPerDay.toString()}
          onChangeText={(text) =>
            handleChange("completionsRequiredPerDay", +text)
          }
        />

        {formHasErrors && <Text>Sort your required fields out</Text>}

        <PrimaryButton style={styles.createButton} onPress={handleSubmit}>
          <Text>Create</Text>
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  form: {
    marginTop: 16,
  },
  inputField: {
    height: 45,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 8,
  },
  createButton: {
    marginTop: 16,
  },
});

export default CreateHabit;
