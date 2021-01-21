import React from "react";
import { UIContext } from "../context/uiContext";

export const FictionPage = () => {
  return (
    <UIContext.Consumer>
      {(context) => {
        const { isLightTheme, light, dark, toggleTheme } = context;
        // console.log(context);
        const { color, bg } = isLightTheme ? light : dark;
        return (
          <>
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target.elements[0].value);
                console.log(e.target.submit());
              }}
            >
              <input
                type="search"
                min="5"
                max="10"
                // maxLength="2"
                name="url"
                id="urlId"
              />
              <input type="submit" value="Sumit" />
            </form>
            <div
              style={{
                border: "1px solid",
                margin: "10px",
                width: "400px",
                height: "300px",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                // console.log(e);
              }}
              onDrop={(e) => {
                // e.preventDefault();
                const data = e.dataTransfer.getData("text");
                console.log(data);
                e.target.appendChild(document.getElementById(data));
              }}
            >
              box
              <svg
                style={{ border: "1px solid", height: "200px", width: "200px" }}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="20"
                  fill="red"
                  stroke="black"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <div
              style={{
                background: bg,
                color,
                border: "1px solid",
                padding: "30px",
              }}
            >
              <header
                id="header"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const data = e.dataTransfer.getData("text");
                  console.log(data, "==header event====");
                  e.target.appendChild(document.getElementById(data));
                }}
              >
                <h1>Most important header</h1>
                <p>Whats up page</p>
                <button
                  id="btnDrag"
                  draggable
                  onClick={toggleTheme}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text", e.target.id);
                    console.log(e);
                  }}
                >
                  ToggleTheme
                </button>
              </header>
            </div>
          </>
        );
      }}
    </UIContext.Consumer>
  );
};
