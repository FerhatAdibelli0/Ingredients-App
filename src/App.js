import React, { useContext } from "react";
import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./Context/auth-context";

const App = (props) => {
  const ctx = useContext(AuthContext);

  let content = <Auth />;
  if (ctx.isAuth) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
