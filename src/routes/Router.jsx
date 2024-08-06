// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import React, { useState } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
// import BaseLayout from "../layout/BaseLayout";
import StepperContextProvider from "../context/StepperContext";
import MenuContextProvider from "../context/MenuContext";
// import { Steppers } from "../components/declaraciones/steppers/Steppers";
import { lazy, Suspense, useEffect, useState } from "react";

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
const ComponentIncumplimientosLayout = Loadable(lazy(() => import("../components/reportes/incumplimientos/Incumplimientos")));
const ComponentTrasparenciaLayout = Loadable(lazy(() => import("../components/reportes/trasparencia/Trasparencia")));

const DeclaracionInteresLayout = Loadable(lazy(() => import("../components/interes/DeclaracionInteres")));
// import ComponentDeclaraciones from "../components/declaraciones/ComponentDeclaraciones";
import { Provider } from "react-redux";
import store from "../redux/store";
import { element } from "prop-types";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Ngif } from "../components/Reusables/conditionals/Ngif";
import { NotasAclaratorias } from "../components/notasaclaratorias/NotasAclaratorias";
import Loading from "../components/Reusables/loading/Loading";
// import DeclaracionInteres from "../components/interes/DeclaracionInteres";
// import { MisDeclaraciones } from "../components/misdeclaraciones/MisDeclaraciones";
// import { ComponentCatalogo } from "../components/catalogos/componentcatalogo/ComponentCatalogo";
// import { Error } from "../components/error/Error";
// import { Checador } from "../components/checador/Checador";
const ComponentPermissions = ({ condition, children }) => {
   const [role, setRole] = useState(null);

   useEffect(() => {
      const storedRole = localStorage.getItem("Id_Role");
      if (storedRole) {
         setRole(parseInt(storedRole, 10));
      }
   }, []);

   if (role === null) {
      // Podrías mostrar un spinner o alguna indicación de carga aquí si lo deseas
      return <Loading />;
   }

   if (condition(role)) {
      return <>{children}</>;
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
                        <ComponentPermissions condition={(role) => [2, 3].includes(role)}>
                           <SteppersLayout />
                        </ComponentPermissions>
                     </StepperContextProvider>
                  )
               },
               {
                  path: ":declaracion",
                  element: (
                     <Provider store={store}>
                        <ComponentPermissions condition={(role) => [2, 3].includes(role)}>
                           <ComponentDeclaracionesLayout />
                        </ComponentPermissions>
                     </Provider>
                  ),
                  children: [
                     {
                        path: ":hoja?",
                        element: (
                           <ComponentPermissions condition={(role) => [2, 3].includes(role)}>
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
               <ComponentPermissions condition={(role) => [2, 3].includes(role)}>
                  <MisDeclaracionesLayout />
               </ComponentPermissions>
            )
         },
         {
            path: "notasaclaratorias",
            index: true,
            element: (
               <ComponentPermissions condition={(role) => [2, 3].includes(role)}>
                  <NotasAclaratorias />
               </ComponentPermissions>
            )
         },
         {
            path: "checadornotasalacaratorias",
            index: true,
            element: (
               <ComponentPermissions condition={(role) => [1].includes(role)}>
                  <NotasAclaratorias />
               </ComponentPermissions>
            )
         },
         {
            path: "checador",
            index: true,
            element: (
               <ComponentPermissions condition={(role) => [1, 5].includes(role)}>
                  <ChecadorLayout />
               </ComponentPermissions>
            )
         },
         {
            path: "usuarios",
            // element:<EstadoCivil/>,
            element: (
               <ComponentPermissions condition={(role) => [1, 4].includes(role)}>
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
                     <ComponentPermissions condition={(role) => [1].includes(role)}>
                        <ComponentCatalogoLayout />
                     </ComponentPermissions>
                  )
               }
            ]
         },
         {
            path: "reportes",
            children: [
               {
                  path: "incumplimientos",
                  element: (
                     <ComponentPermissions condition={(role) => [1].includes(role)}>
                        <ComponentIncumplimientosLayout />
                     </ComponentPermissions>
                  )
               },
               {
                  path: "trasparencia",
                  element: (
                     <ComponentPermissions condition={(role) => [1].includes(role)}>
                        <ComponentTrasparenciaLayout />
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
