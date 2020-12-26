import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../App";

export const Header = () => {
  const {
    auth: { isAuthenticated, user },
    setAuth,
  } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "home" : pathname.substr(1);
  });

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === "logout") {
      setAuth({ isAuthenticated: false, user: null });
    }
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        {isAuthenticated ? (
          <>
            <Menu.Item
              as={Link}
              to="/dashboard"
              icon="user"
              name={user.username}
              active={activeItem === user.username}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
            />
          </>
        ) : (
          <>
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/register"
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
            />
          </>
        )}{" "}
      </Menu.Menu>
    </Menu>
  );
};
