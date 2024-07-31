// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import React, { useState } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
// import BaseLayout from "../layout/BaseLayout";
import StepperContextProvider from "../context/StepperContext";
import MenuContextProvider from "../context/MenuContext";
// import { Steppers } from "../components/declaraciones/steppers/Steppers";
import { lazy, Suspense } from "react";

// import { Login } from "../components/autenticacion/login";
const Loadable = (Component) => (props) => (
   <Suspense
      fallback={
         <Backdrop sx={{ color: "#fff", zIndex: (theme) => 1000000 }} open>
            <Typography variant="h1" sx={{ color: "#fff" }}>
               CARGANDO... <CircularProgress color="inherit" />
            </Typography>
                 
         </Backdrop>
      }
   >
      <Component {...props} />
   </Suspense>
);

const BaseLayout = Loadable(lazy(() => import("../layout/BaseLayout")));

const SteppersLayout = Loadable(lazy(() => import("../components/declaraciones/steppers/Steppers")));

const LoginLayout = Loadable(lazy(() => import("../components/autenticacion/login")));
const ChecadorLayout = Loadable(lazy(() => import("../components/checador/Checador")));
const ComponentCatalogoLayout = Loadable(lazy(() => import("../components/catalogos/componentcatalogo/ComponentCatalogo")));
const MisDeclaracionesLayout = Loadable(lazy(() => import("../components/misdeclaraciones/MisDeclaraciones")));
const ErrorLayout = Loadable(lazy(() => import("../components/error/Error")));
const ComponentDeclaracionesLayout = Loadable(lazy(() => import("../components/declaraciones/ComponentDeclaraciones")));
const DeclaracionInteresLayout = Loadable(lazy(() => import("../components/interes/DeclaracionInteres")));
// import ComponentDeclaraciones from "../components/declaraciones/ComponentDeclaraciones";
import { Provider } from "react-redux";
import store from "../redux/store";
import { element } from "prop-types";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Ngif } from "../components/Reusables/conditionals/Ngif";
// import DeclaracionInteres from "../components/interes/DeclaracionInteres";
// import { MisDeclaraciones } from "../components/misdeclaraciones/MisDeclaraciones";
// import { ComponentCatalogo } from "../components/catalogos/componentcatalogo/ComponentCatalogo";
// import { Error } from "../components/error/Error";
// import { Checador } from "../components/checador/Checador";
const ComponentPermissions = ({ condition, children }) => {
   if (condition) {
      return <>{children}</>; // Usa fragmentos para envolver los `children` sin agregar nodos extra al DOM
   } else {
      throw new Error("Access denied: condition not met");
   }
};
export const router = createHashRouter([
   {
      path: "/dashboard",
      element: (
         <MenuContextProvider>
            <BaseLayout />
         </MenuContextProvider>
      ),
      errorElement: <ErrorLayout />,
      children: [
         {
            path: "declaraciones",
            children: [
               {
                  path: "steppers",
                  element: (
                     <StepperContextProvider>
                        <ComponentPermissions condition={[2, 3].includes(parseInt(localStorage.getItem("Id_Role")))}>
                           <SteppersLayout />
                        </ComponentPermissions>
                     </StepperContextProvider>
                  )
               },
               {
                  path: ":declaracion",
                  element: (
                     <Provider store={store}>
                        <ComponentPermissions condition={[2, 3].includes(parseInt(localStorage.getItem("Id_Role")))}>
                           <ComponentDeclaracionesLayout />
                        </ComponentPermissions>
                     </Provider>
                  ),
                  children: [
                     {
                        path: ":hoja?",
                        element: (
                           <ComponentPermissions condition={[2, 3].includes(parseInt(localStorage.getItem("Id_Role")))}>
                              <ComponentDeclaracionesLayout />
                           </ComponentPermissions>
                        )
                     }
                  ]
               }
            ]
         },
         {
            path: "misdeclaraciones",
            index: true,
            element: (
               <ComponentPermissions condition={[2, 3].includes(parseInt(localStorage.getItem("Id_Role")))}>
                  <MisDeclaracionesLayout />
               </ComponentPermissions>
            )
         },
         {
            path: "checador",
            index: true,
            element: (
               <ComponentPermissions condition={[1, 5].includes(parseInt(localStorage.getItem("Id_Role")))}>
                  <ChecadorLayout />
               </ComponentPermissions>
            )
         },
         {
            path: "usuarios",
            // element:<EstadoCivil/>,
            element: (
               <ComponentPermissions condition={[1,4].includes(parseInt(localStorage.getItem("Id_Role")))}>
                  <ComponentCatalogoLayout pagina={"usuarios"} />
               </ComponentPermissions>
            )
         },
         {
            path: "catalogos",
            // element:<EstadoCivil/>,
            children: [
               {
                  path: ":catalogo",
                  element: (
                     <ComponentPermissions condition={[1].includes(parseInt(localStorage.getItem("Id_Role")))}>
                        <ComponentCatalogoLayout />
                     </ComponentPermissions>
                  )
               }
            ]
         }
      ]
   },
   {
      path: "/",
      element: <LoginLayout />,
      index: true
   }
]);
