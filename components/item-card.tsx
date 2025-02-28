import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { ProductI } from "@/types/product.type";
import StartCount from "./start-count";
import AddButton from "./button/add-button";
import HeartButton from "./button/heart-button";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

type ItemCardProps = ProductI;

const ItemCard = ({ id, image, price, rating, title }: ItemCardProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => router.push(`/(home)/product/${id}`)}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Animated.Image
            resizeMode="contain"
            source={{ uri: image }}
            style={styles.image}
            sharedTransitionTag={`tag${id}`}
          />
          <View style={styles.discount_container}>
            <Text style={styles.dicount_text}>-30%</Text>
          </View>
          <View style={styles.heart_container}>
            <HeartButton />
          </View>
        </View>

        <View style={styles.text_container}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.title_text}
            >
              {title}
            </Text>
          </View>

          <View>
            <StartCount {...rating} />

            <View style={styles.price_container}>
              <Text style={styles.price_text}>${price} </Text>
              <Text style={[styles.price_text, styles.price_discount_text]}>
                ${Number(price + 30).toFixed(2)}
              </Text>
            </View>

            <AddButton onPress={() => console.log("add to cart")} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 10,
    overflow: "hidden",
    width: "48%",
    backgroundColor: "white",
  },
  discount_container: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "red",
    padding: 3,
    borderRadius: 5,
  },
  dicount_text: {
    color: "white",
    fontSize: 12,
  },
  heart_container: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    paddingTop: 10,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },

  text_container: {
    padding: 8,
    justifyContent: "space-between",
    height: 120,
  },
  title_text: {
    fontWeight: "bold",
    width: "90%",
  },
  price_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    marginBottom: 5,
  },
  price_text: {
    fontWeight: "bold",
    fontSize: 13,
  },
  price_discount_text: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});
