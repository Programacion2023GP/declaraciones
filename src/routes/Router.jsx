// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import React, { useState } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import { Declaraciones } from "../components/declaraciones/steppers/Declaraciones";
import StepperContextProvider from "../context/StepperContext";
import { DatosGenerales } from "../components/declaraciones/datosgenerales/DatosGenerales";
import MenuContextProvider from "../context/MenuContext";
// import { Declaraciones } from "../Declaraciones/Declaraciones";
// import StepperContextProvider from "../../context/StepperContext"; 
// import StepperContextProvider from "../../context/StepperContext";
export const router = createHashRouter([
  // {path:"/", element:<StepperContextProvider>
  //   <Declaraciones/>
  // </StepperContextProvider>},
  {
    path: "/",
    element:( 
<MenuContextProvider>
  <BaseLayout />
</MenuContextProvider>
   
)
    ,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <h1>Home</h1>,
      },
      {
        path: "declaraciones",
        element: (
          <StepperContextProvider>
            <Declaraciones />
          </StepperContextProvider>
        ),
      },
      {
        path: "declaraciones",
        children:[
            {
                path:"datosgenerales",
                element:<DatosGenerales/>
            }
        ]
      },
    ],
  },
]);

const navigate = [
  {
    path: "/",
    children: [
      { path: "declaraciones"},
    ],
  },
];
