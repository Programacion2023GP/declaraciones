// components/sidebar/Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import { MdOutlineArrowDropDown, MdOutlineGridView, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import { Ngif } from "../Reusables/conditionals/Ngif";
import Gomez from "../../assets/icons/logo-gpd.png";

const Items = ({ text, path = "#", childrens = false, active = false, classprop = "", index = null, indexChild = undefined, handleClickContinue, message = "", id = null }) => {
   const onHandleClick = () => handleClickContinue(index, indexChild);
   return (
      <Tooltip title={message} placement="right" arrow>
         <Link
            to={path}
            onClick={onHandleClick}
            id={id || path}
            className={`
          !flex !items-center !justify-between !px-4 !py-2 !rounded-md
          !transition-colors !duration-200
          ${active && classprop === "active"
                  ? "!bg-rose-50 !text-rose-700 !font-medium !border-l-4 !border-rose-700"
                  : "!text-gray-700 hover:!bg-gray-100"}
          ${active && classprop === "subactive" ? "!text-rose-600 !bg-rose-50/50 !font-medium" : ""}
        `}
         >
            <div className="!flex !items-center !gap-3">
               <MdOutlineGridView className="!text-lg" />
               <span className="!text-sm">{text}</span>
            </div>
            {childrens && <MdOutlineArrowDropDown className="!text-xl" />}
         </Link>
      </Tooltip>
   );
};

const RecursivoMenu = ({ array, parentIndex, handleSelect }) => {
   return (
      <>
         {array.map((child, j) => (
            <Ngif key={child.path} condition={!child.permision || child.permision.includes(parseInt(localStorage.getItem("Id_Role")))}>
               <li>
                  <Items
                     id={child.id}
                     message={child.legend || child.text.toLowerCase()}
                     active={child.active}
                     classprop="subactive"
                     path={child.path}
                     text={child.text}
                     childrens={child.children?.length > 0}
                     index={parentIndex}
                     indexChild={j}
                     handleClickContinue={handleSelect}
                  />
                  <div className={`${child.active && child.children?.length > 0 ? "!block" : "!hidden"} !ml-6 !mt-1 !border-l !border-gray-200 !pl-3`}>
                     {child.children && Array.isArray(child.children) && <RecursivoMenu array={child.children} parentIndex={j} handleSelect={handleSelect} />}
                  </div>
               </li>
            </Ngif>
         ))}
      </>
   );
};

const Sidebar = () => {
   const { isSidebarOpen, closeSidebar } = useSidebarContext();
   const navbarRef = useRef(null);
   const [routes, setRoutes] = useState([
      // ... tus rutas (no cambio nada aquí por brevedad, mantenlas igual)
      { path: "", text: "Declaraciones", legend: "selección de apartado de declaración", active: false, id: "sidebar-declaraciones", permision: [2, 3, 10, 12], children: [{ id: "sidebar-declaraciones-misdeclaraciones", path: "misdeclaraciones", text: "Mis declaraciones", legend: "Apartado de mis declaraciones", active: false }, { path: "notasaclaratorias", text: "Notas aclaratorias", active: false }, { id: "sidebar-declaraciones-declaraciones", path: "declaraciones/steppers", text: "Generar declaración", legend: "crear nueva declaracion", active: false }] },
      { path: "", text: "Catalogos", legend: "catalogos generales", active: false, permision: [1, 10, 12], children: [{ path: "catalogos/estadocivil", text: "Estado civil", active: false }, { path: "catalogos/regimenmatrimonial", text: "Regimen Matrimonial", active: false }, { path: "catalogos/estatus", text: "Estatus", active: false }, { path: "catalogos/nivelestudios", text: "Nivel de estudio", active: false }, { path: "catalogos/documentoobtenido", text: "Documento obtenido", active: false }, { path: "catalogos/nivelordengobierno", text: "Nivel de orden de gobierno", active: false }, { path: "catalogos/ambitopublico", text: "Ambito público", active: false }, { path: "catalogos/aereaadscripcion", text: "Aerea de adscripción", active: false }, { path: "catalogos/empleos", text: "Empleos", active: false }, { path: "catalogos/relaciondeclarante", text: "Parentesco/Relación con declarante", active: false }, { path: "catalogos/monedas", text: "Moneda", active: false }, { path: "catalogos/sectorpertenece", text: "Sector que pertenece", active: false }, { path: "catalogos/tipoinstrumento", text: "Tipo de instrumento", active: false }, { path: "catalogos/tipoenajenado", text: "Tipo de bienes enajenado", active: false }, { path: "catalogos/tipoinmueble", text: "Tipo de inmueble", active: false }, { path: "catalogos/titularbienes", text: "Titular de bienes", active: false }, { path: "catalogos/vehiculo", text: "Vehiculo", active: false }, { path: "catalogos/pago", text: "Forma de pago", active: false }, { path: "catalogos/adquisicion", text: "Forma de adquisición", active: false }, { path: "catalogos/baja", text: "Motivo de baja", active: false }, { path: "catalogos/tipoinversion", text: "Tipo de inversión", active: false }, { path: "catalogos/tiposubinversion", text: "Tipo de sub inversión", active: false }, { path: "catalogos/tipobien", text: "Tipo de bien mueble", active: false }, { path: "catalogos/tipoadeudo", text: "Tipo de adeudo", active: false }] },
      { path: "usuarios", text: "Usuarios", legend: "registro de usuarios", active: false, permision: [1, 4, 10, 11, 12] },
      { path: "checador", text: "Checador", legend: "checador", active: false, permision: [1, 5, 10, 11, 12] },
      { path: "checadornotasalacaratorias", text: "Notas aclaratorias (checador)", legend: "Notas aclaratorias (checador)", active: false, permision: [1, 10, 12] },
      { path: "", text: "Reportes", legend: "reportes del sistema", active: false, permision: [1, 10, 12], children: [{ path: "reportes/incumplimientos", text: "Incumplimientos", legend: "reportes de incumplimientos", active: false }, { path: "reportes/trasparencia", text: "Trasparencia", legend: "reportes de trasparencia", active: false }, { path: "reportes/nopresento", text: "Servidores públicos pendientes de declaración", legend: "Servidores públicos pendientes de declaración", active: false }] },
      { path: "administrativo", text: "Edicion de declaraciones", legend: "Acciones administrativas", active: false, permision: [1, 10, 12] }
   ]);

   // Cerrar al hacer clic fuera (solo en móvil y si el overlay no está presente)
   const handleClickOutside = (event) => {
      if (window.innerWidth < 900 && navbarRef.current && !navbarRef.current.contains(event.target) && event.target.className !== "sidebar-open-btn") {
         closeSidebar();
      }
   };

   const handleSelect = (index, childIndex) => {
      const updatedRoutes = [...routes];
      if (childIndex !== undefined) {
         routes[index].children.forEach((child) => (child.active = false));
         updatedRoutes[index].children[childIndex].active = true;
      } else {
         routes.forEach((item) => {
            item.active = false;
            if (item.children) item.children.forEach((child) => (child.active = false));
         });
         updatedRoutes[index].active = true;
      }
      setRoutes(updatedRoutes);
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const sidebarClasses = `
    !fixed !top-0 !left-0 !h-full !w-64 !bg-white !shadow-xl !z-50 
    !transition-transform !duration-300 !ease-in-out
    !flex !flex-col !border-r !border-gray-200
    ${isSidebarOpen ? "!translate-x-0" : "!-translate-x-full"}
    md:!relative md:!translate-x-0 md:!z-auto md:!shadow-none
  `;

   return (
      <nav ref={navbarRef} className={sidebarClasses}>
         <div className="!flex !items-center !justify-between !p-4 !border-b !border-gray-200">
            <img src={Gomez} alt="Logo" className="!h-12 !object-contain" />
            <button onClick={closeSidebar} className="md:!hidden !p-1 !rounded-full hover:!bg-gray-100">
               <MdClose size={24} />
            </button>
         </div>
         <div className="!flex-1 !overflow-y-auto !py-4">
            <ul className="!space-y-1">
               {routes.map((item, i) => (
                  <Ngif key={i} condition={item.permision.includes(parseInt(localStorage.getItem("Id_Role")))}>
                     <li>
                        <Items id={item.id} message={item.legend || item.text.toLowerCase()} active={item.active} classprop="active" path={item.path} text={item.text} childrens={item.children?.length > 0} index={i} handleClickContinue={handleSelect} />
                        <div className={`${item.active && item.children?.length > 0 ? "!block" : "!hidden"} !ml-6 !mt-1 !space-y-1 !border-l !border-gray-200 !pl-3`}>
                           <Ngif condition={item.children && Array.isArray(item.children)}>
                              <RecursivoMenu array={item.children} parentIndex={i} handleSelect={handleSelect} />
                           </Ngif>
                        </div>
                     </li>
                  </Ngif>
               ))}
            </ul>
         </div>
      </nav>
   );
};

export default Sidebar;