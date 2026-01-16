import { auth, db, storage } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    document.getElementById("profileEmail").innerText = "Not logged in";
    return;
  }
  document.getElementById("profileEmail").innerText = user.email;
});

window.saveProfile = async function () {
  const user = auth.currentUser;
  if (!user) return;
  await setDoc(doc(db, "users", user.uid), {
    username: username.value,
    bio: bio.value
  }, { merge: true });
  alert("Profile saved");
};

window.uploadProfilePhoto = async function (file) {
  const user = auth.currentUser;
  if (!user) return;
  const imgRef = ref(storage, "profiles/" + user.uid);
  await uploadBytes(imgRef, file);
  const url = await getDownloadURL(imgRef);
  profilePhoto.src = url;
};

window.logoutUser = function () {
  signOut(auth);
};
