import React, { useContext } from "react";

import { AuthContext } from "../../core/context/AuthContext";
import styles from "./Header.module.scss";
import { logout } from "../../core/api/users";

export const Header = () => {
  const { isLogin, user, leave } = useContext(AuthContext);

  const exit = async () => {
    try {
      await logout().then(() => {
        leave();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      {isLogin ? <p>{user.email}</p> : <p>авторизуйтесь</p>}
      {isLogin && <button onClick={exit}>Log out</button>}
    </header>
  );
};
