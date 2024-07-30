import { useEffect, useRef, useState } from "react";
import { Error, Success } from "../../../../toasts/toast";
import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Request } from "../../../Reusables/request/Request";
import { Text } from "../../../Reusables/input/Input";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DataTable from "../../../Reusables/table/DataTable";
import { Axios, PostAxios } from "../../../../services/services";

export const Clientes = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(loading);
   const [mexico, setMexico] = useState(true);

   const formik = useRef(null);
   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoRelacion: 0,
      RealizaActividadLucrativa: 0,
      NombreEmpresa: "",
      RfcEmpresa: "",
      Id_TipoPersona: 0,
      NombreRazonSocial: "",
      RfcCliente: "",
      Id_Sector: 0,
      MontoAproximadoGanancia: 0,
      Id_MontoAproximadoGanancia: 0,
      Id_PaisUbicacion: 0,
      Id_EntidadFederativa: 0,
      Aclaraciones: "",
      EsEnMexico: 1
   };
   const { tipoPersona, sectores, monedas, entidades, paises } = Request({
      peticiones: ["tipoPersona", "sectores", "monedas", "entidades", "paises"]
   });
   useEffect(() => {
      if (tipoPersona.length > 0 && monedas.length > 0 && paises.length > 0 && entidades.length > 0 && sectores.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            // Crea arrays temporales para los nuevos datos
            const newDatas = [];
            const newDatasTable = [];

            data.forEach((values, index) => {
               delete values.Id_PrestamoComodato;

               // Asignar identificador
               values.identificador = index;

               // Crear datos para datasTable
               const newData = {
                  id: values.identificador,
                  "Nombre empresa o servicio": values.NombreEmpresa,
                  "Cliente Principal": tipoPersona.find((item) => item.id === parseInt(values.Id_TipoPersona))?.text,
                  "Monto Mensual": values.MontoAproximadoGanancia,
                  "Sector Productivo": sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text
               };

               // Añadir datos a los arrays temporales
               newDatas.push(values);
               newDatasTable.push(newData);
            });

            // Actualizar el estado con los nuevos datos
            setDatas(newDatas);
            setDatasTable(newDatasTable);
            // Ajustar el identificador único
            setIdUnique(data.length);
         }
      }
   }, [data, tipoPersona, sectores, monedas, entidades, paises]);
   const submit = async (values, { resetForm }) => {
      formik.current.resetForm();

      Success("se agrego a la tabla");
      values.id = idUnique;

      setDatas(datas.concat(values));
      // dispatch(addDatosDependiente(values));
      adDataTable(values);
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const adDataTable = (values) => {
      const newDatasVisuales = [
         ...datasTable,
         {
            id: values.identificador,
            "Nombre empresa o servicio": values.NombreEmpresa,
            "Cliente Principal": tipoPersona.find((item) => item.id === parseInt(values.Id_TipoPersona))?.text,
            "Monto Mensual": values.MontoAproximadoGanancia,
            "Sector Productivo": sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text
         }
      ];
      setDatasTable(newDatasVisuales);
      setIdUnique(idUnique + 1);
      setRenalize(reinilaize + 1);
   };
   const handleMexico = (name, value) => {
      setMexico(value == 1 ? true : false);
   };
   const sendDatas = async () => {
      const newDatas = [...datas];
      const url = `clientesprincipales/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
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
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/5/1/${parseInt(localStorage.getItem("Id_User"))}`);
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
                  headers={["Nombre empresa o servicio", "Cliente Principal	", "Monto Mensual", "Sector Productivo	"]}
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
               label={
                  datasTable.length > 0
                     ? "¿Deseas seguir agregando actividades lucrativas?"
                     : "¿Realiza alguna actividad lucrativa independiente al empleo, cargo o comisión?"
               }
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm ref={formik} initialValues={initialValues} submit={submit} button>
               <CustomRadio col={12} title={``} name={`Id_TipoRelacion`} options={tipoRelaciones} />
               <Text col={12} name={"NombreEmpresa"} label={"Nombre de la empresa o servicio que proporciona"} />
               <Text col={12} name={"RfcEmpresa"} label={"RFC"} />
               <AutoComplete col={12} name={"Id_TipoPersona"} label={"Cliente principal"} options={tipoPersona} />
               <Text col={12} name={"NombreRazonSocial"} label={`Señale el nombre o la Razón Social del cliente principal`} />
               <Text col={12} name={"RfcCliente"} label={`RFC`} />
               <AutoComplete col={12} name={"Id_Sector"} label={`Sector productivo al que pertenece`} options={sectores} />
               <Text type={"number"} col={12} name={"MontoAproximadoGanancia"} label={`Monto mensual neto`} />
               <AutoComplete col={12} name={"Id_MontoAproximadoGanancia"} label={"Tipo de Moneda"} options={monedas} />
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
