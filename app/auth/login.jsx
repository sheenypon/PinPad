import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { router } from "expo-router";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);


      router.replace("/");  
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://imgur.com/WDy4Qn3.jpg" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}> PinPad </Text>
        <Text style={styles.subtitle}>Log In To Your Account!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* ✅ Make sure navigation points to signup.jsx, not just /auth */}
        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}>No Account? Sign up here!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "rgba(26, 26, 26, 0.53)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#1d1d1d",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#1d1d1d",
    width: 400,
  },
  button: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    width: 320,
  },
  buttonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: { color: "#fff", textAlign: "center" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
