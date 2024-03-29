// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import React, { useState } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import { Declaraciones } from "../components/declaraciones/declaraciones";
import StepperContextProvider from "../context/StepperContext";
import { DatosGenerales } from "../components/declaraciones/datosgenerales/DatosGenerales";
import MenuContextProvider from "../context/MenuContext";
import { Steppers } from "../components/declaraciones/steppers/Steppers";
import { Login } from "../components/autenticacion/login";
// import { Declaraciones } from "../Declaraciones/Declaraciones";
// import StepperContextProvider from "../../context/StepperContext";
// import StepperContextProvider from "../../context/StepperContext";
export const router = createHashRouter([
  // {path:"/", element:<StepperContextProvider>
  //   <Declaraciones/>
  // </StepperContextProvider>},
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
        element: <h1>Home</h1>,
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
            ),
          },
          {
            path: ":declaracion",
            element: <Declaraciones />,
          },
        ],
      },
    ],
  },
  {
    
        path: "login",
        element: <Login />,
      
  },
]);
