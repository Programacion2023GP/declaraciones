import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { useEffect, useRef, useState } from "react";
import { Error, Success } from "../../../../toasts/toast";
import { Request } from "../../../Reusables/request/Request";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";
import { Text } from "../../../Reusables/input/Input";
import DataTable from "../../../Reusables/table/DataTable";
import { Axios, PostAxios } from "../../../../services/services";

export const Representacion = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(loading);
   const formik = useRef(null);
   const [renumeracion, setRenumeracion] = useState(true);
   const [mexico, setMexico] = useState(true);

   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const { tipoPersona, representacion, monedas, paises, entidades, sectores } = Request({
      peticiones: ["representacion", "tipoPersona", "monedas", "paises", "entidades", "sectores"]
   });
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoRelacion: 0,
      Id_TipoRepresentacion: 0,
      FechaInicioRepresentacion: "",
      Id_TipoPersona: 0,
      NombreRazonSocial: "",
      Rfc: "",
      RecibeRemuneracion: 0,
      MontoMensual: 0,
      Id_MontoMensual: 0,
      Id_PaisUbicacion: 0,
      Id_EntidadFederativa: 0,
      Id_Sector: 0,
      EsEnMexico: 1,
      Aclaraciones: ""
   };
   useEffect(() => {
      if (tipoPersona.length > 0 && representacion.length > 0 && monedas.length > 0 && paises.length > 0 && entidades.length > 0 && sectores.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            // Crea arrays temporales para los nuevos datos
            const newDatas = [];
            const newDatasTable = [];

            data.forEach((values, index) => {
               delete values.Id_PrestamoComodato;

               // Asignar identificador
               values.identificador = index;

               // Crear datos para datasTable
               console.log("Cargando ....", values);
               const newData =  {
                  id: values.identificador,
                  "Tipo Relación": tipoRelaciones.find((item) => item.value === parseInt(values.Id_TipoRelacion))?.label,
                  "Tipo de Representacion	": representacion.find((item) => item.id === parseInt(values.Id_TipoRepresentacion))?.text,
                  "Fecha Inicio": values.FechaInicioRepresentacion,
                  "Nombre o Razón Social": values.NombreRazonSocial
               };

               // Añadir datos a los arrays temporales
               newDatas.push(values);
               newDatasTable.push(newData);
            });

            // Actualizar el estado con los nuevos datos
            setDatas(newDatas);
            setDatasTable(newDatasTable);
            console.log(newDatas);
            // Ajustar el identificador único
            setIdUnique(data.length);
         }
      }
   }, [data, tipoPersona, representacion, monedas, paises, entidades, sectores]);
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
            "Tipo Relación": tipoRelaciones.find((item) => item.value === parseInt(values.Id_TipoRelacion))?.label,
            "Tipo de Representacion	": representacion.find((item) => item.id === parseInt(values.Id_TipoRepresentacion))?.text,
            "Fecha Inicio": values.FechaInicioRepresentacion,
            "Nombre o Razón Social": values.NombreRazonSocial
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
      const url = `representaciones/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
      // console.log(newDatas,url);
      if (newDatas.length > 0) {
         try {
            const sendApi = async () => {
               for (let i = 0; i < newDatas.length; i++) {
                  //   dispatch(addDatosDependiente(newDatas[i]));
                  // delete newDatas[i].identificador;
               }
               const response = await PostAxios(url, newDatas);
               // localStorage.setItem("id_Intereses", response.data.result);
               Success(response.data.message);
               setDatasTable([]);
               setDatas([]);
               next();
            };
            await sendApi();

            // dispatch(clearData());
            // setDatasTable([]);
            // next();
         } catch (error) {
            if (error.response?.data?.message) {
               console.log("ee", error);
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
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/4/1/${parseInt(localStorage.getItem("Id_User"))}`);
            Success("Continuemos llenando los formularios");
            setDatasTable([]);
            next();
         } catch (error) {
            console.log("🚀 ~ sendDatas ~ error:", error);

            Error(error.response.data.message);
         }
      }
   };
   const deleteRow = (row) => {
      // dispatch(deleteDatosDependiente({ id: row.id }));
      setDatas(datas.filter((item) => item.identificador != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  headers={["Tipo Relación	", "Tipo de Representacion	", "Fecha Inicio", "Nombre o Razón Social"]}
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
               label={datasTable.length > 0 ? "¿Deseas seguir agregando representaciones?" : "¿Tiene representaciones?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm ref={formik} initialValues={initialValues} submit={submit} button>
               <CustomRadio col={12} title={``} name={`Id_TipoRelacion`} options={tipoRelaciones} />
               <AutoComplete col={12} name={`Id_TipoRepresentacion`} label={`Tipo de representación`} options={representacion} />
               <DatePickerComponentV2 name={`FechaInicioRepresentacion`} label={`Fecha de inicio de participación dentro de la institución`} format={"DD/MM/YYYY"} />
               <AutoComplete col={12} name={"Id_TipoPersona"} label={"Representante/Representado"} options={tipoPersona} />
               <Text col={12} name={"NombreRazonSocial"} label={`Nombre o Razón Social del Representante/Representado`} />
               <Text col={12} name={"Rfc"} label={`RFC`} />
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
                  <Text col={12} name={`MontoMensual`} label={`Monto mensual neto de su representación`} type={"number"} />
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
               <AutoComplete col={12} name={"Id_Sector"} label={"Sector productivo al que pertenece"} options={sectores} />
               <Text col={12} name={"Aclaraciones"} label={"Aclaraciones/Observaciones"} rows={10} />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatas}>
               {loading ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
