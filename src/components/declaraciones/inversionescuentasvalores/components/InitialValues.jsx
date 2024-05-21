import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { useState } from "react";
import { GetAxios } from "../../../../services/services";
import { useDispatch } from "react-redux";
import { addCopropiedadInversiones, removeCopropiedadInversiones } from "../../../../redux/InversionesCuentasValoresHoja13/InversionesCuentasValores";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useFormikContext } from "formik";

export const InitialValues = ({ titular, tipoinversion, monedas }) => {
   const [name, setName] = useState("");
   const [resetSubtipo,setResetSubTipo]= useState(0);
   const [subTiposInversion, setSubTipoInversion] = useState([]);
   const [loading, setLoading] = useState(false);
   const [tercero, setTercero] = useState(false);
   const dispatch = useDispatch();
   const formik = useFormikContext()
   const nameTipoInversion = async (name, value) => {
      setLoading(true);
      setName(tipoinversion.filter((item) => item.id === value)[0]?.text);
      setResetSubTipo(resetSubtipo+1 )
      formik.values.Id_SubtipoInversion=0
      // formik.values[Id_SubtipoInversion]=0
      setSubTipoInversion(await GetAxios(`subtiposinversion/show/${value}`));
      setLoading(false);
   };
   const copropiedad = (name, value) => {
      setTercero(value == 6 ? true : false);
      dispatch(value == 6 ? addCopropiedadInversiones() : removeCopropiedadInversiones());
   };
   return (
      <Grid spacing={1} container>
         <AutoComplete col={6} name={"Id_TipoInversion"} label={"Tipo de Inversión / Activo"} options={tipoinversion} handleGetValue={nameTipoInversion} />
         <AutoComplete key={'subtipo'+resetSubtipo} col={6} name={"Id_SubtipoInversion"} label={`Selecciona el tipo de ${name}`} options={subTiposInversion} loading={loading} />

         <AutoComplete
            col={12}
            name={"Id_Titular"}
            label={"Titular de la inversion, cuenta bancaria y otro tipo de valores"}
            options={titular}
            handleGetValue={copropiedad}
         />

         <Text col={12} name={"NumeroCuentaContrato"} label={"Número de cuenta, contrato o póliza."} type={"number"} />
         <Ngif condition={tercero}>
            <CustomRadio
               col={12}
               title={"Tercero"}
               name={"T_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona Física" },
                  { value: 2, label: "Persona Moral" }

                  // Agrega más opciones aquí según sea necesario
               ]}
            />
            <Text col={6} name={"T_NombreRazonSocial"} label={"Nombre del tercero o terceros"} />
            <Text col={6} name={"T_Rfc"} label={"RFC"} />
         </Ngif>
         <CustomRadio
            col={12}
            title={"Donde se localiza la inversión, cuenta bancaria y otro tipo de valores/activos?"}
            name={"Id_Pais"}
            options={[
               { value: 153, label: "En México" },
               { value: 0, label: "En el extrangero" }

               // Agrega más opciones aquí según sea necesario
            ]}
         />
         <Text col={4} name={"InstitucionRazonSocial"} label={"Institución o razón social"} />
         <Text col={4} name={"RfcInstitucion"} label={"RFC de la institución"} />
         <Text col={4} name={"SaldoSituacionActual"} label={"Saldo a la fecha (Situacion actual)"} type={"number"} />
         <AutoComplete col={12} name={"Id_SaldoSituacionActual"} label={"Tipo de moneda"} options={monedas} />
         <Text col={12} rows={12} name={"Aclaraciones"} label={"Aclaraciones"} color={"green"} />
      </Grid>
   );
};
