import React from "react";
import { View, Text, StyleSheet, ScrollView , ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";

const lessonsContent = {
  "1": {
    title: "What is PinPad?",
    content:
      "What is PinPad?\n\n" +
      "PinPad is a submitting note app,\n" +
      "display your necessary notes without losing it,\n" +
      "allowing users to create more notes for focus,\n" +
      "and making sure your notes are kept in privately.\n",
  },
  "2": {
    title: "Why is it called PinPad?",
    content:
        "Why is it called PinPad?\n\n" +
      "PinPad is originally a hardware detecting app,\n" +
      "letting know what's the best hardware for a game,\n" +
      "allowing users to identify the needs without problem,\n" +
      "this way, you don't need to ask someone for troubleshoot.\n",
  },
};

export default function LessonDetail() {
  const { id } = useLocalSearchParams();
  const lesson = lessonsContent[id];

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Note Error: Not Found</Text>
      </View>
    );
  }

  return (
    <ImageBackground
              source={{ uri: "https://imgur.com/jPVuoOX.jpg" }} 
              style={styles.background}
              resizeMode="cover"
            >
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
    </ScrollView>
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
    backgroundColor: "rgba(26, 26, 26, 0.53)" 
  },
  title: {
    width: 400,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffffff",
    textAlign: "center",
    marginTop: 40,
  },
  content: {
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 26,
    color: "#fff",
    backgroundColor: "rgba(26, 26, 26, 0.53)",
    padding: 16,
    borderRadius: 12,
    borderColor: "#ffffffff",
  },
});
