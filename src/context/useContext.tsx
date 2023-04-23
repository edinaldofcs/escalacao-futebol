import { useContext } from "react";
import { Context } from "./context";

export const useImgContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContext");
  }

  return context;
};