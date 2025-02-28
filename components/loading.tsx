import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

type LoadingProps = {};

const Loading = ({}: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
