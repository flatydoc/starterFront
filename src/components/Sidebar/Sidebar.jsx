import { NavLink, useNavigate } from "react-router-dom";

import { Menu } from "primereact/menu";
import styles from "./Sidebar.module.scss";
import classNames from "classnames";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AuthContext } from "../../core/context/AuthContext";

export const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const items = [
    {
      label: "Events",
      icon: "pi pi-calendar",
      command: () => navigate(`/events`),
    },
    {
      label: "Artists",
      icon: "pi pi-users",
      command: () => navigate(`/artists`),
    },
    {
      label: "My subscriptions",
      icon: "pi pi-users",
      command: () => navigate(`/subscriptions`),
    },
  ];

  const sidebarActiveHandler = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div
      className={classNames(styles.sidebarWrapper, {
        [styles.active]: sidebarVisible,
      })}
      onClick={() => setSidebarVisible(false)}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <Button
            onClick={sidebarActiveHandler}
            icon="pi pi-times"
            rounded
            size="large"
            text
            aria-label="Filter"
          />
          <NavLink to="/">Logo</NavLink>
        </div>
        <Menu model={items} />
      </aside>
    </div>
  );
};
