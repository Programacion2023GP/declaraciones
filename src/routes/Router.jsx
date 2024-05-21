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
import { Usuarios } from "../components/usuarios/Usuarios";
export const router = createHashRouter([
   {
      path: "/dashboard",
      element: (
         <MenuContextProvider>
            <BaseLayout />
         </MenuContextProvider>
      ),
      errorElement: <p>Error</p>,
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
                  )
               }
            ]
         },
         {
            path: "misdeclaraciones",
            index: true,
            element: <MisDeclaraciones/>
         },{
            path:"usuarios",
            element:<Usuarios/>
         }
      ]
   },
   {
      path: "/",
      element: <Login/>,
      index: true,
      errorElement: <p>Error</p>
   }
]);
