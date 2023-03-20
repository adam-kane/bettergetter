import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DaysHeader() {
  return (
    <View style={styles.daysHeaderContainer}>
      <Text style={styles.headeritem}>Mon</Text>
      <Text style={styles.headeritem}>Tue</Text>
      <Text style={styles.headeritem}>Wed</Text>
      <Text style={styles.headeritem}>Thu</Text>
      <Text style={styles.headeritem}>Fri</Text>
      <Text style={styles.headeritem}>Sat</Text>
      <Text style={styles.headeritem}>Sun</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  daysHeaderContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  headeritem: {
    flex: 1 / 7,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    fontWeight: "bold",
    backgroundColor: "#04724d",
    color: "#fff",
  },
});

export default DaysHeader;
