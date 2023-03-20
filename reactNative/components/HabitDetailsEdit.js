import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { editHabit } from "../store/redux/habits";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const HabitDetailsEdit = ({ habitDetail, editTapHandler }) => {
  const [habitTitle, setHabitTitle] = useState(habitDetail.title);
  const [habitNotes, setHabitNotes] = useState(habitDetail.notes);
  const [habitCompletionsRequired, setHabitCompletionsRequired] = useState(
    habitDetail.completionsRequiredPerDay
  );
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const cancelEditTapHandler = () => {
    editTapHandler(false);
  };

  const submitEditHabitDetails = async () => {
    const editHabitThunk = editHabit(habitDetail.habitId, {
      title: habitTitle,
      notes: habitNotes,
      completionsRequiredPerDay: habitCompletionsRequired,
    });
    dispatch(editHabitThunk);
  };

  return (
    <View>
      <TextInput
        autoFocus
        autoCorrect={false}
        style={[styles.title, { color: Colors[colorScheme].text }]}
        value={habitTitle}
        onChangeText={(text) => setHabitTitle(text)}
      />
      <Text style={[styles.spaceTop, styles.subtitle]}>Notes</Text>
      <View style={[styles.spaceTop, styles.notesContainer]}>
        <TextInput
          autoCorrect={false}
          value={habitNotes}
          onChangeText={(text) => setHabitNotes(text)}
        />
      </View>
      <Text style={[styles.spaceTop, styles.subtitle]}>
        Completions Required Per Day
      </Text>
      <View style={[styles.spaceTop, styles.notesContainer]}>
        <TextInput
          inputMode="decimal"
          autoCorrect={false}
          value={habitCompletionsRequired.toString()}
          onChangeText={(text) => setHabitCompletionsRequired(text)}
        />
      </View>
      <PrimaryButton style={styles.spaceTop} onPress={submitEditHabitDetails}>
        <Text>Save Changes</Text>
      </PrimaryButton>
      <SecondaryButton style={[styles.spaceTop]} onPress={cancelEditTapHandler}>
        <Text>Cancel</Text>
      </SecondaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  spaceTop: {
    marginTop: 16,
  },
  title: {
    flexShrink: 1,
    marginRight: 16,
    fontWeight: "900",
    fontSize: 20,
    height: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  editButton: {
    height: 30,
    width: 30,
  },
  notesContainer: {
    padding: 8,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ededeb",
  },
});

export default HabitDetailsEdit;
