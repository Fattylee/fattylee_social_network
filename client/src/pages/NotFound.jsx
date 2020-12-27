import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h3>
        Requested page not found, goto <Link to="/">Home</Link>
      </h3>
    </div>
  );
};
