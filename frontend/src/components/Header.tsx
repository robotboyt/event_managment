import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

const Header = () => {
  const token = localStorage.getItem("token");

  const clearUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <header className="header">
      <Link to={"/"}>All Events</Link>
      <Link to={"/create"}>Create Event</Link>
      <Link to={"/login"}>Log in</Link>
      {token ? (
        <Link to={"/"} onClick={() => clearUser()}>
          Log Out
        </Link>
      ) : null}
    </header>
  );
};

export default Header;
