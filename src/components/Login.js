import { ACTION_TYPES } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { useBody, useForm } from "../assets/jss/login";
import { useContext, useEffect, useState } from "react";
import GetUsersData, { LoginState } from "../firebase/getUsersDate";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export default function Login() {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();
  let userName = "";
  let password = "";
  const bodyStyle = useBody();
  const formStyle = useForm();

  const [loginState, setLoginState] = useState([]);
  const [falseUserName, setFalseUserName] = useState(false);

  useEffect(() => {
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
      const querySnapshot = await getDocs(collection(db, "login"));
      querySnapshot.forEach((doc) => {
        setLoginState(doc.data());
      });
    }

    getData();
  }, []);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  function login() {
    loginState.login.map((item) => {
      console.log(item);
      console.log(userName);
      console.log(password);
      if (item.username === userName && item.password === password) {
        dispatch({
          type: ACTION_TYPES.CHANGE_USER_NAME,
          newUserName: userName,
        });
      } else {
        setFalseUserName(true);
      }
    });
  }

  function catchUserName(e) {
    userName = e.target.value;
  }
  function catchPassword(e) {
    password = e.target.value;
  }
  function wrong() {
    return (
      <div className={formStyle.wrongUserName}>Wrong username or password</div>
    );
  }

  function register() {
    navigate("/register");
  }

  if (state.userName) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={bodyStyle.body}>
      <div className={formStyle.form}>
        <h2 className={formStyle.title}>Login Form</h2>

        <label className={formStyle.userName}>
          <b>Login</b>
        </label>
        <input
          className={formStyle.input}
          type="text"
          placeholder="Enter Username"
          onChange={(e) => catchUserName(e)}
          required
        ></input>
        <input
          className={formStyle.input}
          type="password"
          placeholder="Enter password"
          onChange={(e) => catchPassword(e)}
          required
        ></input>
        {falseUserName && wrong()}
        <button className={formStyle.login} onClick={login}>
          Log in
        </button>
        <button className={formStyle.login} onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
