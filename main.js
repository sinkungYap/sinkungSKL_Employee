import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqXR9aF2Bk1wTvWHvQvGS69GI-dNuPd4E",
    authDomain: "login-2dac5.firebaseapp.com",
    projectId: "login-2dac5",
    storageBucket: "login-2dac5.firebasestorage.app",
    messagingSenderId: "10552598791",
    appId: "1:10552598791:web:30c4f0afd3363f3e03a5a2",
    measurementId: "G-19RYRFM900"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestor   e

// Google Sign-In function
document.getElementById('google-login-btn').addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log('User signed in:', user);
        

        // Save user data to Firestore
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,    
            lastLogin: new Date()
        });

        // Redirect to home page after successful sign-in
        window.location.href = "home.html";
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        alert(error.message); // Display the error message to the user
    }
});
