import { useParams } from "react-router-dom";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addValidacioneServidorPublico } from "../../../../redux/DatosGeneralesHoja1/DatosGenerales";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";

export const DatosExtras = ({ estadocivil, regimenes, nacionalidades, paises, validaciones, handleActive, active }) => {
   let { declaracion } = useParams();
   const dispatch = useDispatch();
   declaracion = parseInt(declaracion);
   const formik = useFormikContext();
   const [activeRegimen, setActiveRegimen] = useState(active);
   const handleGetValue = (name, value) => {
      setActiveRegimen(value == 2 ? false : true);
      dispatch(addValidacioneServidorPublico({ validaciones, tipo: value == 2 ? "RegimenMatrimonial" : "QuitarRegimenMatrimonial" }));
      handleActive(value == 2 ? false : true);
   };
   const nacionalidad = (name, value) => {
      formik.values.Id_Nacionalidad = nacionalidades.filter((item) => (item.id = value))[0].id;
      // console.log("aqui", formik.values.Id_Nacionalidad);
   };
   return (
      <Grid container spacing={1}>
         <Text
            textStyleCase={true}
            col={12}
            name="CorreoInstitucional"
            label="Correo electrónico institucional"
            type={"email"}
            placeholder={"En caso de no contar con correo institucional ingresar el correo personal."}
         />
         <Text textStyleCase={true} col={12} name="CorreoPersonal" label="Correo electrónico Personal" type={"email"} placeholder={"Ingresar el correo personal."} />
         <Text textStyleCase={true} col={6} name="TelefonoCasa" label="Ingresa el telefono de tu casa" mask="(999) 999-9999" />
         <Text textStyleCase={true} col={6} name="TelefonoCelularPersonal" label="Ingresa tu numero de telefono" mask="(999) 999-9999" />
         <AutoComplete col={6} label="Situación personal / Estado civil" name="Id_EstadoCivil" handleGetValue={handleGetValue} options={estadocivil} />
         <AutoComplete col={6} label="Regimen matrimonial" name="Id_RegimenMatrimonial" disabled={activeRegimen} options={regimenes} />
         <AutoComplete
            col={12}
            label="Pais de nacimiento"
            name="Id_PaisNacimiento"
            options={paises} //
            handleGetValue={nacionalidad}
         />
         {/* <AutoComplete col={6} label="Nacionalidad" name="Id_Nacionalidad" options={nacionalidades} /> */}
         <Text textStyleCase={true} col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
         <CustomRadio
            hidden={declaracion == 2 ? false : true}
            col={12}
            name="FueServidorPublicoAnioAnterior" // Nombre del campo en el formulario
            title="¿Te desempeñaste como un servidor público el año inmediato anterior?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]} // Opciones para los radio buttons
         />
      </Grid>
   );
};
