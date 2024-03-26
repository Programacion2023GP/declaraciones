import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DebugerContext } from "../../../context/DebuggerContext";

export const Inspector = () => {
   const { variables, eventos } = useContext(DebugerContext);
   const [valores, setValores] = useState([{ key: "f", value: "dd" }]);
   const [functions, setFunctions] = useState([]);

   useEffect(() => {
      console.log("holas");
      setValores(variables);
      setFunctions(eventos);

      // Este efecto se ejecutará cada vez que cambie `variables` o `eventos` en el contexto
      console.log("variables actualizadas:", variables, valores);
      console.log("Eventos actualizados:", eventos);
   }, [variables, eventos, valores, eventos]);
   return (
      <>
         <Grid
            key={valores.length}
            sx={{
               background: "black",
               width: "100%",
               height: "55%",
               margin: "2rem .2rem",
               color: "yellow",
               fontWeight: "900",
               overflow: "auto",
               textAlign: "center",
               wordWrap: "break-word",
               padding: ".5rem .2rem"
            }}
         >
            <Grid sx={{ height: "50%", border: "2px solid blue", overflow: "auto" }}>
               <Grid container spacing={0}>
                  <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                     <Typography variant="subtitle1" sx={{ marginTop: ".5rem", borderBottom: "1px solid blue", fontWeight: "600" }}>
                        Variables
                     </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                     <Typography variant="subtitle1" sx={{ marginTop: ".5rem", borderBottom: "1px solid blue", fontWeight: "600" }}>
                        Valores
                     </Typography>
                  </Grid>
               </Grid>

               {valores.map((item, index) => (
                  <Grid container spacing={0} key={index} sx={{ borderBottom: "1px solid green" }}>
                     <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                        <Typography variant="subtitle1" sx={{ color: "red", fontWeight: "700" }}>
                           {item.key ? item.key : ""}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                        <Typography variant="subtitle1" sx={{ color: "white" }}>
                           {item.value ? item.value : ""}
                        </Typography>
                     </Grid>
                  </Grid>
               ))}
            </Grid>

            <Grid sx={{ height: "50%", border: "2px solid blue", overflow: "auto" }}>
               <Grid container spacing={0}>
                  <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                     <Typography variant="subtitle1" sx={{ marginTop: ".2rem", borderBottom: "1px solid blue", fontWeight: "700" }}>
                        Eventos
                     </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                     <Typography variant="subtitle1" sx={{ marginTop: ".2rem", borderBottom: "1px solid blue", fontWeight: "600" }}>
                        Acciones
                     </Typography>
                  </Grid>
               </Grid>
               <Grid item xs={12} sx={{ marginTop: "1.2rem" }}></Grid>
               {/* {functions.map((item, index) => (
                  <Grid container spacing={2} key={index}>
                     <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                        <Typography variant="subtitle1" sx={{ color: "red" }}>
                           {item.key ? item.key : ""}
                        </Typography>
                     </Grid>

                     <Grid item xs={6} style={{ margin: "0", padding: "0" }}>
                        <Typography variant="subtitle1" sx={{ color: "white" }}>
                           {item.action ? item.action : ""}
                        </Typography>
                     </Grid>
                  </Grid>
               ))} */}
            </Grid>
         </Grid>
      </>
   );
};
