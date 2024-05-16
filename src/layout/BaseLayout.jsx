import { Outlet, useLocation } from "react-router-dom";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Grid } from "@mui/material";
import { MenuContext } from "react-pro-sidebar";
import { useMenuContext } from "../context/MenuContext";
import TemporaryDrawer from "../components/sidebar/Sidebar";
import { Inspector } from "../components/Reusables/Inspector/Inspector";
import { useEffect, useState } from "react";
import { Ngif } from "../components/Reusables/conditionals/Ngif";
import { useDispatch } from "react-redux";
import { locationAuth } from "../user/auth/auth";

const BaseLayout = () => {
   const location = useLocation();
   const [loading,setLoading]=useState(false)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(locationAuth())
      setLoading(true)

      // Coloca aquí el código que deseas ejecutar cuando cambie la ruta
   }, [location.pathname]);
   const { open } = useMenuContext();
   return (
      <Ngif condition={loading}>
         <Grid container style={{ width: "100%", overflow: "exist" }}>
            {" "}
            {/* Establecer el estilo height en 100vh para que ocupe toda la altura de la ventana */}
            {/* Sidebar */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ margin: "0", padding: "0" }}>
               <Header />
            </Grid>
            {/* <Grid item xs={9} sm={4} md={3} lg={3} xl={2} style={{ margin: "0", padding: "0" }}>
               {open ? <TemporaryDrawer /> : <Inspector />}
            </Grid>
            <Grid style={{ marginTop: "2rem" }} item xs={3} sm={8} md={9} lg={9} xl={10}>
               <Outlet />
            </Grid> */}
            {open && (
               <Grid item xs={9} sm={4} md={3} lg={3} xl={2} style={{ margin: "0", padding: "0" }}>
                  <TemporaryDrawer />
               </Grid>
            )}
            <Grid style={{ marginTop: "2rem" }} item xs={open ? 3 : 12} sm={open ? 8 : 12} md={open ? 9 : 12} lg={open ? 9 : 12} xl={open ? 10 : 12}>
               <Outlet />
            </Grid>
         </Grid>
      </Ngif>
   );
};

export default BaseLayout;
