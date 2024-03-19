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
export const DatosCurriculares = ({ next, previous }) => {
   let { declaracion } = useParams();
   const [nivelEstudios, setNivelEstudios] = useState([]);
   const [estatus, setEstatus] = useState([]);
   const [documentosObtenidos, setDocumentosObtenidos] = useState([]);
   useEffect(() => {
      const init = async () => {
         setNivelEstudios(await GetAxios("/nivelestudios/show"));
         setEstatus(await GetAxios("/estatus/show"));
         setDocumentosObtenidos(await GetAxios("/documentosbtenidos/show"));
      };
      init();
   }, []);
   const dataForm = {
      Id_Nivel: 0,
      NombreInstitucionEducativa: "",
      CarreraAreaConocimiento: "",
      Id_UbicacionInstitucionEducativa: 1,
      Id_Estatus: 0,
      Id_DocumentoObtenido: 0,
      FechaObtencion: "",
      Aclaraciones: ""
   };
   const validationSchema = Yup.object().shape({
      Id_Nivel: Yup.number().min(1, "El nivel de estudios es requerido").required("El nivel de estudios es requerido"),
      NombreInstitucionEducativa: Yup.string().required("El Nombre de la instución educativa es requerida"),
      CarreraAreaConocimiento: Yup.string().required("El Aerea de conocimiento es requerida"),
      Id_UbicacionInstitucionEducativa: Yup.number()
         .min(1, "El Lugar donde se ubica la institución educativa requerido")
         .required("El Lugar donde se ubica la institución educativa es requerido"),
      Id_Estatus: Yup.number().min(1, "El Estatus de la institución es requerido").required("El Estatus de la institución es es requerido"),
      FechaObtencion: Yup.date("Formato de fecha invalida").required("La fecha de obtención es requerida")
   });
   return (
      <>
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
            <CardContent>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color
                  <span style={{ color: "green" }}>verde</span>
               </Typography>
               <Typography variant="subtitule2" align="start" color="textPrimary">
                  Capture su ultimo grado de estudios.
               </Typography>
               <br />
               <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={2}></Grid>
               </Typography>
               <Formik
                  initialValues={dataForm}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                     //  values.EsEnMexico = parseInt(values.EsEnMexico);
                     //  console.log("valores", values);
                     //  try {
                     //     const response = await PostAxios("/domiciliodeclarante/create", values);
                     //     next();
                     //     Success(response.data.data.message);
                     //     return response.data;
                     //  } catch (error) {
                     //     if (error.response?.data?.data?.message) {
                     //        Error(error.response.data.data.message);
                     //     } else {
                     //        Error("NO EXISTE CONEXION A LA DB");
                     //     }
                     //  }
                     //  setSubmitting(false);
                  }}
               >
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => {
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <AutoComplete col={12} label="Nivel de estudios" name="Id_Nivel" options={nivelEstudios} />
                           <Text col={12} name="NombreInstitucionEducativa" label="Institución educativa" />
                           <Text col={12} name="CarreraAreaConocimiento" label="Aerea de conocimiento" />
                           <CustomRadio
                              col={12}
                              name="Id_UbicacionInstitucionEducativa" // Nombre del campo en el formulario
                              title="¿Lugar donde se ubica la institución educativa?"
                              options={[
                                 { value: 1, label: "En mexico" },
                                 { value: 0, label: "En el extranjero" }
                              ]} // Opciones para los radio buttons
                           />
                           <AutoComplete col={12} label="Estatus" name="Id_Estatus" options={estatus} />
                           <AutoComplete col={12} label="Documento obtenido" name="Id_DocumentoObtenido" options={documentosObtenidos} />
                           <DatePickerComponent
                              idName={"license_due_date"}
                              label={"Fecha de Vencimiento *"}
                              format={"DD/MM/YYYY"}
                              value={values.license_due_date}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.license_due_date}
                              touched={touched.license_due_date}
                              showErrorInput={null}
                           />
                           <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

                           <Button type="submit" variant="contained" color="primary">
                              Registrar y Continuar
                           </Button>
                        </Box>
                     );
                  }}
               </Formik>
               <button variant="contained" color="secondary" onClick={previous}>
                  CONTINUAR DESAROLLO DE PAGINA
               </button>
            </CardContent>
         </Card>
      </>
   );
};
