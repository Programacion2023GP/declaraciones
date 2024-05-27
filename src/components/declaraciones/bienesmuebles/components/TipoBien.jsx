import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useEffect } from "react";
import { addValidacionesBienesMuebles } from "../../../../redux/BienesMueblesHoja12/BienesMuebles";
import { useDispatch } from "react-redux";

export const TipoBien = ({ titular, tiposbienesmuebles, tercero, setTercero, tiposBienes, setTiposBienes }) => {
   const dispatch = useDispatch();
   const handleTercero = (name, value) => {
      setTercero(value == 1 ? true : false);
      dispatch(addValidacionesBienesMuebles({tipo:value == 1 ? "NombreRazon" : "NoNombreRazon"}));
   };
   const handleTitular = (name, value) => {
      setTiposBienes(value == 6 ? true : false);
      dispatch(addValidacionesBienesMuebles({tipo:value == 6 ? "OtroTipo" : "NoOtroTipo"}));
   };
   useEffect(() => {
      dispatch(addValidacionesBienesMuebles({tipo:tiposBienes == 1 ? "OtroTipo" : "NoOtroTipo"}));
      dispatch(addValidacionesBienesMuebles({tipo:tercero == 6 ? "NombreRazon" : "NoNombreRazon"}));


   }, []);
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6} name={"Id_Titular"} label={"Titular del Bien"} options={titular} />
         <AutoComplete col={6} name={"Id_TipoBien"} label={"Tipo de Bien"} options={tiposbienesmuebles} handleGetValue={handleTitular} />
         <Ngif condition={tiposBienes}>
            <Text col={12} name={"EspecifiqueOtroTipo"} label={"Especifique otro tipo de bien"} />
         </Ngif>
         {/* <Text col={12} name={"DescripcionGeneralBien"} label={"Descripción del Bien"} /> */}
         <CustomRadio
            col={12}
            title={"¿Cuenta con copropiedad?"}
            name={"Copropiedad"}
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }

               // Agrega más opciones aquí según sea necesario
            ]}
            handleGetValue={handleTercero}
         />
         <Ngif condition={tercero}>
            <CustomRadio
               col={12}
               title={"Tipo de persona"}
               name={"TR_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona Física" },
                  { value: 2, label: "Persona Moral" }

                  // Agrega más opciones aquí según sea necesario
               ]}
            />
            <Text col={12} name={"TR_NombreRazonSocial"} label={"Nombre del tercero o terceros"} />
            <Text col={12} name={"TR_Rfc"} label={"Rfc"} />
         </Ngif>
      </Grid>
   );
};
