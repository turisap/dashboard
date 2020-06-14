import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineExperiment,
  AiFillThunderbolt,
  AiOutlineVerticalLeft,
} from "react-icons/ai";
import { FaBtc } from "react-icons/fa";
import classNames from "classnames/bind";

import { useClickAway } from "hooks/";

import { HomeComponent } from "routes/home";
import { NewsComponent } from "routes/news";
import { PurchasesComponent } from "routes/purchases";

import styles from "./menu.scss";

const cx = classNames.bind((styles as unknown) as Record<string, string>);

type LinkShape = {
  path: string;
  text: string;
  icon: JSX.Element;
  preloadComponent: () => void;
};

const links: Array<LinkShape> = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: <AiOutlineDashboard color="#ffffff" size="25px" />,
    preloadComponent: HomeComponent.preload,
  },
  {
    path: "/feed",
    text: "Expenses Feed",
    icon: <AiOutlineExperiment color="#ffffff" size="25px" />,
    preloadComponent: NewsComponent.preload,
  },
  {
    path: "/purchases",
    text: "Purchases",
    icon: <AiFillThunderbolt color="#ffffff" size="25px" />,
    preloadComponent: PurchasesComponent.preload,
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const readableRoute = pathname.replace("/", "").split("_");

  useClickAway(menuRef, () => {
    if (menuOpen) setMenuOpen(false);
  });

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <div className={cx({ menu: true, menuOpen })}>
        <h3 className={cx({ route: true })}>{readableRoute}</h3>
        <div className={styles.head}>
          <FaBtc color="#ffffff" size="25px" style={{ marginRight: "12px" }} />
          Expenses
        </div>
        <div className={styles.tabs}>
          {links.map(({ path, text, icon, preloadComponent }) => (
            <div
              className={cx({ tab: true, current: pathname === path })}
              key={path}
              onMouseEnter={preloadComponent}
            >
              <span className={styles.icon}>{icon}</span>
              <Link to={path} className={styles.link}>
                {text}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.opener} onClick={toggleMenu}>
          <AiOutlineVerticalLeft color="#fefefe" size="35" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
