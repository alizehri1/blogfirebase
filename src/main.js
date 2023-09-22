
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    doc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    setDoc,
    Timestamp,
  } from "firebase/firestore";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB2XsFFbqAediudAXsIeJMlV3Z21I7ZYWY",
  authDomain: "my-blog-cb5ef.firebaseapp.com",
  projectId: "my-blog-cb5ef",
  storageBucket: "my-blog-cb5ef.appspot.com",
  messagingSenderId: "215170820724",
  appId: "1:215170820724:web:af5b70d3c178ee55e37f21",
  measurementId: "G-3031ZKY26Z"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const db = getFirestore()
const auth = getAuth()

// signup start
const signup = document.querySelector("#signupform")
const alert = document.querySelector(".red-alert")

signup.addEventListener("submit",async(e)=>{
  e.preventDefault()
  const name = e.target.name.value;
  const email = e.target.email.value;
  const pass = e.target.password.value;
  if(!name || !email || !password){
      alert.Style.display = "block"
  }
  else{
    alert.style.display='none'

    await createUserWithEmailAndPassword(auth, email, password)
.then(async(userCredential) => {
 // Signed in 
 const user = userCredential.user;
 
 const userData={
     id:user.uid,
     Name:name,
     createdAt:Timestamp.fromDate(new Date()),
     email,
    
     
 }
 await setDoc(doc(db, "users", user.uid),userData);
 // ...
})
.catch((error) => {
 const errorCode = error.code;

 const errorMessage = error.message;
 if (errorCode?.includes('auth/email-already-in-use')){
     alert.style.display='block'
     alert.textContent='Email is already in use'

 }
 // ..
});
   
 }
})






// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

















// const _collection = collection(db, "usersID")

// getDocs(_collection).then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         console.log(doc.id,doc.data)

//     })
// }).catch((err) => console.log(err))

