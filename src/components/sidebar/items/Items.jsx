import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import LogoBlue from "../../../assets/images/logo_blue.svg";
import LogoWhite from "../../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdOutlineArrowDropDown,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../Sidebar.scss";
import { SidebarContext } from "../../../context/SidebarContext";

export const Items = ({
  text,
  path = null,
  childrens,
  active,
  classprop,
  index = null,
  indexChild = undefined,
  handleClickContinue,
}) => {
  const onHandleClick = () => {
    handleClickContinue(index, indexChild);
  };

  return (
    <Link
      to={path ? path : "#"}
      className={`menu-link ${active ? classprop : ""}`}
      onClick={onHandleClick}
    >
      <span className="menu-link-icon">
        <MdOutlineGridView size={18} />
      </span>
      <span className="menu-link-text">{text}</span>
      <span className="menu-link-icon"></span>
      {childrens && <MdOutlineArrowDropDown size={18} />}
    </Link>
  );
};
