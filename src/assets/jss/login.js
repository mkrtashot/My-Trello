import { createUseStyles } from "react-jss";

export const useBody = createUseStyles(
  {
    body: {
      alignItems: "center",
      // backgroundColor: "#000",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
    },
  },
  { name: "body" }
);
export const useForm = createUseStyles(
  {
    form: {
      backgroundColor: "#15172b",
      borderRadius: "20px",
      boxSizing: "border-box",
      height: "auto",
      padding: "20px",
      width: "320px",
    },
    title: {
      color: "#eee",
      fontFamily: "sans-serif",
      fontSize: "36px",
      fontWeight: "600",
      marginTop: "30px",
    },
    userName: {
      color: "#eee",
      fontFamily: "sans-serif",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "10px",
    },
    input: {
      top: "15px",
      height: "25px",
      position: "relative",
      width: "100%",
      borderRadius: "12px",
      border: "0",
      boxSizing: "border-box",
      // color: "#eee",
      cursor: "pointer",
      textAlign: "center",
      marginBottom: "10px",
    },
    placeholder: {
      color: "#65657b",
      fontFamily: "sans-serif",
      left: "20px",
      lineHeight: "14px",
      pointerEvents: "none",
      position: "absolute",
      transformOrigin: "0 50%",
      transition: "transform 200ms, color 200ms",
      top: "20px",
    },
    login: {
      backgroundColor: "#08d",
      borderRadius: "12px",
      border: "0",
      boxSizing: "border-box",
      color: "#eee",
      cursor: "pointer",
      fontSize: "18px",
      height: "50px",
      marginTop: "38px",
      textAlign: "center",
      width: "100%",
    },
    wrongUserName: {
      color: "red",
      marginTop: "10px",
      marginLeft: "30px",
    },
    register: {
      color: "green",
      marginTop: "10px",
      marginLeft: "60px",
    },
  },
  { name: "form" }
);
