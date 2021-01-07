// import { useSubscription } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
// import { NEW_POST_SUB } from "../utils/query";

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(() => {
    const pathname = window.location.pathname;
    return pathname === "/" ? "sayurs" : pathname.substr(1);
  });
  // useSubscription(NEW_POST_SUB, { subscription() {} });

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const authLinks = (
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        icon="microphone"
        as={Link}
        to="/"
        name="sayurs"
        active={activeItem === "sayurs"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item name={user?.username} />
        <Menu.Item name="logout" as={Link} to="/" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );

  const guestLinks = (
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        icon="microphone"
        as={Link}
        to="/"
        name="sayurs"
        active={activeItem === "sayurs"}
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
