import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  ImageBackground
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const EditChessNote = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const docRef = doc(db, "goals", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setCreatedAt(data.createdAt || null);
        }
      } catch (error) {
        console.log("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "goals", id);
      await updateDoc(docRef, { title });
      Keyboard.dismiss();
      router.push("/goals");
    } catch (error) {
      console.log("Error updating note:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";
    const jsDate = date.toDate ? date.toDate() : date;
    return jsDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffffff" />
      </View>
    );
  }

  return (
    <ImageBackground
                  source={{ uri: "https://imgur.com/qGqzASe.jpg" }}
                  style={styles.background}
                  resizeMode="cover"
                >
    <View style={styles.container}>
      <Text style={styles.header}>Edit Pin Notes</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Note Title"
          placeholderTextColor="#bfbfbf"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.metaText}>
          Created on: {formatDate(createdAt)}
        </Text>
      </View>

      <Pressable
        onPress={handleUpdate}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Update Pin Note</Text>
      </Pressable>
    </View>
    </ImageBackground>
  );
};

export default EditChessNote;

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(26, 26, 26, 0.53)", 
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#ffffffff", 
  },
  card: {
    backgroundColor: "rgba(35, 34, 43, 0.53)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffffff8f",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(35, 34, 43, 0.53)",
    color: "#fff",
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  metaText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 12,
  },
  button: {
    backgroundColor: "#ffffffff", 
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  buttonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});
