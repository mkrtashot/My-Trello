import React, { useContext } from "react";
import { State } from "../App";

export default function useUserContext() {
  return useContext(State);
}
