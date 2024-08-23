import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Request } from "../../../Reusables/request/Request";
import DataTable from "../../../Reusables/table/DataTable";
import { useEffect, useRef, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import * as Yup from "yup";
import { Error, Success } from "../../../../toasts/toast";
import { Post } from "../../../declaraciones/funciones/post";
import { Axios, PostAxios } from "../../../../services/services";
import Loading from "../../../Reusables/loading/Loading";

export const ParticipacionEmpresas = ({ loading, data, next, previous, title }) => {
   const { relacion, monedas, paises, entidades, tipoParticipacion, sectores } = Request({
      peticiones: ["relacion", "monedas", "paises", "entidades", "tipoParticipacion", "sectores"]
   });
   const formik = useRef();
   const [checked, setChecked] = useState(false);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [mexico, setMexico] = useState(true);
   const [renumeracion, setRenumeracion] = useState(true);
   const [update, setUpdate] = useState(Array.isArray(data) && data.length > 0);
   const [loadData, setLoadData] = useState(data);
   const [loadings, setLoadings] = useState(false);

   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const initialValues = {
      Id_User: parseInt(localStorage.getItem("Id_User")),
      Id_Intereses: "",
      Id_TipoRelacion: 1,
      NombreEmpresaSociedadAsociacion: "",
      RfcEmpresa: "",
      PorcentajeParticipacion: "",
      Id_TipoParticipacion: 0,
      RecibeRemuneracion: 1,
      MontoMensual: 0,
      Id_MonedaMontoMensual: 0,
      Id_PaisUbicacion: 1,
      Id_EntidadFederativa: 0,
      Id_Sector: 0,
      EsEnMexico: 1,
      Aclaraciones: ""
   };
   const validationSchema = Yup.object().shape({
      NombreEmpresaSociedadAsociacion: Yup.string().required("El nombre de la empresa o asociación es requerido"),
      PorcentajeParticipacion: Yup.number()
         .required("El porcentaje de participación es requerido")
         .min(0, "El porcentaje de participación debe ser al menos 0")
         .max(100, "El porcentaje de participación no puede exceder 100"),
      RecibeRemuneracion: Yup.number().required("La remuneración es requerida").oneOf([0, 1], "El valor debe ser 0 (No) o 1 (Sí)"),
      Id_TipoParticipacion: Yup.number().min(1, "El tipo de participación es requerido").required("El tipo de participación es requerido"),
      RfcEmpresa: Yup.string().min(3, "El RFC de empresa debe tener al menos 3 caracteres").required("El RFC de empresa es requerido"),
      MontoMensual: renumeracion && Yup.number().required("El monto mensual es requerido").min(0, "El monto mensual debe ser al menos 0"),
      Id_MonedaMontoMensual: renumeracion && Yup.number().min(1, "La moneda del monto mensual es requerida").required("La moneda del monto mensual es requerida"),
      Id_PaisUbicacion: !mexico && Yup.number().min(1, "El país de ubicación es requerido").required("El país de ubicación es requerido"),
      Id_EntidadFederativa: mexico && Yup.number().min(1, "La entidad federativa es requerida").required("La entidad federativa es requerida"),
      Id_Sector: Yup.number().min(1, "El sector es requerido").required("El sector es requerido"),
      EsEnMexico: Yup.number().required("Debe indicar si está en México").oneOf([0, 1], "El valor debe ser 0 (No) o 1 (Sí)"),
      Aclaraciones: Yup.string().max(500, "Las aclaraciones no pueden exceder 500 caracteres")
   });
   const handleMexico = (name, value) => {
      setMexico(value == 1 ? true : false);
   };

   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (relacion.length > 0 && monedas.length > 0 && paises.length > 0 && entidades.length > 0 && tipoParticipacion.length > 0 && sectores.length > 0) {
         if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
            // Crea arrays temporales para los nuevos datos
            const newDatas = [];
            const newDatasTable = [];

            loadData.forEach((values, index) => {
               delete values.Id_PrestamoComodato;

               // Asignar identificador
               values.identificador = index;

               // Crear datos para datasTable
               const newData = {
                  id: index + 1,
                  NombreEmpresaSociedadAsociacion: values.NombreEmpresaSociedadAsociacion,
                  Porcentaje: values.PorcentajeParticipacion,
                  "Recibe remuneración": values.RecibeRemuneracion > 0 ? "Si" : "No",
                  tipoRelaciones: tipoRelaciones.find((item) => item.value === parseInt(values.Id_TipoRelacion))?.label,
                  "En México": values.EsEnMexico == 1 ? "En México" : "En el extranjero"
               };
               setIdUnique(idUnique + 1);

               // Añadir datos a los arrays temporales
               newDatas.push(values);
               newDatasTable.push(newData);
               setLoadings(false);
            });

            // Actualizar el estado con los nuevos datos
            setDatas(newDatas);
            setDatasTable(newDatasTable);
            // Ajustar el identificador único
         }
      }
   }, [data, relacion, monedas, paises, entidades, tipoParticipacion, sectores]);

   const submit = async (values, { resetForm }) => {
      formik.current.resetForm();

      Success("se agrego a la tabla");
      values.identificador = idUnique;
      values.Id_Intereses = parseInt(localStorage.getItem("id_Intereses"));
      setDatas(datas.concat(values));
      // dispatch(addDatosDependiente(values));
      adDataTable(values);
   };
   const adDataTable = (values) => {
      const newDatasVisuales = [
         ...datasTable,
         {
            id: values.identificador,
            NombreEmpresaSociedadAsociacion: values.NombreEmpresaSociedadAsociacion,
            Porcentaje: values.PorcentajeParticipacion,
            "Recibe remuneración": values.RecibeRemuneracion > 0 ? "Si" : "No",
            tipoRelaciones: tipoRelaciones.find((item) => item.value === parseInt(values.Id_TipoRelacion))?.label,
            "En México": values.EsEnMexico == 1 ? "En méxico" : "En el extranjero"
         }
      ];
      setDatasTable(newDatasVisuales);
      setIdUnique(idUnique + 1);
      setRenalize(reinilaize + 1);
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const handleRenumeracion = (name, value) => {
      setRenumeracion(value == 1 ? true : false);
   };

   const deleteRow = (row) => {
      // console.log(datasTable);
      // dispatch(deleteDatosDependiente({ id: row.id }));
      setDatas(datas.filter((item) => item.identificador != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   const sendDatas = async () => {
      const newDatas = [...datas];
      const url = `participacionempresas/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
      // console.log(newDatas,url);
      if (newDatas.length > 0) {
         try {
            const sendApi = async () => {
               for (let i = 0; i < newDatas.length; i++) {
                  //   dispatch(addDatosDependiente(newDatas[i]));
                  // delete newDatas[i].identificador;
               }
               const response = await PostAxios(url, newDatas);
               localStorage.setItem("id_Intereses", response.data.result);
               Success(response.data.message);
               if (parseInt(response.data.result) > 0) {
               }
            };
            await sendApi();
            next();
            // dispatch(clearData());
            setDatasTable([]);
            setDatas([]);
         } catch (error) {
            if (error.response?.data?.message) {
               Error(error.response.data.message);
            } else {
               console.error("error", error);
               Error("Ocurrio un error");
            }
            // dispatch(clearData());
            // setDatasTable([]);
         }
      } else {
         try {
            const crear = !isNaN(parseInt(localStorage.getItem("id_Intereses"), 10)) && parseInt(localStorage.getItem("id_Intereses"), 10) > 0 ? 0 : 1;
            const response = await Axios.post(
               `apartados/interes/${parseInt(localStorage.getItem("id_Intereses") || "0")}/1/1/${parseInt(localStorage.getItem("Id_User"))}/${crear}`
            );
            if (crear == 1) {
               localStorage.setItem("id_Intereses", response.data.data.result);
            }
            next();
            console.log("angel");

            Success("Continuemos llenando los formularios");
            setDatasTable([]);
         } catch (error) {
            console.log("error", error);
            Error(error.response.data.message);
         }
      }
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               {loadings && <Loading />}

               <DataTable
                  headers={["Nombre empresa	", "Porcentaje", "Recibe remuneración", " Tipo", " Lugar"]}
                  dataHidden={["id"]}
                  data={datasTable}
                  //   data={datasTable}
                  //   loading={loading && datas.length > 0}
                  // handleEdit={edit}
                  // editButton={true}
                  deleteButton={true}
                  handleDelete={deleteRow}
               />
            </Card>
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando participaciones?" : "¿Tiene participaciones?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm
               messageButton="Agregar a la tabla"
               // previousButton
               handlePrevious={previous}
               ref={formik}
               initialValues={initialValues}
               submit={submit}
               validationSchema={validationSchema}
               button
            >
               <CustomRadio col={12} title={``} name={`Id_TipoRelacion`} options={tipoRelaciones} />
               <Text col={6} name={`NombreEmpresaSociedadAsociacion`} label={`Nombre de la empresa, sociedad o asociación`} />
               <Text col={6} name={`RfcEmpresa`} label={`RFC`} />
               <Text col={6} name={`PorcentajeParticipacion`} label={`Porcentaje de participación de acuerdo a escritura`} type={"number"} />
               <AutoComplete col={6} name={`Id_TipoParticipacion`} label={`Tipo de participación`} options={tipoParticipacion} />
               <CustomRadio
                  col={12}
                  title={`¿Recibe remuneración por su participación?

               `}
                  name={`RecibeRemuneracion`}
                  options={[
                     { value: 1, label: "Si" },
                     { value: 0, label: "No" }
                  ]}
                  handleGetValue={handleRenumeracion}
               />
               <Ngif condition={renumeracion}>
                  <AutoComplete col={12} name={`Id_MonedaMontoMensual`} label={`Tipo de Moneda`} options={monedas} />
                  <Text col={12} name={`MontoMensual`} label={`Monto mensual neto`} type={"number"} />
               </Ngif>
               <CustomRadio
                  col={12}
                  title={`Lugar donde se ubica

               `}
                  name={`EsEnMexico`}
                  options={[
                     { value: 1, label: "En méxico" },
                     { value: 0, label: "En el extranjero" }
                  ]}
                  handleGetValue={handleMexico}
               />
               <AutoComplete
                  col={12}
                  name={mexico ? "Id_EntidadFederativa" : "Id_PaisUbicacion"}
                  label={mexico ? "Entidad federativa" : "Pais"}
                  options={mexico ? entidades : paises}
               />
               <AutoComplete col={12} name={`Id_Sector`} label={`Sector productivo al que pertenece`} options={sectores} />

               <Text col={12} rows={12} name={`Aclaraciones`} label={"Aclaraciones/Observaciones"} color={"green"} />
            </FormikForm>
            <button
               onClick={() => {
                  console.log(formik.current.errors);
               }}
            ></button>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatas}>
               {update ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
