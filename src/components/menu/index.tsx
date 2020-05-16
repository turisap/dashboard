import React from "react";
import { Link } from "react-router-dom";

import styles from "./menu.scss";

type LinkShape = {
  path: string;
  text: string;
};

const links: Array<LinkShape> = [
  {
    path: "/",
    text: "Dashboard",
  },
  {
    path: "/news",
    text: "Expenses Feed",
  },
  {
    path: "/real_time",
    text: "Real Time stuff",
  },
];

const Menu = () => (
  <div className={styles.wrapper}>
    {links.map(({ path, text }) => (
      <Link to={path} key={path}>
        {text}
      </Link>
    ))}
  </div>
);

export default Menu;
