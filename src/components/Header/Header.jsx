import React, { useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { AuthContext } from "../../core/context/AuthContext";
import styles from "./Header.module.scss";
import { logout } from "../../core/api/users";
import { NavLink, useNavigate } from "react-router-dom";
import { SplitButton } from "primereact/splitbutton";

export const Header = ({ sidebarVisible, setSidebarVisible }) => {
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

  const items = [
    {
      label: "Log out",
      icon: "pi pi-sign-out",
      command: () => {
        exit();
      },
    },
  ];

  const navigate = useNavigate();

  const sidebarActiveHandler = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarVisible ? "hidden" : "unset";
  }, [sidebarVisible]);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Button
          onClick={sidebarActiveHandler}
          icon="pi pi-bars"
          rounded
          size="large"
          text
          aria-label="Filter"
        />
        <NavLink to="/">Logo</NavLink>
      </div>
      {isLogin ? (
        <SplitButton
          label={user.name}
          severity="secondary"
          icon="pi pi-user"
          // onClick={save}
          model={items}
          text
        />
      ) : (
        <Button
          label="Log in"
          icon="pi pi-sign-in"
          onClick={() => navigate("signin")}
        />
      )}
    </header>
  );
};
