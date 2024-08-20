import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import DataTable from "../../../Reusables/table/DataTable";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useEffect, useRef, useState } from "react";
import { Error, Success } from "../../../../toasts/toast";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import * as Yup from "yup";
import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";
import { Request } from "../../../Reusables/request/Request";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Axios, PostAxios } from "../../../../services/services";
import Loading from "../../../Reusables/loading/Loading";

export const ParticipacionTomaDecisiones = ({ loading, data, next, previous, title }) => {
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [checked, setChecked] = useState(true);
   const [renumeracion, setRenumeracion] = useState(true);
   const [mexico, setMexico] = useState(true);
   const [idUnique, setIdUnique] = useState(1);
   const [loadings, setLoadings] = useState(false);

   const [update, setUpdate] = useState(data.length > 0);
   const formik = useRef(null);
   //TipoInstrumento
   const [loadData, setLoadData] = useState(data);

   const { paises, entidades, instituciones } = Request({ peticiones: ["paises", "entidades", "instituciones"] });
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (instituciones.length > 0 && paises.length > 0 && entidades.length > 0) {
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
                  id: values.identificador,
                  NombreInstitucion: values.NombreInstitucion,
                  RfcInstitucion: values.RfcInstitucion,
                  FechaInicioParticipacion: values.FechaInicioParticipacion,
                  "Recibe remuneración": values.RecibeRemuneracion > 0 ? "Si" : "No"
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
            console.log(newDatas);
            // Ajustar el identificador único
            setIdUnique(data.length);
         }
      }
   }, [data, paises, entidades, instituciones]);
   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoRelacion: 1,
      Id_TipoInstitucion: 0,
      NombreInstitucion: "",
      RfcInstitucion: "",
      EsEnMexico: 1,
      PuestoRol: "",
      FechaInicioParticipacion: "",
      RecibeRemuneracion: 1,
      MontoMensual: "",
      Id_MonedaMontoMensual: 0,
      Id_PaisUbicacion: 0,
      Id_EntidadFederativa: 0,
      Aclaraciones: ""
   };
   const validationSchema = Yup.object().shape({
      Id_TipoRelacion: Yup.number().min(1, "El tipo de relación es requerido").required("El tipo de relación es requerido"),
      Id_TipoInstitucion: Yup.number().min(1, "El tipo de institución es requerido").required("El tipo de institución es requerido"),
      NombreInstitucion: Yup.string().required("El nombre de la empresa o asociación es requerido"),
      RfcInstitucion: Yup.string().required("El RFC de la institución es requerido"),
      EsEnMexico: Yup.number().oneOf([0, 1], "El valor debe ser 0 o 1").required("EsEnMexico es requerido"),
      PuestoRol: Yup.string().required("El puesto o rol es requerido"),
      FechaInicioParticipacion: Yup.date().required("La fecha de inicio de participación es requerida"),
      RecibeRemuneracion: Yup.number().oneOf([0, 1], "El valor debe ser 0 o 1").required("RecibeRemuneracion es requerido"),
      MontoMensual: renumeracion && Yup.number().required("El monto mensual es requerido").min(0, "El monto mensual debe ser al menos 0"),
      Id_PaisUbicacion: !mexico && Yup.number().min(1, "El país de ubicación es requerido").required("El país de ubicación es requerido"),
      Id_EntidadFederativa: mexico && Yup.number().min(1, "La entidad federativa es requerida").required("La entidad federativa es requerida")
   });

   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const deleteRow = (row) => {
      // dispatch(deleteDatosDependiente({ id: row.id }));
      setDatas(datas.filter((item) => item.identificador != row.id));
      console.log(datas.filter((item) => item.identificador != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   const submit = async (values, { resetForm }) => {
      formik.current.resetForm();

      Success("se agrego a la tabla");
      values.identificador = idUnique;

      setDatas(datas.concat(values));
      // dispatch(addDatosDependiente(values));
      adDataTable(values);
   };
   const adDataTable = (values) => {
      const newDatasVisuales = [
         ...datasTable,
         {
            id: values.identificador,
            NombreInstitucion: values.NombreInstitucion,
            RfcInstitucion: values.RfcInstitucion,
            FechaInicioParticipacion: values.FechaInicioParticipacion,
            "Recibe remuneración": values.RecibeRemuneracion > 0 ? "Si" : "No"
         }
      ];
      setDatasTable(newDatasVisuales);
      setIdUnique(idUnique + 1);
      setRenalize(reinilaize + 1);
   };
   const handleRenumeracion = (name, value) => {
      setRenumeracion(value == 1 ? true : false);
   };
   const handleMexico = (name, value) => {
      setMexico(value == 1 ? true : false);
   };
   const sendDatas = async () => {
      const newDatas = [...datas];
      console.log("enviado", newDatas);
      const url = `tomadecisiones/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
      // console.log(newDatas,url);
      if (newDatas.length > 0) {
         try {
            const sendApi = async () => {
               for (let i = 0; i < newDatas.length; i++) {
                  //   dispatch(addDatosDependiente(newDatas[i]));
                  // delete newDatas[i].identificador;
               }
               const response = await PostAxios(url, newDatas);
               next();
               // localStorage.setItem("id_Intereses", response.data.result);
               Success(response.data.message);
               setDatasTable([]);
               setDatas([]);
            };
            await sendApi();

            // dispatch(clearData());
            // setDatasTable([]);
            // next();
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
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/2/1/${parseInt(localStorage.getItem("Id_User"))}`);
            Success("Continuemos llenando los formularios");
            setDatasTable([]);
            next();
         } catch (error) {
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
                  headers={["Nombre de Empresa	", "RFC", "Fecha Inicio", "Recibe remuneración"]}
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
               previousButton
               handlePrevious={previous}
               ref={formik}
               button
               initialValues={initialValues}
               validationSchema={validationSchema}
               submit={submit}
            >
               <CustomRadio col={12} title={``} name={`Id_TipoRelacion`} options={tipoRelaciones} />
               <AutoComplete col={6} name={"Id_TipoInstitucion"} label={`Tipo de institución`} options={instituciones} />
               <Text col={6} name={`NombreInstitucion`} label={`Nombre de la institucion`} />
               <Text col={6} name={`RfcInstitucion`} label={`RFC`} />
               <Text col={6} name={`PuestoRol`} label={`Puesto/Rol`} />
               <DatePickerComponentV2 name={"FechaInicioParticipacion"} label={`Fecha de inicio de participación dentro de la institución`} format={"DD/MM/YYYY"} />
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
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatas}>
               {update ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
