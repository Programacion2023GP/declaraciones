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
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { MyDataTable } from "../../Reusables/datable/MyDataTable";
// import DataTable from "../../Reusables/table/DataTable";

export const ExperienciaLaboral = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const [ambitoPublico, setAmbitoPublico] = useState([]);
   const [activeAmbitoPublico, setactiveAmbitoPublico] = useState(false);
   const [activeSector, setActiveSector] = useState(false);
   const [datas, setDatas] = useState([]);
   const dataForm = {
      Id_AmbitoSector: 1,
      Id_AmbitoPublico: 0,
      NombreEntePublico: "",
      AreaAdscripcion: "",
      EmpleoCargoComision: "",
      FuncionPrincipal: "",
      FechaIngreso: "",
      FechaEngreso: "",
      EsEnMexico: 1,
      Aclaraciones: ""
   };
   if (activeAmbitoPublico) {
      dataForm.NombreEntePublico = "";
      dataForm.Rfc = "";
      dataForm.Puesto = "";
      dataForm.Sector = "";
   } else {
      delete dataForm.NombreEntePublico;
      delete dataForm.Rfc;
      delete dataForm.Puesto;
      delete dataForm.Sector;
   }
   if (activeSector) {
      dataForm.SectorEspecifico = "";
   } else {
      delete dataForm.SectorEspecifico;
   }
   const validationSchema = Yup.object().shape({
      Id_AmbitoSector: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción"),
      Id_AmbitoPublico: activeAmbitoPublico ? Yup.number().min(1, "El ámbito público es requerido").required("El ámbito público es requerido") : null,
      NombreEntePublico: activeAmbitoPublico ? Yup.string().required("El nombre del ente público es requerido") : null,
      AreaAdscripcion: activeAmbitoPublico ? Yup.string().required("El área de adscripción del ente público es requerido") : null,
      EmpleoCargoComision: activeAmbitoPublico ? Yup.string().required("El empleo, cargo o comisión es requerido") : null,
      FuncionPrincipal: activeAmbitoPublico ? Yup.string().required("La función principal es requerida") : null,
      SectorEspecifico: activeSector ? Yup.string().required("El sector es requerido") : null,
      Rfc: !activeAmbitoPublico ? null : Yup.string().required("El RFC de la empresa es requerido"),
      Puesto: !activeAmbitoPublico ? null : Yup.string().required("El puesto de la empresa es requerido"),
      Sector: !activeAmbitoPublico ? null : Yup.number().required("El sector es requerido"),

      FechaIngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de ingreso es requerida"),
      FechaEngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de egreso es requerida"),
      EsEnMexico: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción")
   });

   const handleGetValue = async (name, value) => {
      if (name == "Id_AmbitoSector") {
         value == 1 ? setactiveAmbitoPublico(false) : setactiveAmbitoPublico(true);
      }
      name == "Sector" && value == 0 ? setActiveSector(true) : setActiveSector(false);
   };
   const submit = async (values, { setSubmitting }) => {
      values.EsEnMexico = parseInt(values.EsEnMexico);
      if (datas.length < 5) {
         // console.log("jj");
         datas.push(values);
         setDatas(datas);
         console.log("Data", datas);
      }
   };
   useEffect(() => {
      const init = async () => {
         // setNivelOrdenGobierno(await GetAxios("/nivelordengobierno/show"));
         setAmbitoPublico(await GetAxios("/ambitospublicos/show"));
         // setEntidades(await GetAxios("/entidades/show"));
         // setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, []);
   return (
      <>
         <Box sx={{ maxWidth: "90%", margin: "auto" }}>
            <MyDataTable />
            {/* <DataTable data={datas} /> */}
         </Box>
         <br />
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
               <Formik initialValues={dataForm} validationSchema={validationSchema} onSubmit={submit}>
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue }) => {
                     {
                        console.error(errors);
                        // Utiliza la variable hasHandleChangeIdEntidadFederativa según tu necesidad
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
                              handleGetValue={handleGetValue}
                              hidden={false}
                              col={12}
                              name="Id_AmbitoSector" // Nombre del campo en el formulario
                              title="Ámbito / sector en el que laboraste"
                              options={[
                                 { value: 1, label: "PÚBLICO" },
                                 { value: 2, label: "PRIVADO" }
                              ]} // Opciones para los radio buttons
                           />
                           <Ngif condition={!activeAmbitoPublico}>
                              <AutoComplete col={12} label="Ámbito público" name="Id_AmbitoPublico" options={ambitoPublico} />
                              <Text col={12} name="NombreEntePublico" label="Nombre del ente público" />
                              <Text
                                 col={12}
                                 name="AreaAdscripcion"
                                 label="Área de adscripción"
                                 placeholder={
                                    "Especificar el nombre de la Unidad Administrativa u homóloga superior inmediata de su adscripción. (Superior jerárquico)"
                                 }
                              />
                              <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" />
                              <Text
                                 col={12}
                                 name="FuncionPrincipal"
                                 label="Especifique función principal"
                                 placeholder={"Señalar cuál es la función o actividad principal que desempeña en su empleo, cargo o comisión"}
                              />
                           </Ngif>
                           <Ngif condition={activeAmbitoPublico}>
                              <Text col={12} name="NombreEntePublico" label="Nombre de la empresa" />
                              <Text col={12} name="Rfc" label="Rfc de la empresa" />
                              <Text col={12} name="AreaAdscripcion" label="Aerea" />
                              <Text col={12} name="Puesto" label="Puesto" />
                              <CustomRadio
                                 handleGetValue={handleGetValue}
                                 col={12}
                                 name="Sector" // Nombre del campo en el formulario
                                 title="Sector al que pertenece"
                                 options={[
                                    { value: 1, label: "Empresa" },
                                    { value: 2, label: "Sociedad o Asociación" },
                                    { value: 0, label: "Otro especifique ..." }
                                 ]} // Opciones para los radio buttons
                              />
                           </Ngif>
                           <Ngif condition={activeSector}>
                              <Text col={12} name="SectorEspecificado" label="Especifica el sector" />
                           </Ngif>
                           <DatePickerComponent
                              idName={"FechaIngreso"}
                              label={"Fecha de ingreso"}
                              format={"DD/MM/YYYY"}
                              value={values.FechaIngreso}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.FechaIngreso}
                              touched={touched.FechaIngreso}
                              showErrorInput={null}
                           />
                           <DatePickerComponent
                              idName={"FechaEngreso"}
                              label={"Fecha de egreso"}
                              format={"DD/MM/YYYY"}
                              value={values.FechaEngreso}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.FechaEngreso}
                              touched={touched.FechaEngreso}
                              showErrorInput={null}
                           />
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
                           <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />

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
