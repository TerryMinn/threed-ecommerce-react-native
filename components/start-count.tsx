import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { RatingI } from "@/types/product.type";

type StartCountProps = RatingI & { size?: number };

const StartCount = ({ rate, count, size = 14 }: StartCountProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => (
        <MaterialIcons
          key={index}
          name={index < rate ? "star" : "star-border"}
          size={size}
          style={index < rate ? styles.star_selected : styles.star_unselected}
        />
      ))}
      <Text style={[styles.count_style, { fontSize: size - 8 }]}>
        ({count}k)
      </Text>
    </View>
  );
};

export default StartCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star_unselected: {
    color: "#aaa",
  },
  star_selected: {
    color: "#ffb300",
  },
  count_style: {
    fontSize: 10,
  },
});
