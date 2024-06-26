import { useFormikContext } from "formik";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useDispatch } from "react-redux";
import { validationBienesInmuebles } from "../../../../redux/BienesInmueblesHoja10/BienesInmueblesHoja10";

export const TipoDePersona = ({ adquisicion, pago, monedas, conforme }) => {
   const formik = useFormikContext(); // Obtiene el contexto de Formik
   const [tercero, setTercero] = useState(false);
   const dispatch = useDispatch()
   useEffect(() => {
      setTercero(formik.values["tercero"] == 1 ? true : false);
      dispatch(validationBienesInmuebles({tipo:formik.values["tercero"] == 1 ? "Tercero" : "NoIncluirTercero"}))
   }, [formik.values["tercero"]]);
   return (
      <Grid container spacing={1}>
         <CustomRadio
            col={12}
            title={"¿Cuenta con tercero el bien imueble?"}
            name={"tercero"}
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]}
         />
         <Ngif condition={tercero}>
            <CustomRadio
               col={12}
               title={"Tercero"}
               name={"T_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona Física" },
                  { value: 2, label: "Persona Moral" }
               ]}
            />
            <Text label={"Nombre del tercero o terceros"} name="T_NombreRazonSocial" col={6} />
            <Text label={"Rfc"} name="T_Rfc" col={6} />
         </Ngif>
         <AutoComplete col={6} options={adquisicion} name="Id_FormaAdquisicion" label={"Forma de adquisición"} />
         <AutoComplete col={6} options={pago} name="Id_FormaPago" label={"Forma de pago"} />
         <Text type={"number"} label={"Valor de adquisición"} name="ValorAdquisicion" col={6} />
         <AutoComplete col={6} options={monedas} name="Id_MonedaValorAdquisicion" label={"Tipo de moneda"} />
         <DatePickerComponent
            idName={"FechaAdquisicion"}
            label={"Fecha de adquisición del inmueble"}
            format={"DD/MM/YYYY"}
            setFieldValue={formik.setFieldValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            //   value={values.FechaAdquisicion}
            error={formik.errors.FechaAdquisicion}
            touched={formik.touched.FechaAdquisicion}
            showErrorInput={null}
         />
         <Text label={"Folio real u otro dato que permita su identifiación"} name="DatoIdentificacion" col={6} />
         <AutoComplete col={6} options={conforme} name="Id_ValorConformeA" label={"¿El valor de adquisición de Inmueble es conforme a?"} />
      </Grid>
   );
};
