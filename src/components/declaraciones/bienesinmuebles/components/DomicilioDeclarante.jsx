import { memo, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
export const DomicilioDeclarante = ({openMunicipio,setOpenMunicipio,estado,setEstado}) => {
   const [mexico, setMexico] = useState(true);
   const dispatch = useDispatch();
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
      // dispatch(configValidationsDependiente({ tipo: (value == 1 ? "DomicilioDeclaranteNULL" : "DomicilioDeclarante") }));
   };
   return (
      <Grid container spacing={1}>

         <CustomRadio
            col={12}
            title={"Ubicación del Inmueble"}
            name={"EsEnMexico"}
            options={[
               { value: 1, label: "En México" },
               { value: 0, label: "En el extranjero" }
            ]}
            handleGetValue={handleGetValue}
         />
         <Text
            col={4}
            name="Calle"
            label="Calle"
            color={"green"}
         />
         <Text col={4} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
         <Text col={4} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
         <Text col={4} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} />
         <Ngif condition={mexico}>
            <ComponenteMexico setEstado={setEstado} estado={estado}  openMunicipio={openMunicipio} setOpenMunicipio={setOpenMunicipio}/>
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         <Text
            col={12}
            name="ColoniaLocalidad"
            label="Colonia / Localidad"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
      </Grid>
   );
};

