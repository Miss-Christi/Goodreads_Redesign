import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// My firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLvkNZnQQOMrOGSADzJzy3_wgcJjUdhuQ",
  authDomain: "goodreads-redesign-b66e9.firebaseapp.com",
  projectId: "goodreads-redesign-b66e9",
  storageBucket: "goodreads-redesign-b66e9.firebasestorage.app",
  messagingSenderId: "321124100126",
  appId: "1:321124100126:web:ede56ec29c91ab3f03660f",
  measurementId: "G-DLNGY67RRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore Database
export const db = getFirestore(app);

// Helper function to fetch ALL books
export async function getBooks() {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// Helper function to fetch a SINGLE book
export async function getBook(id) {
  try {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}