import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineExperiment,
  AiOutlineAim,
} from "react-icons/ai";
import { FaBtc } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "./menu.scss";

const cx = classNames.bind(styles);

type LinkShape = {
  path: string;
  text: string;
  icon: JSX.Element;
};

const links: Array<LinkShape> = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: <AiOutlineDashboard color="#ffffff" size="25px" />,
  },
  {
    path: "/feed",
    text: "Expenses Feed",
    icon: <AiOutlineExperiment color="#ffffff" size="25px" />,
  },
  {
    path: "/real_time",
    text: "Real Time stuff",
    icon: <AiOutlineAim color="#ffffff" size="25px" />,
  },
];

const Menu = () => {
  const { pathname } = useLocation();

  const readableRoute = pathname.replace("/", "").split("_");

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <h3 className={cx({ route: true })}>{readableRoute}</h3>
        <div className={styles.head}>
          <FaBtc color="#ffffff" size="25px" style={{ marginRight: "12px" }} />
          Expenses
        </div>
        <div className={styles.tabs}>
          {links.map(({ path, text, icon }) => (
            <div
              className={cx({ tab: true, current: pathname === path })}
              key={path}
            >
              <span className={styles.icon}>{icon}</span>
              <Link to={path} className={styles.link}>
                {text}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
