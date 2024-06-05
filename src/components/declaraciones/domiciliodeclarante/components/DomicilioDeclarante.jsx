import { memo, useEffect, useState } from "react";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Text } from "../../../Reusables/input/Input";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { Grid } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { configValidationsDependiente } from "../../../../redux/DependientesEconomicos7/DependientesEconomicos";
export const DomicilioDeclaranteGeneral = memo(({mex,estado}) => {
   const [mexico, setMexico] = useState(mex);
   useEffect(()=>{
      setMexico(mex ? true : false);


   },[mex])
   const handleGetValue = (name, value) => {
      setMexico(value == 1 ? true : false);
      // dispatch(configValidationsDependiente({ tipo: (value = 1 ? "Mexico" : "NoesMexico") }));
   };
   return (
      <Grid container spacing={1}>
         <CustomRadio
            hidden={false}
            col={12}
            name="EsEnMexico"
            title="¿Es de México el dependiente economicó?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]}
            handleGetValue={handleGetValue}
         />
         <Text
            textStyleCase={true}
            col={6}
            name="Calle"
            label="Calle"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
         <Text textStyleCase={true} col={6} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
         <Text textStyleCase={true} col={6} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
         <Text textStyleCase={true} col={6} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} />
         <Ngif condition={mexico}>
            <ComponenteMexico mex={mexico}  estado={estado}/>
         </Ngif>
         <Ngif condition={!mexico}>
            <ComponenteExtranjero />
         </Ngif>
         <Text
            textStyleCase={true}
            col={12}
            name="ColoniaLocalidad"
            label="Colonia / Localidad"
            color={"green"}
            // Otras props opcionales como color, mask, etc., si es necesario
         />
      </Grid>
   );
});
