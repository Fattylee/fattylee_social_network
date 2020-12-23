import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export const Header = () => {
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "home" : pathname.substr(1);
  });

  const handleItemClick = (e, { name }) => setActiveItem(name);

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
      </Menu.Menu>
    </Menu>
  );
};
