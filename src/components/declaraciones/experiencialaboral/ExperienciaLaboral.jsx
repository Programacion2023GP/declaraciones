import { useEffect, useRef, useState } from "react";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Box, Button, Card, CardContent, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import DatePickerComponent from "../../Reusables/datepicker/DatePickerComponent";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import DataTable from "../../Reusables/table/DataTable";
import { Error, Success } from "../../../toasts/toast";
import { useDispatch } from "react-redux";
import { addExperienciaLaboral } from "../../../redux/ExperienciaLaboralHoja5/ExperienciaLaboralHoja5";
import { Post } from "../funciones/post";
import { FormikForm, Voice } from "../../Reusables/formik/FormikForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { insertFormik } from "../../FuncionesFormik";
// import DataTable from "../../Reusables/table/DataTable";
import { useFormik } from "formik";
import DatePickerComponentV2 from "../../Reusables/datepicker/DatePickerComponentV2";

export const ExperienciaLaboral = ({ loading, data, next, previous, title }) => {
   let { declaracion } = useParams();
   const [save, setSave] = useState(true);
   const [idRow, setIdRow] = useState(null);

   const [ambitoPublico, setAmbitoPublico] = useState([]);
   const [activeAmbitoPublico, setactiveAmbitoPublico] = useState(false);
   const [activeSector, setActiveSector] = useState(false);
   const [datas, setDatas] = useState([]);
   const [datasVisuales, setDatasVisuales] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formikRef = useRef();
   const [continuar, setContinuar] = useState(false);
   const [checked, setChecked] = useState(false);
   const [update, setUpdate] = useState(loading);
   const [loadData, setLoadData] = useState(data);
   const [see, setSee] = useState(false);
   const [seeItem, setSeeItem] = useState(null);
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         let newDatasArray = [];
         let newDatasVisualesArray = [];

         loadData.forEach((values, index) => {
            delete values.Id_ExperienciaLaboral;
            const modifiedData = addDataTableModified(values, index);
            newDatasArray.push(modifiedData.newData);
            newDatasVisualesArray.push(modifiedData.newDataVisual);
         });

         setDatas(newDatasArray); // Actualizamos el estado de una sola vez
         setDatasVisuales(newDatasVisualesArray); // Actualizamos el estado de una sola vez
      }
   }, [data, loading]);

   useEffect(() => {}, [update]);

   const addDataTableModified = (values, index) => {
      values.identificador = index;

      const newData = {
         ...values
      };

      const newDataVisual = {
         id: index,
         Id_Sector: parseInt(values.Id_AmbitoSector) === 1 ? "PÚBLICO" : "PRIVADO",
         "Empleo, Ámbito cargo o comisión": values.NombreEntePublico,
         Lugar: parseInt(values.FueEnMexico) === 1 ? "Mexico" : "Extranjero",
         "Fecha ingreso": values.FechaIngreso,
         "Fecha egreso": values.FechaEngreso
      };

      setIdUnique(index + 1);

      return { newData, newDataVisual };
   };

   const dispatch = useDispatch();
   const dataForm = {
      Id_AmbitoSector: 1,
      Id_AmbitoPublico: 0,
      NombreEntePublico: "",
      AreaAdscripcion: "",
      EmpleoCargoComision: "",
      FuncionPrincipal: "",
      FechaIngreso: "",
      FechaEngreso: "",
      FueEnMexico: 1,
      Aclaraciones: "",
      Rfc: "",
      Puesto: "",
      Id_Sector: "",
      SectorEspecificado: "",
      Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial"))
   };

   const validationSchema = Yup.object().shape({
      Id_AmbitoSector: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción"),
      Id_AmbitoPublico: !activeAmbitoPublico ? Yup.number().min(1, "El ámbito público es requerido").required("El ámbito público es requerido") : null,
      NombreEntePublico: Yup.string().required("El nombre del ente público es requerido"),
      AreaAdscripcion: Yup.string().required("El área de adscripción del ente público es requerido"),
      EmpleoCargoComision: !activeAmbitoPublico ? Yup.string().required("El empleo, cargo o comisión es requerido") : null,
      FuncionPrincipal: !activeAmbitoPublico ? Yup.string().required("La función principal es requerida") : null,
      SectorEspecificado: activeSector ? Yup.string().required("El sector es requerido") : null,
      Rfc: activeAmbitoPublico && Yup.string().length(3, "Debe contar con 3 caracteres").trim().required("El RFC de la empresa es requerido"),
      Puesto: activeAmbitoPublico && Yup.string().required("El puesto de la empresa es requerido"),
      Id_Sector: activeAmbitoPublico && Yup.number().required("El sector es requerido"),
      FechaIngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de ingreso es requerida"),
      FechaEngreso: Yup.date().typeError("El formato de fecha es inválido").required("La fecha de egreso es requerida"),
      FueEnMexico: Yup.number().typeError("Debe ser numérico").required("Es requerido que seleccione una opción")
   });

   const handleGetValue = async (name, value) => {
      if (name == "Id_AmbitoSector") {
         value == 2 ? setactiveAmbitoPublico(true) : setactiveAmbitoPublico(false);
      }
      name == "Id_Sector" && value == 0 ? setActiveSector(true) : setActiveSector(false);
   };
   const clearForm = (privado = false, sector = false) => {
      privado ? setactiveAmbitoPublico(false) : setactiveAmbitoPublico(true);
      sector ? setActiveSector(true) : setActiveSector(false);

      formikRef.current.resetForm();
      formikRef.current.initialValues = dataForm;
   };
   const submit = async (values, { resetForm }) => {
      setChecked(false);
      if (save) {
         if (datas.length < 5) {
            values.FueEnMexico = parseInt(values.FueEnMexico);
            values.Id_AmbitoSector = parseInt(values.Id_AmbitoSector);
            values.identificador = idUnique;
            setIdUnique(idUnique + 1);
            const newDatas = [...datas, values];
            setDatas(newDatas);

            clearForm(true, false);
            Success("se agrego a la tabla");

            const newDatasVisuales = [
               ...datasVisuales,
               {
                  id: values.identificador,
                  Id_Sector: values.Id_AmbitoSector === 1 ? "PÚBLICO" : "PRIVADO",
                  "Empleo, Ámbito cargo o comisión": values.NombreEntePublico,
                  Lugar: values.FueEnMexico === 1 ? "Mexico" : "Extranjero",
                  "Fecha ingreso": values.FechaIngreso,
                  "Fecha egreso": values.FechaEngreso
               }
            ];
            setDatasVisuales(newDatasVisuales);
         } else {
            Error("cuentas con el limite de experiencias laborales");
         }
      } else {
         const index = datas.findIndex((elemento) => elemento.identificador == idRow);
         const newDatas = [...datas];
         newDatas[index] = values;
         setDatas(newDatas);
         const newDatasVisuales = [...datasVisuales];
         newDatasVisuales[index] = {
            id: values.identificador,
            Sector: values.Id_AmbitoSector === 1 ? "PÚBLICO" : "PRIVADO",
            "Empleo, Ámbito cargo o comisión": values.NombreEntePublico,
            Lugar: values.FueEnMexico === 1 ? "Mexico" : "Extranjero",
            "Fecha ingreso": values.FechaIngreso,
            "Fecha egreso": values.FechaEngreso
         };
         setDatasVisuales(newDatasVisuales);
         clearForm();
      }
      setSave(true);
   };

   const sendData = async () => {
      if (datas.length > 0) {
         const url = `experiencialaboral/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
         const newDatas = [...datas];

         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               dispatch(addExperienciaLaboral(newDatas[i]));
               // delete newDatas[i].identificador;
            }
            await Post(url, newDatas, next);
         };
         await sendApi();

         // setDatas([]);
         // setDatasVisuales([]);
         // next();
      } else if (datas.length == 0) {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${5}/1`);
            Success(response.data.data.message);
            setDatas([]);
            setDatasVisuales([]);
            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
   };

   const Edit = (row) => {
      setSave(false);
      const finData = datas.filter((elemento) => elemento.identificador == row.id);
      const item = finData[0];
      setIdRow(item.identificador);

      clearForm(item.Id_AmbitoPublico != 0, item.SectorEspecificado != "" && item.Id_Sector == 0);
      formikRef.current.setValues(item);
      // formikRef.current.setFieldValue("Id_AmbitoPublico", finData[0].Id_AmbitoPublico);
   };
   const getErrorMessages = (errors, touched) => {
      const errorMessages = [];

      // Iterar sobre cada campo en los errores
      Object.keys(errors).forEach((field) => {
         // Verificar si el campo ha sido tocado por el usuario
         if (touched[field]) {
            errorMessages.push(errors[field]);
         }
      });

      return errorMessages;
   };
   const Delete = (row) => {
      const newDatasVisuales = datasVisuales.filter((elemento) => elemento.id !== row.id);

      setDatas(datas.filter((elemento) => elemento.identificador !== row.id));

      setDatasVisuales(newDatasVisuales);
      Success("se elimino de la tabla");
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const handleSee = (item) => {
      setChecked(true);
      // console.log("handle", formikRef);
      setSeeItem(datas.filter((elemento) => elemento.identificador == item.id)[0]);
      setSee(true);
   };
   useEffect(() => {
      const init = async () => {
         setAmbitoPublico(await GetAxios("ambitospublicos/show"));
      };
      init();
   }, [activeAmbitoPublico, activeSector]);
   useEffect(() => {
      see && insertFormik(formikRef, seeItem);
   }, [see, seeItem]);
   return (
      <>
         {/* {console.log("la datas", datas)} */}
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  headers={["Sector", "Ente publico o Nombre de la empresa", "Lugar", "Fecha de ingreso", "Fecha de salida"]}
                  dataHidden={["id"]}
                  data={datasVisuales}
                  moreButtons={[
                     {
                        tooltip: "Imprimir",
                        color: "#27AE60",
                        icon: VisibilityIcon,
                        toltip: "Imprimir",
                        handleButton: handleSee
                        // conditions: ["Status == 'Terminada'"]
                     }
                  ]}
                  // loading={loading && datas.length > 0}
                  // editButton={true}
                  // handleEdit={Edit}
                  deleteButton={true}
                  handleDelete={Delete}
                  // filter={true}
                  // pagination={[5, 10]}
               />
            </Card>
         </Box>

         <Box sx={{ maxWidth: "90%", margin: "auto" }}>{/* <DataTable data={datas} /> */}</Box>
         <br />
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}>
            <CardContent>
               <Typography variant="h5" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color &nbsp;
                  <span style={{ color: "green" }}>verde</span>
               </Typography>
               <br />
               <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={2}></Grid>
               </Typography>
               <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                     control={
                        <Switch
                           checked={checked} // Este es el estado que controla el Switch
                           onChange={handleChange} // Manejador de cambios
                           name="gilad"
                           color={datasVisuales.length > 0 ? "secondary" : "primary"}
                        />
                     }
                     label={datasVisuales.length > 0 ? "¿Deseas seguir agregando experiencias laborales?" : "¿Tienes experiencias laborales?"}
                  />
               </FormGroup>

               <Ngif condition={checked}>
                  <FormikForm setSee={setSee} ref={formikRef} see={see} initialValues={dataForm} validationSchema={validationSchema} submit={submit}>
                     {/* <Grid
                              container
                              spacing={1}
                              style={{ maxHeight: "400px", overflow: "auto", padding: "0 2rem", position: "relative" }}
                              component={"form"}
                              onSubmit={handleSubmit}
                           >
                              <Grid xs={12}>
                                 <Voice message={getErrorMessages(errors, touched)} title={title} info="Ayuda sobre el formulario" />
                              </Grid>*/}
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
                        <Text textStyleCase={true} col={12} name="NombreEntePublico" label="Nombre del ente público" />
                        <Text
                           textStyleCase={true}
                           col={12}
                           name="AreaAdscripcion"
                           label="Área de adscripción"
                           placeholder={"Especificar el nombre de la Unidad Administrativa u homóloga superior inmediata de su adscripción. (Superior jerárquico)"}
                        />
                        <Text textStyleCase={true} col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" />
                        <Text
                           textStyleCase={true}
                           col={12}
                           name="FuncionPrincipal"
                           label="Especifique función principal"
                           placeholder={"Señalar cuál es la función o actividad principal que desempeña en su empleo, cargo o comisión"}
                        />
                     </Ngif>
                     <Ngif condition={activeAmbitoPublico}>
                        <Text textStyleCase={true} col={12} name="NombreEntePublico" label="Nombre de la empresa" />
                        <Text textStyleCase={true} col={12} name="Rfc" label="Rfc de la empresa" />
                        <Text textStyleCase={true} col={12} name="AreaAdscripcion" label="Area" />
                        <Text textStyleCase={true} col={12} name="Puesto" label="Puesto" />
                        <CustomRadio
                           handleGetValue={handleGetValue}
                           col={12}
                           name="Id_Sector" // Nombre del campo en el formulario
                           title="Sector al que pertenece"
                           options={[
                              { value: 1, label: "Empresa" },
                              { value: 2, label: "Sociedad o Asociación" },
                              { value: 0, label: "Otro especifique ..." }
                           ]} // Opciones para los radio buttons
                        />
                     </Ngif>
                     <Ngif condition={activeSector}>
                        <Text textStyleCase={true} col={12} name="SectorEspecificado" label="Especifica el sector" />
                     </Ngif>
                     <DatePickerComponentV2
                        name={"FechaIngreso"}
                        label={"Fecha de ingreso"}
                        format={"DD/MM/YYYY"}
                        // value={values.FechaIngreso}
                     />
                     <DatePickerComponentV2
                        name={"FechaEngreso"}
                        label={"Fecha de egreso"}
                        format={"DD/MM/YYYY"}
                        // value={values.FechaEngreso}
                     />
                     <CustomRadio
                        hidden={false}
                        col={12}
                        name="FueEnMexico" // Nombre del campo en el formulario
                        title="¿Es de México?"
                        options={[
                           { value: 1, label: "Si" },
                           { value: 0, label: "No" }
                        ]} // Opciones para los radio buttons
                     />
                     <Text textStyleCase={true} col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
                     <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
                        Regresar a la pagina anterior
                     </Button>
                     <Ngif condition={!see}>
                        <Box position={"relative"} width={"100%"} mb={"1rem"} padding={" 1.2rem"}>
                           <Button
                              sx={{
                                 marginLeft: "1rem",
                                 position: "absolute",

                                 top: -34,
                                 bottom: 38,
                                 right: 0
                              }}
                              type="submit"
                              variant="contained"
                              color="primary"
                           >
                              Agregar a la tabla
                           </Button>
                        </Box>
                     </Ngif>
                     {/* </Grid> */}
                  </FormikForm>
               </Ngif>
               <Ngif condition={!checked}>
                  <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
                     Regresar a la pagina anterior
                  </Button>
                  <Box position={"relative"} width={"100%"} mb={"1rem"} padding={" 1.2rem"}>
                     <Button
                        sx={{
                           marginLeft: "1rem",
                           position: "absolute",

                           top: -34,
                           bottom: 38,
                           right: 0
                        }}
                        onClick={sendData}
                        type="submit"
                        variant="contained"
                        color="primary"
                     >
                        {loading ? "Actualizar y Continuar" : datas.length > 0 ? "Registrar y Continuar" : "Continuar"}
                     </Button>
                  </Box>
               </Ngif>
            </CardContent>
         </Card>
      </>
   );
};
