import { Outlet, useLocation } from "react-router-dom";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Box, Grid } from "@mui/material";
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
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(locationAuth());
      setLoading(true);

      // Coloca aquí el código que deseas ejecutar cuando cambie la ruta
   }, [location.pathname]);
   const { open } = useMenuContext();
   return (
      <Ngif condition={loading}>
         <Box style={{ minHeight: "100%", position: "relative", margin: 0, padding: 0 }}>
            <Grid container style={{ overflowX: "hidden" }}>
               <Grid
                  sx={{
                     marginTop: { xs: "4rem", sm: "4rem", md: 0, lg: 0, xl: 0 },

                     position: "absolute",
                     zIndex: 1,
                     background: "gray",
                     width: "100vh",
                     height: "100%",
                     opacity: ".9",
                     display: { xs: open ? "block" : "none", sm: open ? "block" : "none", md: "none", lg: "none", xl: "none" }
                  }}
                  xs={12}
                  item
               ></Grid>
               <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{marginBottom:"3rem"}}
               >
                  <Header />
               </Grid>
               {open && (
                  <Grid
                     item
                     xs={12}
                     sm={12}
                     md={4}
                     lg={3}
                     xl={2}
                     sx={{
                        position: { xs: "absolute", sm: "absolute", md: "static", lg: "static", xl: "static" },
                        zIndex: 2, // Asegúrate de que el drawer esté sobre el overlay
                        marginTop: { xs: "4rem", sm: "4rem", md: 0, lg: 0, xl: 0 },
                        left: { xs: 0, sm: 0, md: "auto", lg: "auto", xl: "auto" },
                        width: { xs: "100%", sm: "100%", md: "auto", lg: "auto", xl: "auto" }
                     }}
                  >
                     <TemporaryDrawer />
                  </Grid>
               )}
               <Grid sx={{minHeight:"100vh"}} item xs={12} sm={12} md={open ? 8 : 12} lg={open ? 9 : 12} xl={open ? 10 : 12} >
                  <Outlet />
               </Grid>
            </Grid>
         </Box>
      </Ngif>
   );
};

export default BaseLayout;
