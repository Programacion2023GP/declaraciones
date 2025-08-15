import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import Gomez from "../../assets/icons/logo-gpd.png";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { Items } from "./items/Items";
import { Ngif } from "../Reusables/conditionals/Ngif";
import { Box } from "@mui/material";

const Sidebar = () => {
   const { theme } = useContext(ThemeContext);
   const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
   const navbarRef = useRef(null);

   const [routes, setRoutes] = useState([
      {
         path: "",
         text: "Declaraciones",
         legend: "selección de apartado de declaración",
         active: false,
         permision: [2, 3, 10, 12],
         children: [
            {
               path: "misdeclaraciones",
               text: "Mis declaraciones",
               legend: "Apartado de mis declaraciones",
               active: false
            },
            {
               path: "notasaclaratorias",
               text: "Notas aclaratorias",
               // legend: "crear nueva declaracion",
               active: false
            },
            {
               path: "declaraciones/steppers",
               text: "Generar declaración",
               legend: "crear nueva declaracion",
               active: false
            },
            {
               path: "declaraciones/2/15",
               text: "Interes",
               legend: "crear nueva declaración de Interes",
               permision: [2, 10],

               active: false
            }
         ]
      },
      {
         path: "",
         text: "Catalogos",
         legend: "catalogos generales",
         active: false,
         permision: [1, 10, 12],

         children: [
            {
               path: "catalogos/estadocivil",
               text: "Estado civil",
               active: false
            },
            {
               path: "catalogos/regimenmatrimonial",
               text: "Regimen Matrimonial",
               active: false
            },
            {
               path: "catalogos/estatus",
               text: "Estatus",
               active: false
            },
            {
               path: "catalogos/nivelestudios",
               text: "Nivel de estudio",
               active: false
            },
            {
               path: "catalogos/documentoobtenido",
               text: "Documento obtenido",
               active: false
            },
            {
               path: "catalogos/nivelordengobierno",
               text: "Nivel de orden de gobierno",
               active: false
            },
            {
               path: "catalogos/ambitopublico",
               text: "Ambito público",
               active: false
            },
            {
               path: "catalogos/aereaadscripcion",
               text: "Aerea de adscripción",
               active: false
            },
            {
               path: "catalogos/empleos",
               text: "Empleos",
               active: false
            },
            {
               path: "catalogos/relaciondeclarante",
               text: "Parentesco/Relación con declarante",
               active: false
            },
            {
               path: "catalogos/monedas",
               text: "Moneda",
               active: false
            },
            {
               path: "catalogos/sectorpertenece",
               text: "Sector que pertenece",
               active: false
            },
            {
               path: "catalogos/tipoinstrumento",
               text: "Tipo de instrumento",
               active: false
            },
            {
               path: "catalogos/tipoenajenado",
               text: "Tipo de bienes enajenado",
               active: false
            },
            {
               path: "catalogos/tipoinmueble",
               text: "Tipo de inmueble",
               active: false
            },
            {
               path: "catalogos/titularbienes",
               text: "Titular de bienes",
               active: false
            },
            {
               path: "catalogos/vehiculo",
               text: "Vehiculo",
               active: false
            },
            {
               path: "catalogos/pago",
               text: "Forma de pago",
               active: false
            },
            {
               path: "catalogos/adquisicion",
               text: "Forma de adquisición",
               active: false
            },
            {
               path: "catalogos/baja",
               text: "Motivo de baja",
               active: false
            },
            {
               path: "catalogos/tipoinversion",
               text: "Tipo de inversión",
               active: false
            },
            {
               path: "catalogos/tiposubinversion",
               text: "Tipo de sub inversión",
               active: false
            },
            {
               path: "catalogos/tipobien",
               text: "Tipo de bien mueble",
               active: false
            },
            {
               path: "catalogos/tipoadeudo",
               text: "Tipo de adeudo",
               active: false
            }
         ]
      },
      {
         path: "usuarios",
         text: "Usuarios",
         legend: "registro de usuarios",

         active: false,
         permision: [1, 4, 10, 11, 12]
      },

      {
         path: "checador",
         text: "Checador",
         legend: "checador",
         active: false,
         permision: [1, 5, 10, 11, 12]
      },
      {
         path: "checadornotasalacaratorias",
         text: "Notas aclaratorias (checador)",
         legend: "Notas aclaratorias (checador)",
         active: false,
         permision: [1, 10, 12]
      },
      {
         path: "",
         text: "Reportes",
         legend: "reportes del sistema",
         active: false,
         permision: [1, 10, 12],
         children: [
            {
               path: "reportes/incumplimientos",
               text: "Incumplimientos",
               legend: "reportes de incumplimientos",
               active: false
            },
            {
               path: "reportes/trasparencia",
               text: "Trasparencia",
               legend: "reportes de trasparencia",
               active: false
            }
         ]
      },
      // {
      //    path: "administrativo",
      //    text: "Edicion de declaraciones",
      //    legend: "Acciones administrativas",
      //    active: false,
      //    permision: [10, 12]
      // }
   ]);
   // closing the navbar when clicked outside the sidebar area
   const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && event.target.className !== "sidebar-oepn-btn") {
         closeSidebar();
      }
   };
   const handleSelect = (index, childIndex) => {
      const updatedRoutes = [...routes];
      if (childIndex !== undefined) {
         routes[index].children.map((children) => {
            children.active = false;
         });

         updatedRoutes[index].children[childIndex].active = true;
      } else {
         routes.map((item) => {
            item.active = false;
            if (item.children) {
               item.children.map((children) => {
                  children.active = false;
               });
            }
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
      <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} style={{ overflowX: "hidden" }} ref={navbarRef}>
         <div className="sidebar-top">
            <div className="sidebar-brand">
               <img src={Gomez} alt="" style={{ height: 100, objectFit: "contain" }} />
            </div>
            {/* <button className="sidebar-close-btn" onClick={closeSidebar}>
               <MdOutlineClose size={24} />
            </button> */}
         </div>
         <div className="sidebar-body">
            <div className="sidebar-menu">
               <ul className="menu-list">
                  {routes.map((item, i) => (
                     <Ngif condition={item.permision.includes(parseInt(localStorage.getItem("Id_Role")))}>
                        <li className="menu-item" key={i}>
                           <Items
                              message={item.legend ? item.legend : item.text.toLowerCase()}
                              active={item.active}
                              classprop={"active"}
                              path={item.path}
                              key={`${item.path}-${i}`}
                              text={item.text}
                              childrens={item.children != undefined ? (item.children.length > 0 ? true : false) : false}
                              index={i}
                              handleClickContinue={handleSelect}
                           ></Items>
                           <div
                              className={item.active && (item.children?.length ?? 0) > 0 ? "subitemactive" : "subitem"}
                              style={
                                 {
                                    // position: "relative",
                                    // // border: "1px solid blue",
                                    // padding: "1rem",
                                    // borderRadius: "5px",
                                    // overflow: "hidden",
                                    // transition: "box-shadow 0.3s"
                                 }
                              }
                           >
                              <ul className="menu-list">
                                 <Ngif condition={item.children && Array.isArray(item.children)}>
                                    <RecursivoMenu array={item.children} i={i} handleSelect={handleSelect} />
                                 </Ngif>
                              </ul>
                           </div>
                        </li>
                     </Ngif>
                  ))}
               </ul>
            </div>
         </div>
      </nav>
   );
};

const RecursivoMenu = ({ array, i, handleSelect }) => {
   const style = {
      // height: "100%",
      // background: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.3) 49%, rgba(71, 91, 232, 0.2) 50%)",
      // backdropFilter: "blur(3px)"
      // padding:".1rem "
   };
   return (
      <>
         {array.map((child, j) => {
            return (
               <>
                  <Ngif condition={child.permision && !child.permision.includes(parseInt(localStorage.getItem("Id_Role")))}>
                     <></>
                  </Ngif>
                  <Ngif condition={!child.permision || child.permision.includes(parseInt(localStorage.getItem("Id_Role")))}>
                     <li
                        style={child.active ? {} : style}
                        className="menu-item"
                        key={`${child.path}-${j}`} // Usa una clave única adecuada
                        onClick={() => handleSelect(i, j)}
                     >
                        <Items
                           message={child.legend ? child.legend : child.text.toLowerCase()}
                           active={child.active}
                           classprop="subactive"
                           path={child.path}
                           key={`${child.path}-${j}`}
                           text={child.text}
                           index={i}
                           childrens={child.children != undefined ? (child.children.length > 0 ? true : false) : false}
                           indexChild={j}
                           handleClickContinue={handleSelect}
                        />
                        <div className={child.active && (child.children?.length ?? 0) > 0 ? "subitemactive" : "subitem"}>
                           <ul className="menu-list">
                              {child.children && Array.isArray(child.children) && <RecursivoMenu array={child.children} i={j} handleSelect={handleSelect} />}
                           </ul>
                        </div>
                     </li>
                  </Ngif>
               </>
            );
         })}
      </>
   );
};

export default Sidebar;
