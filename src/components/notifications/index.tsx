import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames/bind";
import { GoAlert, GoX, GoSync } from "react-icons/go";

import { REDUCERS, Notification } from "types/";
import { dismissNotification } from "ducks/notifications";

import styles from "./notifications.scss";

const cx = classnames.bind(styles as any);

type MessageProps = Notification & { dismiss: any };

const Message: React.FC<MessageProps> = ({ id, type, text, dismiss }) => (
  <div
    className={cx({ notificationWrapper: true, failure: type === "failure" })}
  >
    {type === "failure" ? (
      <GoAlert size="25" color="rgb(177, 41, 41)" />
    ) : (
      <GoSync size="25" color="rgb(29, 66, 29)" />
    )}
    <div>{text}</div>
    <GoX onClick={dismiss(id)} size="25" />
  </div>
);

const App: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector<REDUCERS.RootState, Notification[]>(
    (state) => state.notifications
  );

  const dismiss = (id: number) => () => dispatch(dismissNotification(id));

  return (
    <div className={styles.container}>
      {notifications.map((msg) => (
        <Message key={msg.id} {...msg} dismiss={dismiss} />
      ))}
    </div>
  );
};

export default App;
