import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, StepperContext } from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useStepperContext } from "../../../context/StepperContext";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const TipoDeclaracion = () => {
   const { selected, setSelected } = useStepperContext();
   const [role, setRole] = useState(parseInt(localStorage.getItem("Id_Role")));
   const handleChange = (e) => {
      setSelected(e.target.value);
   };

   return (
      <>
         <CssBaseline />
         <Container maxWidth="xl">
            <Card sx={{ maxWidth: "100%", margin: "auto" }}>
               <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                     Documentación sugerida
                     <br />
                     Paso 2 de 4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     <FormControl sx={{ m: 1, minWidth: "100%" }}>
                        <InputLabel htmlFor="grouped-native-select">Elegir tipo de declaración</InputLabel>
                        <Select onChange={handleChange} native value={selected} defaultValue="" id="grouped-native-select" label="Elegir tipo de declaración">
                           <option aria-label="None" value="" />
                           <Ngif condition={role == 2}>
                              <optgroup label="Situación patrimonial">
                                 <option value={1}>Inicial</option>
                                 <option value={2}>Modificación</option>
                                 <option value={3}>Conclusión</option>
                              </optgroup>
                           </Ngif>
                           <Ngif condition={role == 3}>
                              <optgroup label="Simplificada">
                                 <option value={4}>Inicial</option>
                                 <option value={5}>Modificación</option>
                                 <option value={6}>Conclusión</option>
                              </optgroup>
                           </Ngif>
                        </Select>
                     </FormControl>
                  </Typography>
               </CardContent>
            </Card>
         </Container>
      </>
   );
};
