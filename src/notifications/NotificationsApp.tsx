import React from "react";
import { Provider } from "react-redux";

import { notificationStore } from "./reducer";

const App: React.FC = () => (
  <Provider store={notificationStore}>
    <p>notificaions</p>
  </Provider>
);

export default App;
