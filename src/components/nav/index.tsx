import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FiSettings, FiMessageCircle } from "react-icons/fi";
import classNames from "classnames/bind";

import { useClickAway } from "hooks/";

import styles from "./styles.scss";
import { REDUCERS, Message } from "types/*";

type Notification = {
  id: number;
  text: string;
};

type MenuProps = {
  open: boolean;
  notifications: Array<Notification>;
};

const cx = classNames.bind((styles as unknown) as Record<string, string>);

const NotificationsPopup: React.FC<MenuProps> = ({ open, notifications }) => (
  <div
    className={cx({
      notificationsContainer: true,
      open,
    })}
  >
    {notifications.map((entry) => (
      <div key={entry.id} className={cx({ notification: true })}>
        <span>{entry.text}</span>
      </div>
    ))}
  </div>
);

const getMessages = (state) => state.system.messages;

const Nav: React.FC = () => {
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const messages = useSelector<REDUCERS.RootState, Message[]>(getMessages);

  useClickAway(menuRef, () => setNotifOpen(false));

  const toggleMenu = () => setNotifOpen(!notifOpen);

  return (
    <div className={styles.nav}>
      <div
        className={cx({
          messages: true,
          hasMessages: true,
        })}
        onClick={toggleMenu}
        ref={menuRef}
      >
        <FiMessageCircle color="#ffffff" size="22" />
        <NotificationsPopup open={notifOpen} notifications={messages} />
      </div>
      <FiSettings color="#ffffff" size="22" className={styles.settings} />
      <img src="assets/avatar.png" className={styles.image} />
    </div>
  );
};

export default Nav;
