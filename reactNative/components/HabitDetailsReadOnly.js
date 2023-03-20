import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addCompletionForHabit } from "../store/redux/habits";
import AddCompletionButton from "./AddCompletionButton";
import HabitMonthCompletions from "./HabitMonthCompletions";
import PrimaryButton from "./PrimaryButton";
import ScreenTitle from "./ScreenTitle";

const HabitDetailsReadOnly = ({ habitDetail, editTapHandler }) => {
  const dispatch = useDispatch();

  const startEditTapHandler = () => {
    editTapHandler(true);
  };

  const addCompletionHandler = () => {
    const date = new Date().toJSON().slice(0, 10);
    const addCompletionForHabitThunk = addCompletionForHabit(
      habitDetail.habitId,
      date
    );

    dispatch(addCompletionForHabitThunk);
  };

  return (
    <ScrollView>
      <View style={styles.habitHeaderContainer}>
        <ScreenTitle style={styles.title}>{habitDetail.title}</ScreenTitle>
        <PrimaryButton onPress={startEditTapHandler}>
          <Text>Edit Details</Text>
        </PrimaryButton>
      </View>
      <Text style={[styles.spaceTop, styles.subtitle]}>Notes</Text>
      <View style={[styles.spaceTop, styles.notesContainer]}>
        <Text>{habitDetail.notes}</Text>
      </View>
      <Text style={[styles.spaceTop, styles.subtitle]}>
        Completions Required Per Day
      </Text>
      <View style={[styles.spaceTop, styles.notesContainer]}>
        <Text>{habitDetail.completionsRequiredPerDay}</Text>
      </View>
      <AddCompletionButton
        style={styles.spaceTop}
        onPress={addCompletionHandler}
      />
      <HabitMonthCompletions
        style={styles.spaceTop}
        habitDetail={habitDetail}
      />
    </ScrollView>
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
  habitHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flexShrink: 1,
    marginRight: 16,
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

export default HabitDetailsReadOnly;
