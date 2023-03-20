import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenTitle from "../components/ScreenTitle";
import HabitListItem from "../components/HabitListItem";
import DaysHeader from "../components/DaysHeader";
import EmptyListState from "../components/EmptyListState";
import PrimaryButton from "../components/PrimaryButton";
import { fetchHabits, selectAllUserHabits } from "../store/redux/habits";
import { randomRGB } from "../util/ColorUtil";

function Dashboard({ navigation }) {
  const habits = useSelector(selectAllUserHabits);
  const dispatch = useDispatch();
  const habitsStatus = useSelector((state) => state.habits.status);
  const error = useSelector((state) => state.habits.error);

  useEffect(() => {
    if (habitsStatus === "idle") {
      dispatch(fetchHabits());
    }
  }, [habitsStatus, dispatch]);

  const habitDetailSelectionHandler = (habit) => {
    navigation.navigate("Habit Detail", { habitId: habit });
  };

  const createHabitSelectionHandler = () => {
    navigation.navigate("Create Habit");
  };

  const renderItem = ({ item }) => {
    return (
      <HabitListItem
        item={item}
        habitDetailSelectionHandler={habitDetailSelectionHandler}
        backgroundColor={randomRGB()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.habitListHeader}>
        <ScreenTitle>My Habits</ScreenTitle>
        <PrimaryButton onPress={createHabitSelectionHandler}>
          <Text>Create Habit</Text>
        </PrimaryButton>
      </View>
      <View style={{ flex: 1 }}>
        <DaysHeader />
        <FlatList
          style={styles.habitList}
          data={habits}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
  habitList: { marginTop: 16 },
  habitListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createHabitButton: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
  },
});

export default Dashboard;
