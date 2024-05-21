import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import Gomez from  "../../assets/icons/logo-gpd.png";
import {

  MdOutlineClose,

} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { Items } from "./items/Items";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  const [routes, setRoutes] = useState([
    {
      path: "",
      text: "Declaraciones",
      active: false,
      children: [
        {
          path: "misdeclaraciones",
          text: "Mis declaraciones",
          active: false,
        },
        {
          path: "declaraciones/steppers",
          text: "Declaraciones",
          active: false,
        },
      ],
    },
    {
      path:"",
      text:"Catalogos",
      active:false,
      children:[]
    },
    {
      path:"",
      text:"Reportes",
      active:false,
      children:[]
    },
    {
      path:"",
      text:"Checador",
      active:false,
      children:[]
    },
    {
      path:"usuarios",
      text:"Usuarios",
      active:false,
      children:[]
    },
  ]);
  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };
  const handleSelect = (index, childIndex) => {
    console.warn(index, childIndex);
    const updatedRoutes = [...routes];
    if (childIndex !== undefined) {
      routes[index].children.map((children) => {
        children.active = false;
      });

      updatedRoutes[index].children[childIndex].active = true;
    } else {
      routes.map((item) => {
        item.active = false;
        item.children.map((children) => {
          children.active = false;
        });
      });
      updatedRoutes[index].active = true;
    }
    setRoutes(updatedRoutes);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={Gomez} alt="" style={{height: 100, objectFit: "contain"}} />
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {routes.map((item, i) => (
              <li className="menu-item" key={i}>
                <Items
                  active={item.active}
                  classprop={"active"}
                  path={item.path}
                  key={`${item.path}-${i}`}
                  text={item.text}
                  childrens={item.children.length > 0 ? true : false}
                  index={i}
                  handleClickContinue={handleSelect}
                ></Items>
                <div
                  className={
                    item.active && item.children.length > 0
                      ? "subitemactive"
                      : "subitem"
                  }
                >
                  <ul className="menu-list">
                    {item.children &&
                      Array.isArray(item.children) &&
                      item.children.map((child, j) => (
                        <li
                          className="menu-item"
                          key={j} // Usar j como clave en lugar de i
                          onClick={() => handleSelect(i, j)}
                        >
                          <Items
                            active={child.active}
                            classprop={"subactive"}
                            path={child.path}
                            key={`${child.path}-${j}`}
                            text={child.text}
                            index={i}
                            indexChild={j}
                            handleClickContinue={handleSelect}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
