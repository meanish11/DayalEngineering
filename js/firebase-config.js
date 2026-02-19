// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app

const firebaseConfig = {
    apiKey: "AIzaSyAX-aC2zgWE0Djswl0EMmK-gEaH2Whgb8Q",
    authDomain: "dayal-engg.firebaseapp.com",
    projectId: "dayal-engg",
    storageBucket: "dayal-engg.firebasestorage.app",
    messagingSenderId: "1:385428839842:web:78b020c5d36a65cd5ce6fb",
    appId: "1:385428839842:web:78b020c5d36a65cd5ce6fb"
};

// Initialize Firebase
// Add these scripts to your HTML before this file:
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>

let db, storage;

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        storage = firebase.storage();
        console.log('Firebase initialized successfully');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { db, storage };
}
