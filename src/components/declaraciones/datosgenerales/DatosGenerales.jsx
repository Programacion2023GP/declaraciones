import { useState } from "react";

import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Number } from "../../Reusables/number/Number";
import { Password } from "../../Reusables/password/Password";
import { TextArea } from "../../Reusables/textaerea/TextAerea";
import { Phone } from "../../Reusables/phone/Phone";
import { Email } from "../../Reusables/email/Email";
// import { Curp } from "../../Reusables/curp/Curp";
import { Rfc } from "../../Reusables/rfc/rfc";
import { useEffect } from "react";
import { Date } from "../../Reusables/date/Date";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
// import { CustomCheckbox } from "../../Reusables/checkbox/Inpcheckbox";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";

//regex min max validaciones
//optional indica que no tiene validaciones
// exist lo desaparece del dom
//validations son las validaciones

export const DatosGenerales = ({ next, previous, title }) => {
   let { declaracion } = useParams();

   declaracion = parseInt(declaracion);
   const [estadocivil, setEstadoCivil] = useState([]);
   const [regimenes, setRegimenes] = useState([]);
   const [paises, setPaises] = useState([]);
   const [nacionalidades, setNacionalidades] = useState([]);
   const [activeRegimen, setActiveRegimen] = useState(true);

   useEffect(() => {
      const init = async () => {
         setEstadoCivil(await GetAxios("/estadoCivil/show"));
         setRegimenes(await GetAxios("/regimenes/show"));
         setPaises(await GetAxios("/paises/show"));
         setNacionalidades(await GetAxios("/paises/showNacionalidad"));
      };
      init();
   }, []);

   const dataForm = {
      Nombre: "",
      PrimerApellido: "",
      SegundoApellido: "",
      CorreoPersonal: "",
      Curp: "",
      Rfc: "",
      Homoclave: "",
      CorreoInstitucional: "",
      TelefonoCasa: "",
      TelefonoCelularPersonal: "",
      Id_EstadoCivil: 0,
      Id_RegimenMatrimonial: 0,
      Id_PaisNacimiento: 0,
      Id_Nacionalidad: 0,
      Aclaraciones: "",
      FueServidorPublicoAnioAnterior: 0
   };

   const validationSchema = Yup.object().shape({
      Nombre: Yup.string().required("El Nombre es obligatorio"),
      PrimerApellido: Yup.string().required("El Primer apellido es obligatorio"),
      // SegundoApellido: Yup.string().required("El Segundo apellido es obligatorio"),
      Curp: Yup.string()
         .required("El CURP es requerido")
         .matches(
            /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
            "El CURP no cumple el formato válido"
         )
         .length(18, "El CURP debe tener exactamente 18 caracteres"),

      Rfc: Yup.string()
         .required("El rfc es requerido")
         .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/, "El rfc no cumple el formato")
         .length(13, "El rfc debe contar con 13 caracteres"),

      Homoclave: Yup.string().required("La Homoclave es requerida").length(3, "La Homoclave debe tener exactamente 3 caracteres"),
      CorreoPersonal: Yup.string().email("El formato de correo es inválido").required("El correo es necesario"),
      // CorreoInstitucional: Yup.string().email("El formato de correo es inválido").required("El correo es necesario"),
      // TelefonoCasa: Yup.string().required("El telefono de casa es obligatorio"),
      // //  .matches(/^\d{12}$/, "El telefono de casa debe contar con 10 caracteres"),
      // TelefonoCelularPersonal: Yup.string().required("El telefono personal es obligatorio"),
      //  .matches(/^\d{12}$/, "El telefono personal debe contar con 10 caracteres"),
      Id_EstadoCivil: Yup.number().required("El estadoCivil es obligatorio").min(1, "El estadoCivil es obligatorio"),
      Id_RegimenMatrimonial: !activeRegimen ? Yup.number().required("El régimen matrimonial es obligatorio").min(1, "El estadoCivil es obligatorio") : Yup.number(),
      Id_PaisNacimiento: Yup.number().required("El Pais de nacimiento es obligatorio").min(1, "El Pais de nacimiento es obligatorio"),
      Id_Nacionalidad: Yup.number().required("La nacionalidad es obligatoria").min(1, "La nacionalidad es obligatoria"),
      FueServidorPublicoAnioAnterior: declaracion == 2 ? Yup.number().required("Selecciona una opcion") : ""
   });
   return (
      <>
         {/* Invoca correctamente la función submit */}
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
            <CardContent>
               <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color
                  <span style={{ color: "green" }}>verde</span>
               </Typography>
               <br />
               <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={2}></Grid>
               </Typography>
               <Formik
                  initialValues={dataForm}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                     console.warn(values);
                     values.Id_User = parseInt(localStorage.getItem("Id_User"));
                     values.Id_Plazo = parseInt(declaracion);
                     try {
                        const response = await PostAxios("/datosgenerales/create", values);
                        localStorage.setItem("id_SituacionPatrimonial", response.data.result);
                        next();
                        Success(response.data.data.message);

                        return response.data;
                     } catch (error) {
                        if (error.response?.data?.data?.message) {
                           Error(error.response.data.data.message);
                        } else {
                           Error("NO EXISTE CONEXION A LA DB");
                        }
                     }

                     setSubmitting(false);
                  }}
               >
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => {
                     {
                        values.Id_EstadoCivil == 2 ? setActiveRegimen(false) : setActiveRegimen(true);
                     }
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <Text
                              col={12}
                              name="Nombre"
                              label="Nombre(s)"
                              placeholder="Sin abreviaturas, sin acentos, ni signos especiales"
                              //   mask={''}
                              // Otras props opcionales como color, mask, etc., si es necesario
                           />
                           <Text col={12} name="PrimerApellido" label="Primer apellido" placeholder={"Sin abreviaturas, sin acentos, ni signos especiales"} />

                           <Text
                              col={12}
                              name="SegundoApellido"
                              label="Segundo apellido"
                              placeholder={`
                    Si se tiene un solo apellido debera colocarse en el espacio de "Primer apellido" y dejar el espacio
                     "Segundo apellido" en blanco. Sin abreviaturas, sin acentos, ni signos especiales

                    `}
                           />

                           <Text col={12} name="Curp" label="Curp" />
                           <Text col={12} name="Rfc" label="Rfc" />
                           <Text col={12} name="Homoclave" label="Homoclave" />
                           <Text
                              col={12}
                              name="CorreoInstitucional"
                              label="Correo electrónico institucional"
                              type={"email"}
                              placeholder={"En caso de no contar con correo institucional ingresar el correo personal."}
                           />
                           <Text
                              col={12}
                              name="CorreoPersonal"
                              label="Correo electrónico Personal"
                              type={"email"}
                              placeholder={"En caso de no contar con correo institucional ingresar el correo personal."}
                           />
                           <Text col={12} name="TelefonoCasa" label="Ingresa el telefono de tu casa" mask="(999) 999-9999" />
                           <Text col={12} name="TelefonoCelularPersonal" label="Ingresa tu numero de telefono" mask="(999) 999-9999" />
                           <AutoComplete col={12} label="Situación personal / Estado civil" name="Id_EstadoCivil" options={estadocivil} />
                           <AutoComplete col={12} label="Regimen matrimonial" name="Id_RegimenMatrimonial" disabled={activeRegimen} options={regimenes} />
                           <AutoComplete
                              col={12}
                              label="Pais de nacimiento"
                              name="Id_PaisNacimiento"
                              options={paises} //
                           />
                           <AutoComplete col={12} label="Nacionalidad" name="Id_Nacionalidad" options={nacionalidades} />
                           <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
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
                           <Button type="submit" variant="contained" color="primary">
                              Registrar y Continuar
                           </Button>
                        </Box>
                     );
                  }}
               </Formik>
               <button variant="contained" color="secondary" onClick={next}>
                  CONTINUAR DESAROLLO DE PAGINA
               </button>
            </CardContent>
         </Card>
      </>
   );
};
