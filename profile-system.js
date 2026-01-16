// FINAL SingVerse Profile System (Firebase) // Fully corrected + ready to use

import { auth, db, storage } from "./firebase-config.js"; import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ============================== // 1. CHECK USER LOGIN // ============================== onAuthStateChanged(auth, async (user) => { if (!user) { window.location.href = "login.html"; return; }

document.getElementById("profileEmail").innerText = user.email;

// Load profile data loadUserProfile(user.uid); });

// ============================== // 2. LOAD PROFILE FROM FIRESTORE // ============================== async function loadUserProfile(uid) { const userRef = doc(db, "users", uid); const snap = await getDoc(userRef);

if (snap.exists()) { const data = snap.data();

if (data.username)
  document.getElementById("username").value = data.username;

if (data.bio)
  document.getElementById("bio").value = data.bio;

if (data.photoURL)
  document.getElementById("profilePhoto").src = data.photoURL;

} }

// ============================== // 3. SAVE PROFILE DATA // ============================== export async function saveProfile() { const user = auth.currentUser; if (!user) return;

const username = document.getElementById("username").value; const bio = document.getElementById("bio").value;

const userRef = doc(db, "users", user.uid);

await setDoc( userRef, { username: username, bio: bio, photoURL: user.photoURL || null, }, { merge: true } );

alert("Profile Updated!"); }

// ============================== // 4. UPLOAD PROFILE PHOTO // ============================== export async function uploadProfilePhoto(file) { const user = auth.currentUser; if (!user) return;

// FIXED PATH ERROR HERE (Correct Syntax) const imgRef = ref(storage, profile/${user.uid}.jpg);

await uploadBytes(imgRef, file); const url = await getDownloadURL(imgRef);

document.getElementById("profilePhoto").src = url;

await updateProfile(user, { photoURL: url });

const userRef = doc(db, "users", user.uid); await setDoc(userRef, { photoURL: url }, { merge: true });

alert("Profile Photo Updated!"); }

// ============================== // 5. LOGOUT SYSTEM // ============================== export function logoutUser() { auth.signOut().then(() => { window.location.href = "login.html"; }); }
