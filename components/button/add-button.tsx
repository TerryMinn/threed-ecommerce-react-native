import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type AddButtonProps = {
  onPress: () => void;
  iconSize?: number;
};

const AddButton = ({ onPress, iconSize = 20 }: AddButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <AntDesign name="shoppingcart" size={iconSize} color="white" />
      <Text style={styles.text_color}>Add Card</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A55A2",
    paddingVertical: 8,
    gap: 5,
    borderRadius: 8,
  },
  text_color: {
    color: "white",
  },
});
