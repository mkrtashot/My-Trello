import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useBody, useForm } from "../assets/jss/login";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loginState, setLoginState] = useState([]);
  const [catchFirstName, setName] = useState("");
  const [catchUsername, setUsername] = useState("");
  const [catchUserPassword, setUserPassword] = useState("");
  const [isRegistered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const bodyStyle = useBody();
  const formStyle = useForm();

  const firebaseConfig = {
    apiKey: "AIzaSyDFiZzLHR5ih1u7edJKePdOgEMAUfXfVaY",
    authDomain: "my-fake-trello.firebaseapp.com",
    projectId: "my-fake-trello",
    storageBucket: "my-fake-trello.appspot.com",
    messagingSenderId: "363786127229",
    appId: "1:363786127229:web:2ce5bc5bb805c91af3ee14",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setLoginState(doc.data());
    });
  }

  getData();

  function catchName(e) {
    setName(e.target.value);
  }

  function catchUserName(e) {
    setUsername(e.target.value);
  }

  function catchPassword(e) {
    setUserPassword(e.target.value);
  }

  async function setNewUser() {
    let newUser = {
      name: catchFirstName,
      username: catchUsername,
      password: catchUserPassword,
      state: {},
    };

    console.log(loginState);

    try {
      const docRef = doc(db, "login", "loginData");

      await updateDoc(docRef, {
        login: arrayUnion(newUser),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function register() {
    if (
      catchFirstName !== "" &&
      catchUsername !== "" &&
      catchUserPassword !== ""
    ) {
      console.log("works");
      setNewUser();
      setRegistered(true);
    }
  }
  function login() {
    navigate("/login");
  }

  return (
    <div className={bodyStyle.body}>
      <div className={formStyle.form}>
        <h2 className={formStyle.title}>Registration Form</h2>

        <label className={formStyle.userName}>
          <b>Register</b>
        </label>
        <input
          className={formStyle.input}
          type="text"
          placeholder="Your Name"
          onChange={(e) => catchName(e)}
          required
        ></input>
        <input
          className={formStyle.input}
          type="text"
          placeholder="Your Username"
          onChange={(e) => catchUserName(e)}
          required
        ></input>
        <input
          className={formStyle.input}
          type="password"
          placeholder="Your Password"
          onChange={(e) => catchPassword(e)}
          required
        ></input>
        {isRegistered && (
          <div className={formStyle.register}>Registered successfully</div>
        )}
        <button className={formStyle.login} onClick={register}>
          Register
        </button>
        <button className={formStyle.login} onClick={login}>
          Go back to login page
        </button>
      </div>
    </div>
  );
}
