import React from "react";
import MainNavigation from "./MainNavigation";
import styles from "./Layout.module.css";
import PropTypes from "prop-types";

const Layout: React.FC = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
