import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
  <div className="menu">
    <Link to="/">Home</Link>
    <Link to="/news">Newsyy</Link>
    <Link to="/real_time">Real Time</Link>
  </div>
);

export default Menu;
