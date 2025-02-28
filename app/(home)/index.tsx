import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/service/product.service";
import Loading from "@/components/loading";
import { ProductI } from "@/types/product.type";
import ItemCard from "@/components/item-card";

const Home = () => {
  const { data, isLoading } = useQuery<{ data: ProductI[] }>({
    queryKey: [""],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return <Loading />;
  }

  const PRODUCTS = data?.data;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={PRODUCTS}
        numColumns={2}
        renderItem={({ item }) => <ItemCard {...item} key={item.id} />}
        columnWrapperStyle={styles.item}
        contentContainerStyle={styles.inner_container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 10 }}>
            All Products
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner_container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    justifyContent: "space-between",
  },
});
