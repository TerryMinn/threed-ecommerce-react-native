import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {};

const Counter = (props: Props) => {
  const [count, setCount] = useState<number>(1);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => count > 1 && setCount(count - 1)}>
        <AntDesign name="minus" size={16} color="black" />
      </TouchableOpacity>
      <Text style={styles.count_text}>{count < 10 ? `0${count}` : count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <AntDesign name="plus" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    borderColor: "#a3a3a3",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  count_text: {
    fontSize: 16,
  },
});
