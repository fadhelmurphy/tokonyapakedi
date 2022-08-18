import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <div className="menu-wrapper">
      <div style={{ display: "flex" }}>
        {props.menuList.map((item) => (
          <>
            <Link to={item.url}>
              <h3>{item.text}</h3>
            </Link>
            <br />
          </>
        ))}
      </div>
      <style jsx="true">
        {`
          .menu-wrapper {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 15px;
            padding: 20px;
          }
          a {
            font-family: system-ui;
            font-weight: 600;
            font-style: normal;
            font-size: 14px;
            line-height: 24px;
            text-transform: uppercase;
            text-decoration: none;
            color: #000;
          }
          a:not(:first-child) {
            margin-left: 20px;
          }
        `}
      </style>
    </div>
  );
};
export default function Layout({ children }) {
  return (
    <>
      <Menu
        menuList={[
          {
            url: "/",
            text: "Home",
          },
          {
            url: "/collection",
            text: "Collection",
          },
        ]}
      />
      {children}
    </>
  );
}
