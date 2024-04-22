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
export const router = createHashRouter([

   {
      path: "/",
      element: (
         <MenuContextProvider>
            <BaseLayout />
         </MenuContextProvider>
      ),
      errorElement: <h1>Error</h1>,
      children: [
         {
            element: <h1>Home</h1>
         },

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
         }
      ]
   },
   {
      path: "login",
      element: <Login />
   }
]);

