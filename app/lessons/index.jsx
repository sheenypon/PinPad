import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet , ImageBackground } from "react-native";
import { useRouter } from "expo-router";

const lessons = [
  { id: "1", title: "What is PinPad?" },
  { id: "2", title: "Why is it called PinPad?" },
];

export default function LessonsScreen() {
  const router = useRouter();

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/MGF51cA.jpg" }} // 🔹 replace with your image (URL or require("../assets/bg.png"))
          style={styles.background}
          resizeMode="cover"
        >
    <View style={styles.container}>
      <Text style={styles.header}>PinPad</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/lessons/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "rgba(26, 26, 26, 0.53)" },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffffff",
    marginTop: 45,
  },
  card: {
    padding: 18,
    marginVertical: 10,
    backgroundColor: "rgba(26, 26, 26, 0.53)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffffffff",
  },
  title: { fontSize: 18, fontWeight: "600", color: "#fff" },
});
