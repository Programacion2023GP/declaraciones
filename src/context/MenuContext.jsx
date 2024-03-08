import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export default function MenuContextProvider({ children }) {
  //    const { auth } = useAuthContext();
  const [open, setOpen] = useState(true);

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
export const useMenuContext = () => useContext(MenuContext);
