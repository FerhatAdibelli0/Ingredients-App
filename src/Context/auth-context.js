import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenicated, setIsAuthneticated] = useState(false);

  const loginHandler = () => {
    setIsAuthneticated(true);
  };

  const context = { isAuth: isAuthenicated, login: loginHandler };
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
