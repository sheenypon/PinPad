import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity , ImageBackground } from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/auth/login");
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffffff" />
      </View>
    );
  }

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/OmpdVZ2.jpg" }} 
          style={styles.background}
          resizeMode="cover"
        >
    <View style={styles.container}>
      <Text style={styles.title}>PINPAD</Text>
      <Text style={styles.subtitle}></Text>

      {/* Notes Section */}
      <TouchableOpacity style={styles.card} onPress={() => router.push("/goals")}>
        <Text style={styles.cardText}>View Pin Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push("/goals/create")}>
        <Text style={styles.cardText}>Type Pin Notes</Text>
      </TouchableOpacity>

      {/* Lessons Section */}
      <TouchableOpacity style={styles.card} onPress={() => router.push("/lessons")}>
        <Text style={styles.cardText}>About PinPad</Text>
      </TouchableOpacity>

    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(26, 26, 26, 0.53)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#e9dbffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    width: 500,
    backgroundColor: "rgba(28, 27, 37, 0.53)",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff2c",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Home;
