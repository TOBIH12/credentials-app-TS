import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);


export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(() =>{
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser]);

  return  <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}

// This file is the UserContext.jsx file that contains the UserContext and UserProvider components. The UserContext component is created using the createContext function from React. The UserProvider component is a custom component that uses the UserContext.Provider component to provide the currentUser and setCurrentUser state values to its children components. The UserProvider component also uses the useEffect hook to update the currentUser state value in the local storage whenever it changes. The UserProvider component is then exported along with the UserContext component.