import { Grid } from "@mui/material";
import React from "react";
import { Ngif } from "../conditionals/Ngif";
import { View } from "@react-pdf/renderer";

const For = ({ array, children, pdf = false }) => {
   return (
      <>
         <Ngif condition={!pdf}>
            <Grid container>
               {array.map((item, index) => (
                  <Grid item xs={12}>
                     <React.Fragment key={index}>{children(item, index)}</React.Fragment>
                  </Grid>
               ))}
            </Grid>
         </Ngif>
         <Ngif condition={pdf}>
            {array.map((item, index) => (
               <View key={index}>
                  <>{children(item, index)}</>
               </View>
            ))}
         </Ngif>
      </>
   );
};

export default For;
