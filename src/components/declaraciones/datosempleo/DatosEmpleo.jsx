import { useEffect, useState } from "react";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import DatePickerComponent from "../../Reusables/datepicker/DatePickerComponent";

export const DatosEmpleo = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const [nivelOrdenGobierno, setNivelOrdenGobierno] = useState([]);
   const [ambitoPublico, setAmbitoPublico] = useState([]);
   const [activeEspecificarEmpleo, setActiveEspecificarEmpleo] = useState(true);
   const [mexico, setMexico] = useState(false);
   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(true);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const [paises, setPaises] = useState([]);
   useEffect(() => {
      const init = async () => {
         setNivelOrdenGobierno(await GetAxios("/nivelordengobierno/show"));
         setAmbitoPublico(await GetAxios("/ambitospublicos/show"));
         setEntidades(await GetAxios("/entidades/show"));
         setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, []);

   const dataForm = {
      Id_NivelOrdenGobierno: 0,
      Id_AmbitoPublico: 0,
      NombreEntePublico: "",
      EsEnMexico: 1,
      AreaAdscripcion: "",
      EmpleoCargoComision: "",
      NivelEmpleoCargoComision: "",
      NivelEmpleoCargoComisionText: "",
      ContratadoPorHonorarios: 0,
      FuncionPrincipal: "",
      FechaTomaConclusionPosesion: "",
      ExtensionTelefonoOficina: "",
      TelefonoOficina: "",
      Calle: "",
      CodigoPostal: "",
      NumeroExterior: "",
      NumeroInterior: "",
      ColoniaLocalidad: "",
      Id_MunicipioAlcaldia: 0,
      Id_EntidadFederativa: 0,
      Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
      Aclaraciones: ""
   };
   if (mexico) {
      dataForm.EstadoProvincia = "";
   } else {
      delete dataForm.EstadoProvincia;
   }

   const validationSchema = Yup.object().shape({
      Id_NivelOrdenGobierno: Yup.number().min(1, "El nivel de orden y de gobierno es requerido").required("El nivel de orden y de gobierno es requerido"),
      Id_AmbitoPublico: Yup.number().min(1, "El ambito público es requerido").required("El ambito público es requerido"),
      NombreEntePublico: Yup.string().required("El Nombre del ente público es requerido"),
      AreaAdscripcion: Yup.string().required("El Áerea de adscripción del ente público es requerido"),
      EmpleoCargoComision: Yup.string().required("El Empleo cargo comisión es requerido"),
      NivelEmpleoCargoComision: Yup.number().min(1, "El nivel empleo cargo comisión es requerido").required("El nivel empleo cargo comisión es requerido"),
      NivelEmpleoCargoComisionText: !activeEspecificarEmpleo ? Yup.string().required("El nivel empleo cargo comisión es requerido ") : "",
      FuncionPrincipal: Yup.string().required("La función principal es requerida"),
      FechaTomaConclusionPosesion: Yup.date("No cumple el formato valido de fecha").required("La fecha es requerida"),
      TelefonoOficina: Yup.number("Tienen que ser numeros").required("El telefono de oficina es requerido"),
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
      if (name == "NivelEmpleoCargoComision" && value == 4) {
         setActiveEspecificarEmpleo(false);
      } else {
         setActiveEspecificarEmpleo(true);
      }
      if (name == "Id_EntidadFederativa") {
         setActiveMunicipios(false);
         setLoadingMunicipios(true);
         setMunicipios(await GetAxios(`municipios/show/${value}`));
         setLoadingMunicipios(false);
      }
      if (name == "EsEnMexico") {
         value == 1 ? setMexico(true) : setMexico(false);
      }
   };
   return (
      <>
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
            <CardContent>
               <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color
                  <span style={{ color: "green" }}> verde</span>
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
                     if (values.NivelEmpleoCargoComision == 4) {
                        values.NivelEmpleoCargoComision = values.NivelEmpleoCargoComisionText;
                        delete values.NivelEmpleoCargoComision;
                     } else {
                        delete values.NivelEmpleoCargoComisionText;
                     }
                     try {
                        const response = await PostAxios("/datoscargoscomision/create", values);
                        next();

                        Success(response.data.data.message);

                        return response.data;
                     } catch (error) {
                        console.error("here", error);
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
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <AutoComplete col={12} label="Nivel / orden de gobierno" name="Id_NivelOrdenGobierno" options={nivelOrdenGobierno} />
                           <AutoComplete col={12} label="Ámbito público" name="Id_AmbitoPublico" options={ambitoPublico} />
                           <Text col={12} name="NombreEntePublico" label="Nombre del ente público" />
                           <Text
                              col={12}
                              name="AreaAdscripcion"
                              label="Área de adscripción"
                              placeholder={"Especificar el nombre de la Unidad Administrativa u homóloga superior inmediata de su adscripción. (Superior jerárquico)"}
                           />
                           <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" />
                           <CustomRadio
                              col={12}
                              name="ContratadoPorHonorarios"
                              title="¿Está contratado por honorarios?"
                              options={[
                                 { value: 1, label: "Si" },
                                 { value: 0, label: "No" }
                              ]} // Opciones para los radio buttons
                           />
                           <AutoComplete
                              col={12}
                              label="Nivel del empleo, cargo o comisión"
                              name="NivelEmpleoCargoComision"
                              options={[
                                 { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
                                 { id: 2, text: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
                                 { id: 3, text: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." },
                                 { id: 4, text: "Otro especifique..." }
                              ]}
                              handleGetValue={handleGetValue}
                           />
                           <Text
                              hidden={activeEspecificarEmpleo}
                              col={12}
                              name="NivelEmpleoCargoComisionText"
                              label="Nivel del empleo, cargo o comisión"
                              placeholder={"Ingrese Nivel del empleo, cargo o comisión"}
                           />
                          <Text
                              col={12}
                              name="FuncionPrincipal"
                              label="Especifique función principal"
                              placeholder={"Señalar cuál es la función o actividad principal que desempeña en su empleo, cargo o comisión"}
                           /> 
                           <DatePickerComponent
                              idName={"FechaTomaConclusionPosesion"}
                              label={"Fecha de toma posesión del empleo, cargo o comisión."}
                              format={"DD/MM/YYYY"}
                              value={values.FechaTomaConclusionPosesion}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.FechaTomaConclusionPosesion}
                              touched={touched.FechaTomaConclusionPosesion}
                              showErrorInput={null}
                           />
                           <Text
                              col={12}
                              type="phone"
                              name="TelefonoOficina"
                              label="Teléfono de oficina"
                              placeholder={"Proporcionar el teléfono laboral según corresponda (Si aplica)"}
                           />
                           <Text
                              col={12}
                              type="number"
                              name="ExtensionTelefonoOficina"
                              label="Extensión del teléfono de oficina"
                              placeholder={`Proporcionar la extensión del teléfono laboral según corresponda (Si aplica)`}
                           />
                           <CustomRadio
                              handleGetValue={handleGetValue}
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

                              // Otras props opcionales como color, mask, etc., si es necesario
                           />
                           <Text col={12} name="NumeroExterior" label="Número Exterior" type={"number"} />
                           <Text col={12} name="NumeroInterior" label="Número Interior" type={"number"} />
                           <Text col={12} name="CodigoPostal" label="Código Postal" type={"number"} />
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
                           <Text hidden={!mexico} col={12} name="EstadoProvincia" label="Estado / Provincia" type={"number"} />

                           <Text
                              col={12}
                              name="ColoniaLocalidad"
                              label="Colonia / Localidad"

                              // Otras props opcionales como color, mask, etc., si es necesario
                           />
                           <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

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
