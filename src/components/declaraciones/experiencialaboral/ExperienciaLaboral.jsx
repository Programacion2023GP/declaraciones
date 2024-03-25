import { useEffect, useRef, useState } from "react";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePickerComponent from "../../Reusables/datepicker/DatePickerComponent";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import DataTable from "../../Reusables/table/DataTable";

// import DataTable from "../../Reusables/table/DataTable";

export const ExperienciaLaboral = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const [ambitoPublico, setAmbitoPublico] = useState([]);
   const [activeAmbitoPublico, setactiveAmbitoPublico] = useState(false);
   const [activeSector, setActiveSector] = useState(false);
   const [datas, setDatas] = useState([]);
   const [datasVisuales, setDatasVisuales] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formikRef = useRef(); // Referencia para acceder a la instancia de Formik

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
      dataForm.Rfc = "";
      dataForm.Puesto = "";
      dataForm.Sector = "";
   } else {
      delete dataForm.Rfc;
      delete dataForm.Puesto;
      delete dataForm.Sector;
   }
   if (activeSector) {
      dataForm.SectorEspecificado = "";
   } else {
      delete dataForm.SectorEspecificado;
   }
   const validationSchema = Yup.object().shape({
      Id_AmbitoSector: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción"),
      Id_AmbitoPublico: !activeAmbitoPublico ? Yup.number().min(1, "El ámbito público es requerido").required("El ámbito público es requerido") : null,
      NombreEntePublico: Yup.string().required("El nombre del ente público es requerido"),
      AreaAdscripcion: Yup.string().required("El área de adscripción del ente público es requerido"),
      EmpleoCargoComision: !activeAmbitoPublico ? Yup.string().required("El empleo, cargo o comisión es requerido") : null,
      FuncionPrincipal: !activeAmbitoPublico ? Yup.string().required("La función principal es requerida") : null,
      SectorEspecificado: activeSector ? Yup.string().required("El sector es requerido") : null,
      Rfc: !activeAmbitoPublico ? null : Yup.string().required("El RFC de la empresa es requerido"),
      Puesto: !activeAmbitoPublico ? null : Yup.string().required("El puesto de la empresa es requerido"),
      Sector: !activeAmbitoPublico ? null : Yup.number().required("El sector es requerido"),

      FechaIngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de ingreso es requerida"),
      FechaEngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de egreso es requerida"),
      EsEnMexico: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción")
   });

   const handleGetValue = async (name, value) => {
      console.log("consulta", name, value);
      if (name == "Id_AmbitoSector") {
         value == 2 ? setactiveAmbitoPublico(true) : setactiveAmbitoPublico(false);
         console.error(activeAmbitoPublico);
      }
      name == "Sector" && value == 0 ? setActiveSector(true) : setActiveSector(false);
   };
   const submit = async (values, { resetForm }) => {
      if (datas.length < 5) {
         values.EsEnMexico = parseInt(values.EsEnMexico);
         values.identificador = idUnique;
         setIdUnique(idUnique + 1);
         const newDatas = [...datas, values];
         setDatas(newDatas);
         const newDatasVisuales = [
            ...datasVisuales,
            {
               id: values.identificador,
               Sector: values.Id_AmbitoSector === 1 ? "PÚBLICO" : "PRIVADO",
               "Empleo, Ámbito cargo o comisión": values.NombreEntePublico,
               Lugar: values.EsEnMexico === 1 ? "Mexico" : "Extranjero",
               "Fecha ingreso": values.FechaIngreso,
               "Fecha egreso": values.FechaEngreso
            }
         ];
         console.log("table", newDatasVisuales);
         setDatasVisuales(newDatasVisuales);
         resetForm();
      }
   };
   const Edit = (row) => {
      const finData = datas.filter((elemento) => elemento.id !== row.id);
      console.log(finData[0]);
      formikRef.current.setValues(finData[0]); // Establecer los datos en los campos de formulario
   };
   const Delete = (row) => {
      const newDatasVisuales = datasVisuales.filter((elemento) => elemento.identificador !== row.id);
      console.log("eliminar", newDatasVisuales);
      setDatasVisuales(newDatasVisuales);
   };
   useEffect(() => {
      const init = async () => {
         // setNivelOrdenGobierno(await GetAxios("/nivelordengobierno/show"));
         setAmbitoPublico(await GetAxios("/ambitospublicos/show"));
         // setEntidades(await GetAxios("/entidades/show"));
         // setPaises(await GetAxios("/paises/show"));
      };
      init();
   }, [activeAmbitoPublico, activeSector]);
   return (
      <>
         {/* {console.log("la datas", datas)} */}
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
               <DataTable
                  editButton={true}
                  deleteButton={true}
                  dataHidden={["id"]}
                  // headers={["Ámbito", "Empleo, Ámbito cargo o comisión", "Lugar", "Fecha ingreso", "Fecha egreso"]}
                  handleEdit={Edit}
                  handleDelete={Delete}
                  data={datasVisuales}
                  // filter={true}
                  // pagination={[5, 10]}
               />
            </Card>
         </Box>

         <Box sx={{ maxWidth: "90%", margin: "auto" }}>{/* <DataTable data={datas} /> */}</Box>
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
               <Formik innerRef={formikRef} initialValues={dataForm} validationSchema={validationSchema} onSubmit={submit}>
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues }) => {
                     {
                        console.warn(errors);
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
