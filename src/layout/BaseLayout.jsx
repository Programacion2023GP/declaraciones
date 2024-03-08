import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Header } from "../components/header/Header";
import { Grid } from "@mui/material";
import { MenuContext } from "react-pro-sidebar";
import { useMenuContext } from "../context/MenuContext";
import TemporaryDrawer from "../components/sidebar/Sidebar";

const BaseLayout = () => {
  const { open } = useMenuContext();
  return (
    <>
      <Grid container style={{ width: "100%", overflow: "hidden" }}>
        {" "}
        {/* Establecer el estilo height en 100vh para que ocupe toda la altura de la ventana */}
        {/* Sidebar */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ margin: "0", padding: "0" }}
        >
          <Header />
        </Grid>
        {open && (
          <Grid
            item
            xs={9}
            sm={4}
            md={3}
            lg={3}
            xl={2}
            style={{ margin: "0", padding: "0" }}
          >
            <TemporaryDrawer />
          </Grid>
        )}
        {/* Header y Outlet */}
        <Grid
          style={{ marginTop: "2rem" }}
          item
          xs={open ? 3 : 12}
          sm={open ? 8 : 12}
          md={open ? 9 : 12}
          lg={open ? 9 : 12}
          xl={open ? 10 : 12}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default BaseLayout;
