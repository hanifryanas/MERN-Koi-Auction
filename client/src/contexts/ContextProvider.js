import React, { createContext, useContext, useState, useEffect } from "react";
import atob from 'atob';

const StateContext = createContext({});

const initialFilterState = {
  Type: "",
  Size : "",
  Gender : "",
  Price: "",
}

export const ContextProvider = ({ children }) => {
  
const api = `http://localhost:3500`
const currentToken = localStorage.getItem('token');

  // const [color , setColor] = useState("#000000");
const [activeMenu, setActiveMenu] = useState(true);
const [isFiltered, setIsFiltered] = useState(initialFilterState);
const [popUp, setPopUp] = useState('');
const [isAdmin, setIsAdmin] = useState(false);
const [mainView, setMainView] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [user, setUser] = useState({});
const [newUpdateProduct, setNewUpdateProduct] = useState('');


useEffect(() => {
  updateUserLogin();
}, [currentToken]);

const updateUserLogin = () => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    const parsedUser = JSON.parse(atob(accessToken.split(".")[1]));
    setUser(parsedUser);
    setIsLoggedIn(true);
    (parsedUser.username === "admin") && setIsAdmin(true);
  }
  else {
    setIsLoggedIn(false);
    setIsAdmin(false);
  }
}

const handleFilter = (filterSelector, value) => {
  setIsFiltered({...isFiltered, [filterSelector]: value});
}

return (
  <StateContext.Provider value={{ api, activeMenu, setActiveMenu, handleFilter, isFiltered, popUp, setPopUp, isAdmin, setIsAdmin, mainView, setMainView, isLoggedIn, setIsLoggedIn, user, setUser, newUpdateProduct, setNewUpdateProduct }}>
    {children}
  </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
