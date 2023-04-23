import { createContext, useState } from "react";


interface IContext {
  img: string;
  updateImg: (url: string) => void;
}

export const Context = createContext<IContext | null>(null);

export const Provider = ({ children }: any) => {
  const [img, setImg] = useState("");

  const updateImg = (url: string) => {
    setImg(url);
  };

  return (
    <Context.Provider value={{ img, updateImg }}>{children}</Context.Provider>
  );
};
