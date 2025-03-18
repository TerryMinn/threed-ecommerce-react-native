import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeRoot = () => {
  return (
    <Stack screenOptions={{ animation: "fade" }}>
      <Stack.Screen name="index" options={{ title: "Shop" }} />
      <Stack.Screen name="3d-view" />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <AntDesign name="hearto" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default HomeRoot;

const styles = StyleSheet.create({});
