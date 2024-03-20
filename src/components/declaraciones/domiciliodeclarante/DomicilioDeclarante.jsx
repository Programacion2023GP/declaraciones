import { useEffect, useState } from "react";

import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";

// import { Curp } from "../../Reusables/curp/Curp";

import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
export const DomicilioDeclarante = ({ next, previous,title }) => {
   let { declaracion } = useParams();
   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [paises, setPaises] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(true);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const [mexico, setMexico] = useState(false);
   const dataForm = {
      EsEnMexico: 1,
      Calle: "",
      NumeroExterior: 0,
      NumeroInterior: "",
      CodigoPostal: "",
      ColoniaLocalidad: "",
      Id_Pais: 0,
      Id_EntidadFederativa: 0,
      Id_MunicipioAlcaldia: 0,

      Aclaraciones: "",
      Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial"))
   };
   if (mexico) {
      dataForm.EstadoProvincia = "";
  } else {
      delete dataForm.EstadoProvincia;
  }
  

   const validationSchema = Yup.object().shape({
      EsEnMexico: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
      NumeroExterior: Yup.number("Debe ser numerico").required("El numero exterior es requerido").min(1, "El numero exterior debe ser mayor a 0"),
      Calle: Yup.string().required("La calle es requerida"),
      // NumeroInterior: Yup.number().required("El numero interior es requerido"),
      CodigoPostal: Yup.string()
         .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
         .required("El código postal es requerido"),
      ColoniaLocalidad: Yup.string().required("La colonia localidad es requerida"),
      Id_EntidadFederativa: !mexico
         ? Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria")
         : "",
      Id_MunicipioAlcaldia: !mexico
         ? Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
         : "",
      Id_Pais: mexico ? Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio") : "",
      EstadoProvincia: mexico ? Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres") : ""
   });

   const handleGetValue = async (name, value) => {
      console.warn(name, value);
      if (name == "Id_EntidadFederativa") {
         setActiveMunicipios(false);
         setLoadingMunicipios(true);
         setMunicipios(await GetAxios(`municipios/show/${value}`));
         setLoadingMunicipios(false);
      }
   };
   useEffect(() => {
      const init = async () => {
         setEntidades(await GetAxios("/entidades/show"));
         setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, []);

   return (
      <>
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
                     values.EsEnMexico = parseInt(values.EsEnMexico);
                     console.log("valores", values);
                     try {
                        const response = await PostAxios("/domiciliodeclarante/create", values);

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
                        setMexico(values.EsEnMexico == 0 ? true : false);
                        // console.log(values.Id_EntidadFederativa);

                        // Utiliza la variable hasHandleChangeIdEntidadFederativa según tu necesidad
                        console.log(setFieldValue);
                        // if (values.Id_EntidadFederativa != dataForm.Id_EntidadFederativa) {
                        //    dataForm.Id_EntidadFederativa = values.Id_EntidadFederativa;
                        //    setActiveMunicipios(false);
                        //    setLoadingMunicipios(true);
                        //      Axios.get(`municipios/show/${values.Id_EntidadFederativa}`).then(response=>{
                        //       setmunicipios(response.data.data.result);

                        //       // response.data.data.result
                        //    });
                        //    console.warn("cambio");
                        //    // setLoadingMunicipios(false);
                        // }
                        // if (touched.Id_EntidadFederativa && handleBlur) { // Verifica si se ha hecho "blur" en Id_EntidadFederativa
                        //    if (values.Id_EntidadFederativa !== 0 && handleChange) {

                        //    }
                        //  }
                        // setmunicipios(await GetAxios("municipios/show/values."));
                     }
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <CustomRadio
                              hidden={false}
                              col={12}
                              name="EsEnMexico" // Nombre del campo en el formulario
                              title="¿Es de México?"
                              options={[
                                 { value: 1, label: "Si" },
                                 { value: 0, label: "No" }
                              ]} // Opciones para los radio buttons
                           />
                           <Text
                              col={12}
                              name="Calle"
                              label="Calle"
                              color={"green"}
                              // Otras props opcionales como color, mask, etc., si es necesario
                           />
                           <Text col={12} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
                           <Text col={12} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
                           <Text col={12} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} />
                           <AutoComplete
                              hidden={mexico}
                              col={12}
                              label="Entidad Federativa"
                              name="Id_EntidadFederativa"
                              options={entidades}
                              color="green"
                              handleGetValue={handleGetValue}
                           />
                           <AutoComplete
                              hidden={mexico}
                              disabled={activeMunicipios}
                              loading={loadingMuncipios}
                              col={12}
                              otro={23}
                              label="Municipio / Alcaldía"
                              name="Id_MunicipioAlcaldia"
                              options={municipios}
                              color="green"
                              // getValue={getValue}
                           />
                           <AutoComplete hidden={!mexico} col={12} label="Pais de nacimiento" name="Id_Pais" options={paises} color="green" />
                           <Text hidden={!mexico} col={12} name="EstadoProvincia" label="Estado / Provincia" type={"number"} color={"green"} />

                           <Text
                              col={12}
                              name="ColoniaLocalidad"
                              label="Colonia / Localidad"
                              color={"green"}
                              // Otras props opcionales como color, mask, etc., si es necesario
                           />
                           <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

                           {/* <AutoComplete col={12} label="Situación personal / Estado civil" name="Id_EstadoCivil" options={estadocivil} />
                           <AutoComplete col={12} label="Regimen matrimonial" name="Id_RegimenMatrimonial" disabled={activeRegimen} options={regimenes} />
                           <AutoComplete
                              col={12}
                              label="Pais de nacimiento"
                              name="Id_PaisNacimiento"
                              options={paises} //
                           />
                           <AutoComplete col={12} label="Nacionalidad" name="Id_Nacionalidad" options={nacionalidades} /> */}

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
