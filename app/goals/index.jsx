import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Alert, 
  Modal, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { EllipsisVertical } from 'lucide-react-native'; 

const ChessNotes = () => {
  const [goals, setGoals] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'goals'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(list);
    });

    return unsubscribe;
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const docRef = doc(db, 'goals', id);
              await deleteDoc(docRef);
              console.log('Note deleted:', id);
            } catch (error) {
              console.log('Error deleting note:', error);
            }
          },
        },
      ]
    );
  };


  const formatDate = (date) => {
    if (!date) return 'Unknown';
    const jsDate = date.toDate ? date.toDate() : date;
    return jsDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ImageBackground
          source={{ uri: "https://imgur.com/l2xUlm0.jpg" }} 
          style={styles.background}
          resizeMode="cover"
        >
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PinPad Notes</Text>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
            <Text style={styles.noteDate}>
              💎 Date created: {formatDate(item.createdAt)}
            </Text>

            {}
            <Pressable 
              onPress={() => setMenuVisible(item.id)} 
              style={styles.menuBtn}
            >
              <EllipsisVertical size={22} color="#fff" />
            </Pressable>

            {}

          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>This space need to fill up!</Text>
        }
      />

      <Pressable style={styles.logoutBtn} onPress={() => signOut(auth)}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default ChessNotes;

const styles = StyleSheet.create({
  background : {
    flex:1 ,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.53)',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffffff',
  },
  noteCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.53)',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'relative',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingRight: 28, 
  },
  noteDate: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  menuBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 150,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
    color: '#aaa',
  },
  logoutBtn: {  
    backgroundColor: '#141414ff',
    margin: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
