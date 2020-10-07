import React from "react";
import "antd/dist/antd.css";
import Icon from "@ant-design/icons";

const MenuSvg = () => (
  <svg
    width="27"
    height="15"
    viewBox="0 0 27 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.1563 2.43746H0.843796C0.378029 2.43746 6.86646e-05 2.05943 6.86646e-05 1.59373C6.86646e-05 1.12796 0.378098 0.75 0.843796 0.75H26.1563C26.622 0.75 27 1.12803 27 1.59373C27 2.05943 26.622 2.43746 26.1563 2.43746Z"
      fill="white"
    />
    <path
      d="M0.843796 6.65625H26.1563C26.622 6.65625 27 7.03428 27 7.49998C27 7.96568 26.622 8.34371 26.1563 8.34371H0.843796C0.378029 8.34371 6.86646e-05 7.96568 6.86646e-05 7.49998C6.86646e-05 7.03428 0.378029 6.65625 0.843796 6.65625Z"
      fill="white"
    />
    <path
      d="M0.843794 12.5625H17.7188C18.1845 12.5625 18.5625 12.9405 18.5625 13.4062C18.5625 13.872 18.1845 14.25 17.7188 14.25H0.843794C0.378025 14.25 6.48499e-05 13.8719 6.48499e-05 13.4062C-5.72205e-06 12.9405 0.378025 12.5625 0.843794 12.5625Z"
      fill="white"
    />
  </svg>
);

interface MenuIconProps {} //TODO fix props interface

const MenuIcon = (props: MenuIconProps) => (
  <Icon component={MenuSvg} {...props} />
);

export default MenuIcon;
