import React, { useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Network from "../constants/Network";
import HabitDetailsReadOnly from "../components/HabitDetailsReadOnly";
import HabitDetailsEdit from "../components/HabitDetailsEdit";

function HabitDetail({ route, navigation }) {
  const [habit, setHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { habitId } = route.params;

  const editTapHandler = (toggleEditing) => {
    setIsEditing(toggleEditing);
  };

  const displayMode = isEditing ? (
    <HabitDetailsEdit
      habitDetail={habit && habit.habitDetailOverview}
      editTapHandler={editTapHandler}
    />
  ) : (
    <HabitDetailsReadOnly
      habitDetail={habit && habit.habitDetailOverview}
      editTapHandler={editTapHandler}
    />
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchHabits() {
        try {
          const response = await fetch(`${Network.baseUrl}/habit/${habitId}`);
          const fetchedHabits = await response.json();
          setHabit(fetchedHabits);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      }
      try {
        fetchHabits();
      } catch (e) {
        console.error(e);
      }
    }, [habitId])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        habit && displayMode
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});

export default HabitDetail;
