import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    const [posts, setPosts] = useState(()=>{
      return JSON.parse(localStorage.getItem('users'))||[]
    })

    useEffect(() => {
    localStorage.setItem("users", JSON.stringify(posts));
  }, [posts]);

  return (
    <userContext.Provider value={{posts,setPosts}}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;