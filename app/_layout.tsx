import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AntDesign from "@expo/vector-icons/AntDesign";

const queryClient = new QueryClient();

const RooyLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor="transparent" />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            href: null,
          }}
        />
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false,

            tabBarIcon: ({ color, focused, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            title: "Home",
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
};

export default RooyLayout;
