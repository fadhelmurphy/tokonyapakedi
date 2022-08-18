import React from "react";
import { Link } from "react-router-dom";
import styled from '@emotion/styled'
import { css } from '@emotion/css'

const Menu = (props) => {
    const MenuWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    padding: 20px;
    & .list-menu div:not(:first-child) {
        margin: 0 0 0 20px;
    }
    & .list-menu div a {
        font-family: system-ui;
        font-weight: 600;
        font-style: normal;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
    }
    & .list-menu div a:not(:first-child) {
      margin-left: 20px;
    }
    `
  return (
    <MenuWrapper>
      <div className={`list-menu `+css`
        display: flex
      `}>
        {props.menuList.map((item) => (
          <div>
            <Link to={item.url}>
              {item.text}
            </Link>
            <br />
          </div>
        ))}
      </div>
    </MenuWrapper>
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
            text: "My Collection",
          },
        ]}
      />
      {children}
    </>
  );
}
