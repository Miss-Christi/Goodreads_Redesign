const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  doc, 
  writeBatch 
} = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCLvkNZnQQOMrOGSADzJzy3_wgcJjUdhuQ",
  authDomain: "goodreads-redesign-b66e9.firebaseapp.com",
  projectId: "goodreads-redesign-b66e9",
  storageBucket: "goodreads-redesign-b66e9.firebasestorage.app",
  messagingSenderId: "321124100126",
  appId: "1:321124100126:web:ede56ec29c91ab3f03660f",
  measurementId: "G-DLNGY67RRK"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load books.json
const dataPath = path.join(__dirname, 'frontend', 'src', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function seedFirebase() {
  console.log(`📚 Seeding ${books.length} books...`);

  const batch = writeBatch(db);
  const colRef = collection(db, 'books');

  books.forEach((book) => {
    // Deterministic ID (prevents duplicates)
    const id = book.Title.toLowerCase().replace(/\s+/g, '-');
    const docRef = doc(colRef, id);

    batch.set(docRef, book);
    console.log(`✅ Prepared: ${book.Title}`);
  });

  await batch.commit();
  console.log('🎉 Done'); 
}

seedFirebase().catch(console.error);
