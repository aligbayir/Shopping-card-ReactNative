import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ShoppingItem from "./components/ShoppingItem";
import { EvilIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  app,
  db,
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "./firebase/index";

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      getShoppingList();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    setShoppingList(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(shoppingList);
  };

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItems}>{shoppingList.length}</Text>
        <Pressable onPress={deleteShoppingList}>
          <EvilIcons name="trash" size={30} color="black" />
        </Pressable>
      </View>
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            ></ShoppingItem>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      ) : (
        <Text>Gösterilecek öğre bulunmamaktadır.</Text>
      )}

      <TextInput
        placeholder="Enter the text"
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        value={title}
        onSubmitEditing={addShoppingItem}
      ></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  noOfItems: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 10,
  },
});
