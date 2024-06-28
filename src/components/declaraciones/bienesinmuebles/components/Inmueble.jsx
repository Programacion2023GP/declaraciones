import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { CustomCheckbox } from "../../../Reusables/Checkbox/Inpcheckbox";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validationBienesInmuebles } from "../../../../redux/BienesInmueblesHoja10/BienesInmueblesHoja10";
import { useFormikContext } from "formik";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";

export const Inmuebles = ({ inmuebles, titular, relacion, motivobaja, inmueblesOtro, handleInmueblesOtro, incluirmotivo, motivo }) => {
   const dispatch = useDispatch();
   const formik = useFormikContext();
   const handleGetValue = (name, value) => {
      handleInmueblesOtro(value == 4 ? false : true);
      dispatch(validationBienesInmuebles({ tipo: value == 4 ? "OtroMotivoBaja" : "NoIncluirOtroMotivoBaja" }));
   };
   const motive = (name, value) => {
      incluirmotivo(value == 1 ? false : true);
      dispatch(validationBienesInmuebles({ tipo: value == 1 ? "IncluirMotivo" : "NoIncluirOtroMotivo" }));
   };
   useEffect(() => {}, []);
   return (
      <Grid container spacing={1}>
         <CustomRadio
            col={12}
            title={"Tipo de persona"}
            name={"TR_Id_TipoPersona"}
            options={[
               { value: 1, label: "Persona Física" },
               { value: 2, label: "Persona Moral" }
            ]}
         />
         <Text label={"Nombre del transmisor"} name="TR_NombreRazonSocial" col={6} />
         <Text label={"Rfc"} name="TR_Rfc" col={6} />
         <AutoComplete col={6} options={inmuebles} name="Id_TipoInmueble" label={"Tipo de Inmueble"} />
         <AutoComplete col={6} options={titular} name="Id_Titular" label={"Titular del Inmueble"} />
         <Text type={"number"} label={"Porcentaje de propiedad del declarante conforme a escrituración o contrato"} name="PorcentajePropiedad" col={6} max={100} />
         <Text type={"number"} label={"Superficie del terreno"} name="SuperficieTerreno" col={6} />
         <Text type={"number"} label={"Superficie de construcción (M2)"} name="Superficieconstruncion" col={6} />
         <AutoComplete col={6} options={relacion} name="Id_Relacion" label={"Relación del transmisor de la propiedad con el titular"} />
         <CustomCheckbox checked={!motivo} col={12} label={"Incluir motivo de baja"} value={1} name={"motivobaja"} handleGetvalue={motive} />

         <AutoComplete
            hidden={motivo} //si  existe se activa
            col={12}
            options={motivobaja}
            name="Id_ValorConformeA"
            label={"En caso de baja del inmueble, incluir motivo"}
            handleGetValue={handleGetValue}
         />
         <Text name="OtroMotivoBaja" hidden={inmueblesOtro} col={12} placeholder={"Especifique otro"} label={"Especifique otro"} />
      </Grid>
   );
};
