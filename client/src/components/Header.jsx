import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "home" : pathname.substr(1);
  });

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const authLinks = (
    <Menu pointing size="massive" color="blue">
      <Menu.Item as={Link} to="/" name={user?.username} active />
      <Menu.Menu position="right">
        <Menu.Item name="logout" as={Link} to="/" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );

  const guestLinks = (
    <Menu pointing size="massive" color="blue">
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

  return user ? authLinks : guestLinks;
};
