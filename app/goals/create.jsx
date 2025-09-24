import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoals } from "../../hooks/useGoals";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";

const Create = () => {
  const [goal, setGoal] = useState("");
  const { createGoal } = useGoals();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!goal.trim()) return;

    await createGoal({
      title: goal,
      progress: 0,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    });

    setGoal('')
    Keyboard.dismiss();
    router.push("/goals");
  };

  return (
    <ImageBackground
              source={{ uri: "https://imgur.com/Ugb44WU.jpg" }}  // <--- How to Change Background as Image (Indian)
              style={styles.background}
              resizeMode="cover"
            >
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.header}>PinPad</Text>
        <Text style={styles.subtitle}>Create a Pin Note</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            placeholderTextColor="#bfbfbf"
            value={goal}
            onChangeText={setGoal}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Add Pin Note</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default Create;

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  safe: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.53)', // Ako nana gi fade (burst fade)
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    color: "#ffffffff", // white nana kay cute kayko
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: 500,
    minHeight: 140,
    backgroundColor: "#2a2a2a", // burst fade parin to ya
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  input: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    padding: 6,
  },
  button: {
    width: 350,
    padding: 16,
    backgroundColor: "#ffffffff", 
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.95,
  },
  buttonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
});
