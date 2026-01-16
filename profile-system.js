import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth,user=>{
  if(user) profileEmail.innerText=user.email;
});

window.saveProfile = async ()=>{
  const user=auth.currentUser;
  if(!user) return alert("Login required");
  await setDoc(doc(db,"users",user.uid),{
    username:username.value,
    bio:bio.value
  });
  alert("Saved");
};

window.logoutUser = ()=>signOut(auth);
