import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import { Footer } from "../../components/Footer/Footer";
import { useState } from "react";

export const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <Header
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer>footer</Footer>
    </>
  );
};
