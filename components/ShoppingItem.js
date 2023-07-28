import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { db, doc, updateDoc, deleteDoc } from "../firebase/index";

//shoppingobject

const ShoppingItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const updateIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(shoppingRef, {
      isChecked: isChecked,
    });
  };
  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingList();
  };

  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked == true ? (
          <FontAwesome name="check-circle" size={24} color="black" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="black" />
        )}
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>
      <Pressable onPress={deleteShoppingItem}>
        <EvilIcons name="trash" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});

export default ShoppingItem;
