import { createUseStyles } from "react-jss";

export const useInsideModal = createUseStyles(
  {
    modalPart: {
      backgroundColor: "#15172b",
      borderRadius: "20px",
      boxSizing: "border-box",
      height: "auto",
      // padding: "20px",
      width: "50%",
      // marginBottom: "10px",
      color: "#eee !important",
      fontFamily: "sans-serif",
      fontSize: "25px",
      alignItems: "center",
      left: "50%",
      top: "50%",
      transform: "translate(50%, -65%)",
    },
    insideModal: {
      marginLeft: "30px",
    },
    input: {
      borderRadius: "12px",
      border: "0",
      boxSizing: "border-box",
      // color: "#eee",
      cursor: "pointer",
      fontSize: "18px",
      height: "35px",
      marginTop: "5px",
      marginRight: "5px",
      textAlign: "center",
      width: "500px",
    },
  },
  { name: "modal" }
);
