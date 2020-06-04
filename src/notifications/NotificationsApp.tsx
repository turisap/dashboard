import React from "react";
import { Provider } from "react-redux";

import { notificationStore } from "../redux/notificationStore";

const App: React.FC = () => (
  <Provider store={notificationStore}>
    <p>notificaions</p>
  </Provider>
);

export default App;
