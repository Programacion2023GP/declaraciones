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
const DeclaracionInteresLayout  = Loadable(lazy(() => import("../components/interes/DeclaracionInteres")));
// import ComponentDeclaraciones from "../components/declaraciones/ComponentDeclaraciones";
import { Provider } from "react-redux";
import store from "../redux/store";
import { element } from "prop-types";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
// import DeclaracionInteres from "../components/interes/DeclaracionInteres";
// import { MisDeclaraciones } from "../components/misdeclaraciones/MisDeclaraciones";
// import { ComponentCatalogo } from "../components/catalogos/componentcatalogo/ComponentCatalogo";
// import { Error } from "../components/error/Error";
// import { Checador } from "../components/checador/Checador";
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
                        <SteppersLayout />
                     </StepperContextProvider>
                  )
               },
               {
                  path: ":declaracion",
                  element: (
                     <Provider store={store}>
                        <ComponentDeclaracionesLayout />
                     </Provider>
                  ),
                  children: [
                     {
                        path: ":hoja?",
                        element: <ComponentDeclaracionesLayout />
                     }
                  ]
               },
             
            ]
         },
         {
            path: "misdeclaraciones",
            index: true,
            element: <MisDeclaracionesLayout />
         },
         {
            path: "checador",
            index: true,
            element: <ChecadorLayout />
         },
         {
            path: "usuarios",
            // element:<EstadoCivil/>,
            element: <ComponentCatalogoLayout pagina={"usuarios"} />
         },
         {
            path: "catalogos",
            // element:<EstadoCivil/>,
            children: [
               {
                  path: ":catalogo",
                  element: <ComponentCatalogoLayout />
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
