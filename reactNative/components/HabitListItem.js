import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Dialog from "react-native-dialog";
import Colors from "../constants/Colors";
import { createNewCompletionForHabit } from "../networking/addHabitCompletion";
import HabitCompletionEntry from "./HabitCompletionEntry";

const HabitListItem = ({
  item,
  habitDetailSelectionHandler,
  backgroundColor,
}) => {
  const colorScheme = useColorScheme();

  const handleHabitDetailSelection = (id) => {
    habitDetailSelectionHandler(id);
  };

  const [visible, setVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddCompletion = (date) => {
    // if (selectedEntry && selectedEntry.)
    // createNewCompletionForHabit(item.id, date);
    // setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handleHabitDetailSelection(item.id)}>
        <View
          style={[
            styles.listItemHeader,
            { backgroundColor: Colors[colorScheme].tint },
          ]}
        >
          <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
      <HabitCompletionEntry
        item={item}
        backgroundColor={backgroundColor}
        showDialogHandler={showDialog}
      />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add completion</Dialog.Title>
        <Dialog.Description>
          Do you want to add a completion for this day?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button
          label="Add"
          onPress={() => {
            handleAddCompletion();
          }}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listItemHeader: {
    paddingLeft: 16,
    height: 50,
    justifyContent: "center",
    borderRadius: 16,
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 20,
  },
  listItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default HabitListItem;
