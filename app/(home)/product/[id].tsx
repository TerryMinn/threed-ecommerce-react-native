import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/service/product.service";
import StartCount from "@/components/start-count";
import Counter from "@/components/counter";
import { COLOR } from "@/constants/Colors";
import { SIZE } from "@/constants/Size";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import AddButton from "@/components/button/add-button";
import Fontisto from "@expo/vector-icons/Fontisto";
import Loading from "@/components/loading";

const Product = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
  });

  const PRODUCT = data?.data;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <View style={styles.header_title_container}>
              <Text
                style={styles.header_title_text}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {isLoading ? "Loading..." : PRODUCT?.title}
              </Text>
            </View>
          ),
        }}
      />
      <ScrollView
        style={styles.inner_container}
        alwaysBounceVertical={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.image_container}>
          <Animated.Image
            style={styles.image}
            resizeMode="contain"
            sharedTransitionTag={`tag${id}`}
            source={{ uri: PRODUCT?.image }}
          />
          <TouchableOpacity
            onPress={() => router.push(`/(home)/3d-view/${id}`)}
            style={styles.view_in_threed}
          >
            <Fontisto name="world-o" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.content_container}>
          <Animated.Text
            entering={FadeInLeft.duration(1000)}
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.title_text}
          >
            {PRODUCT?.title}
          </Animated.Text>

          <Animated.View
            entering={FadeInLeft.duration(1000)}
            style={styles.price_container}
          >
            <Text style={styles.price_text}>From : </Text>
            <Text style={[styles.price_text, styles.price]}>
              ${PRODUCT?.price}
            </Text>
            <Text
              style={[styles.price_text, styles.price, styles.discount_text]}
            >
              ${(PRODUCT!?.price + 30).toFixed(2)}
            </Text>
          </Animated.View>

          <View style={styles.rate_counter_container}>
            <Animated.View entering={FadeInLeft.duration(1000)}>
              <StartCount
                count={PRODUCT!?.rating.count}
                rate={PRODUCT!?.rating.rate}
                size={20}
              />
            </Animated.View>

            <Animated.View entering={FadeInRight.duration(1000)}>
              <Counter />
            </Animated.View>
          </View>

          <Animated.View
            entering={FadeInLeft.duration(1000)}
            style={styles.des_container}
          >
            <Text
              numberOfLines={4}
              ellipsizeMode="tail"
              style={styles.des_text}
            >
              {PRODUCT?.description}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInLeft.duration(1000)}
            style={styles.variants_container}
          >
            <View style={styles.control_container}>
              <Text style={styles.control_text}>Color</Text>
              <View style={styles.box_container}>
                {COLOR.map((color, index) => (
                  <View
                    key={index}
                    style={[styles.color_box, { backgroundColor: color }]}
                  />
                ))}
              </View>
            </View>
            <View style={styles.control_container}>
              <Text style={styles.control_text}>Size</Text>
              <View style={styles.box_container}>
                {SIZE.map((size, index) => (
                  <View key={index} style={styles.size_box}>
                    <Text>{size}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        </View>

        <View style={styles.button_container}>
          <AddButton onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  view_in_threed: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  container: {
    flex: 1,
  },
  header_title_container: {
    width: 200,
  },
  header_title_text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inner_container: {
    paddingHorizontal: 10,
  },
  image_container: {
    position: "relative",
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content_container: { marginTop: 20 },
  title_text: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
    height: 50,
  },
  price_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  price_text: {
    fontSize: 14,
  },
  price: { fontWeight: "bold" },
  discount_text: {
    textDecorationLine: "line-through",
    color: "#aaa",
    marginLeft: 3,
  },
  rate_counter_container: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  des_container: {
    width: "90%",
    marginTop: 20,
  },
  des_text: {
    fontSize: 14,
    fontWeight: 500,
    color: "#525252",
    height: 50,
  },
  variants_container: {
    marginTop: 20,
  },
  control_container: {
    marginTop: 10,
  },
  control_text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  box_container: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  color_box: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  size_box: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  button_container: {
    width: "100%",
    marginTop: 20,
  },
});
