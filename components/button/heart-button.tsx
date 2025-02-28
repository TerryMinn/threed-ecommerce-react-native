import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {};

const HeartButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <AntDesign name="hearto" size={18} color="black" />
    </TouchableOpacity>
  );
};

export default HeartButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 100 / 2,
    backgroundColor: "#f4f4f4",
  },
});
