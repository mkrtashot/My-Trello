// import React, { createContext, useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import useUserContext from "../hooks/useUserContext";

// export default function updateState() {
//   function useUpdateState() {
//     const [loginState, setLoginState] = useState([]);
//     const { state } = useUserContext();

//     const firebaseConfig = {
//       apiKey: "AIzaSyDFiZzLHR5ih1u7edJKePdOgEMAUfXfVaY",
//       authDomain: "my-fake-trello.firebaseapp.com",
//       projectId: "my-fake-trello",
//       storageBucket: "my-fake-trello.appspot.com",
//       messagingSenderId: "363786127229",
//       appId: "1:363786127229:web:2ce5bc5bb805c91af3ee14",
//     };

//     const app = initializeApp(firebaseConfig);

//     const db = getFirestore(app);

//     async function getData() {
//       const querySnapshot = await getDocs(collection(db, "users"));
//       querySnapshot.forEach((doc) => {
//         setLoginState(doc.data());
//       });
//     }

//     getData();

//     async function setNewUser() {
//       let update = {
//         state,
//       };

//       console.log(loginState);

//       try {
//         const docRef = doc(db, "users", "xXhDELgIZzCWLTDjsGRd");

//         await updateDoc(docRef, {
//           users: arrayUnion(update),
//         });

//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     }

//     setNewUser();

//     async function updateUser() {
//         let update = {
//             state,
//           };

//         const upUser = doc(db, "users","xXhDELgIZzCWLTDjsGRd")
//         await updateDoc(upUser, {
//             "users.state": update
//         });
//     }

// // Create an initial document to update.
//     const frankDocRef = doc(db, "users", "frank");
//     await setDoc(frankDocRef, {
//     name: "Frank",
//     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
//     age: 12
//     });

// // To update age and favorite color:
// await updateDoc(frankDocRef, {
//     "age": 13,
//     "favorites.color": "Red"
// });

//   }
// }
