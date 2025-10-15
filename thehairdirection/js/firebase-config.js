// Firebase Configuration (Realtime Database only - NO STORAGE)
const firebaseConfig = {
  apiKey: "AIzaSyDmYeInEH9tP7ZaBRXuQWstoovezi_dAj4",
  authDomain: "thehairdirection-d3f31.firebaseapp.com",
  projectId: "thehairdirection-d3f31",
  storageBucket: "thehairdirection-d3f31.firebasestorage.app",
  messagingSenderId: "744475068477",
  appId: "1:744475068477:web:1208e649d671c59b940254",
  measurementId: "G-N9GKR32QBY"
};
// Initialize Firebase (Only Database)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ImgBB API Key (Replace with yours)
const IMGBB_API_KEY = '63fe6beb3e4c2d19460cfdac7244e3b7'; // PASTE YOUR API KEY HERE

// Export
window.db = database;
window.IMGBB_API_KEY = IMGBB_API_KEY;
