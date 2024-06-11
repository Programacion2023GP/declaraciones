// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import React, { useState } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import StepperContextProvider from "../context/StepperContext";
import MenuContextProvider from "../context/MenuContext";
import { Steppers } from "../components/declaraciones/steppers/Steppers";
import { Login } from "../components/autenticacion/login";
import ComponentDeclaraciones from "../components/declaraciones/ComponentDeclaraciones";
import { Provider } from "react-redux";
import store from "../redux/store";
import { element } from "prop-types";
import { MisDeclaraciones } from "../components/misdeclaraciones/MisDeclaraciones";
import { ComponentCatalogo } from "../components/catalogos/componentcatalogo/ComponentCatalogo";
import { Error } from "../components/error/Error";
export const router = createHashRouter([
   {
      path: "/dashboard",
      element: (
         <MenuContextProvider>
            <BaseLayout />
         </MenuContextProvider>
      ),
      errorElement: <Error/>,
      children: [
         {
            path: "declaraciones",
            children: [
               {
                  path: "steppers",
                  element: (
                     <StepperContextProvider>
                        <Steppers />
                     </StepperContextProvider>
                  )
               },
               {
                  path: ":declaracion",
                  element: (
                     <Provider store={store}>
                        <ComponentDeclaraciones />
                     </Provider>
                  ),
                  children: [
                     {
                        path: ":hoja?",
                        element: <ComponentDeclaraciones />
                     }
                  ]
               }
            ]
         },
         {
            path: "misdeclaraciones",
            index: true,
            element: <MisDeclaraciones />
         },
         {
            path: "usuarios",
            // element:<EstadoCivil/>,
            element: <ComponentCatalogo pagina={"usuarios"} />
         },
         {
            path: "catalogos",
            // element:<EstadoCivil/>,
            children: [
               {
                  path: ":catalogo",
                  element: <ComponentCatalogo />
               }
            ]
         }
      ]
   },
   {
      path: "/",
      element: <Login />,
      index: true
   }
]);
