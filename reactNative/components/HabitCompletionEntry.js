import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addCompletionForHabit } from "../store/redux/habits";
import { randomRGB } from "../util/ColorUtil";

const HabitCompletionEntry = ({ item, showDialogHandler }) => {
  const dispatch = useDispatch();
  const backgroundColor = useMemo(() => {
    return randomRGB();
  }, []);
  function handleShowDialog(entry) {
    showDialogHandler(entry);
  }

  function addCompletion(entry) {
    const addCompletionForHabitThunk = addCompletionForHabit(
      item.id,
      entry.date
    );
    dispatch(addCompletionForHabitThunk);
  }

  function generateWeekData() {
    const data = item.completionSummary.map((entry) => {
      return {
        date: entry.date,
        percentageComplete: entry.numberOfCompletions > 0 ? 1 : 0,
      };
    });
    return data;
  }

  return (
    <View style={styles.completionContainer}>
      {generateWeekData().map((entry) => {
        return (
          <TouchableOpacity
            onPress={() => addCompletion(entry)}
            key={entry.date}
            style={[
              styles.completionItem,
              {
                backgroundColor: `${backgroundColor}${entry.percentageComplete})`,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  completionItem: {
    borderColor: "#000",
    borderWidth: 2,
    aspectRatio: 1,
    padding: 10,
    margin: 5,
    flex: 1,
    borderRadius: 24,
    justifyContent: "space-evenly",
  },
  completionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default HabitCompletionEntry;
