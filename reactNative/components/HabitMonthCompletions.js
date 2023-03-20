import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { addCompletionForHabit } from "../store/redux/habits";

const HabitMonthCompletions = ({ habitDetail, style }) => {
  const dispatch = useDispatch();

  function addCompletion(entry) {
    const addCompletionForHabitThunk = addCompletionForHabit(
      habitDetail.id,
      entry.date
    );
    dispatch(addCompletionForHabitThunk);
  }

  function generateWeekData() {
    const data = habitDetail.completionSummary.map((entry) => {
      return {
        date: entry.date,
        percentageComplete: entry.numberOfCompletions > 0 ? 1 : 0,
      };
    });
    return data;
  }

  const gridItemDimension = useMemo(() => {
    return Dimensions.get("window").width / 8;
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => addCompletion(item)}
        key={item.date}
        style={[
          styles.completionItem,
          {
            backgroundColor: `rgba(64, 163, 90,${item.percentageComplete})`,
          },
        ]}
      >
        <Text style={styles.dateText}>{item.date.slice(-2)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.completionContainer, style]}>
      <Text style={[styles.dateText, styles.title]}>
        Completions for
        {` ${new Date().toLocaleString("default", { month: "long" })}`}
      </Text>
      <FlatGrid
        scrollEnabled={false}
        spacing={0}
        maxItemsPerRow={7}
        itemDimension={gridItemDimension}
        data={generateWeekData()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  completionItem: {
    borderColor: "#000",
    borderWidth: 2,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  completionContainer: {
    flex: 1,
  },
  dateText: {
    fontWeight: "bold",
  },
  title: {
    marginBottom: 16,
  },
});

export default HabitMonthCompletions;
