import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/news">News</Link>
    <Link to="/real_time">Real Time</Link>
  </>
);

export default Menu;
