import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";
import * as Yup from "yup";
import { Request } from "../../../Reusables/request/Request";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Error, Success } from "../../../../toasts/toast";
import DataTable from "../../../Reusables/table/DataTable";
import { Axios, PostAxios } from "../../../../services/services";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import Loading from "../../../Reusables/loading/Loading";
export const Fideocomisos = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(false);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(Array.isArray(data) && data.length > 0);
   const [mexico, setMexico] = useState(true);
   const formik = useRef(null);
   const [loadData, setLoadData] = useState(data);
   const [loadings, setLoadings] = useState(false);

   const { tipoParticipacion, sectores, tipoPersona, tipoFideocomisos } = Request({
      peticiones: ["tipoParticipacion", "sectores", "tipoPersona", "tipoFideocomisos"]
   });
   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoFideicomiso: 0,
      Id_TipoRelacion: 0,
      Id_TipoParticipacion: 0,
      RfcFideicomiso: "",
      Id_TipoPersonaFideicomitente: 0,
      NombreRazonSocialFideicomitente: "",
      RfcFideicomitente: "",
      NombreRazonSocialFiduciario: "",
      RfcFiduciario: "",
      Id_TipoPersonaFideicomisario: 0,
      NombreRazonSocialFideicomisario: "",
      RfcFideicomisario: "",
      EsEnMexico: 0,
      Id_Sector: 0,
      Aclaraciones: ""
   };
   const validationSchema = Yup.object().shape({
      Id_TipoPersonaFideicomisario: Yup.number()
         .min(1, "El tipo de persona de fidecomisario es requerido")
         .required("El tipo de persona de fidecomisario es requerido"),
      Id_TipoRelacion: Yup.number().min(1, "El tipo de relación es requerida").required("El tipo de relación es requerida"),
      Id_TipoFideicomiso: Yup.number().min(1, "El tipo de fideocomiso es requerido").required("El tipo de fideocomiso es requerido"),
      Id_TipoParticipacion: Yup.number().min(1, "El tipo de participación es requerido").required("El tipo de participación es requerido"),
      RfcFideicomiso: Yup.string()
         .required("El RFC es requerido")
         .min(3, "El RFC de empresa debe tener al menos 3 caracteres")
         .max(9, "El RFC de empresa debe tener  menos de 9 caracteres"),
      Id_TipoPersonaFideicomitente: Yup.number().min(1, "El tipo del fideicomitente es requerido").required("El tipo del fideicomitente es requerido"),
      NombreRazonSocialFideicomitente: Yup.string().required("Nombre social del fidecomitente es requerido"),
      RfcFideicomitente: Yup.string()
         .required("El RFC es requerido")
         .min(3, "El RFC de empresa debe tener al menos 3 caracteres")
         .max(9, "El RFC de empresa debe tener  menos de 9 caracteres"),
      RfcFiduciario: Yup.string()
         .required("El RFC es requerido")
         .min(3, "El RFC de empresa debe tener al menos 3 caracteres")
         .max(9, "El RFC de empresa debe tener  menos de 9 caracteres"),
      RfcFideicomisario: Yup.string()
         .required("El RFC es requerido")
         .min(3, "El RFC de empresa debe tener al menos 3 caracteres")
         .max(9, "El RFC de empresa debe tener  menos de 9 caracteres"),
      NombreRazonSocialFiduciario: Yup.string().required("Nombre de razon social de fiducario es requerido"),
      NombreRazonSocialFideicomisario: Yup.string().required("Nombre de razon social de fide comisario es requerido"),
      Id_Sector: Yup.number().min(1, "El tipo de sector es requerido").required("El tipo de sector es requerido"),
      EsEnMexico: Yup.number().oneOf([0, 1], "El valor debe ser 0 o 1").required("EsEnMexico es requerido")
      // RecibeRemuneracion: Yup.number().min(0, 'El
   });
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (tipoParticipacion.length > 0 && sectores.length > 0 && tipoPersona.length > 0 && tipoFideocomisos.length > 0) {
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
                  "Tipo de Fideicomiso": tipoFideocomisos.find((item) => item.id === parseInt(values.Id_TipoFideicomiso))?.text,
                  "Nombre o Razón Social": values.NombreRazonSocialFideicomitente,
                  "Sector al que Pertenece": sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text,
                  "Donde se Localiza": values.EsEnMexico == 1 ? "En méxico" : "En el extranjero"
               };
               setIdUnique(idUnique + 1);

               // Añadir datos a los arrays temporales
               newDatas.push(values);
               newDatasTable.push(newData);
            });

            // Actualizar el estado con los nuevos datos
            setDatas(newDatas);
            setDatasTable(newDatasTable);
            setLoadings(false);

            // Ajustar el identificador único
            setIdUnique(data.length);
         }
      }
   }, [data, tipoParticipacion, sectores, tipoPersona, tipoFideocomisos]);

   const submit = async (values, { resetForm }) => {
      formik.current.resetForm();
      setChecked(false);

      Success("se agrego a la tabla");
      values.identificador = idUnique;

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
            "Tipo de Fideicomiso": tipoFideocomisos.find((item) => item.id === parseInt(values.Id_TipoFideicomiso))?.text,
            "Nombre o Razón Social": values.NombreRazonSocialFideicomitente,
            "Sector al que Pertenece": sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text,
            "Donde se Localiza": values.EsEnMexico == 1 ? "En méxico" : "En el extranjero"
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
      const url = `fideocomisos/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
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
               Error(error.response.data.message);
            } else {
               Error("Ocurrio un error");
            }
            // dispatch(clearData());
            // setDatasTable([]);
         }
      } else {
         try {
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/7/1/${parseInt(localStorage.getItem("Id_User"))}`);
            Success("Continuemos llenando los formularios");
            setDatasTable([]);
            next();
         } catch (error) {

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
               {loadings && <Loading />}

               <DataTable
                  headers={["Tipo de Fideicomiso", "Nombre o Razón Social", "Sector al que Pertenece", "Donde se Localiza"]}
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
               label={datasTable.length > 0 ? "¿Deseas seguir agregando fideocomisos?" : "¿Tiene fideocomisos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm
               maxHeight={"250px"}
               validationSchema={validationSchema}
               messageButton="Agregar a la tabla"
               previousButton
               handlePrevious={previous}
               ref={formik}
               initialValues={initialValues}
               submit={submit}
               button
            >
               <CustomRadio col={12} name={"Id_TipoRelacion"} label={""} options={tipoRelaciones} />
               <AutoComplete col={12} name={"Id_TipoFideicomiso"} label={`Tipo de fideicomiso`} options={tipoFideocomisos} />
               <AutoComplete col={12} name={"Id_TipoParticipacion"} label={"Tipo de participación"} options={tipoParticipacion} />
               <Text col={12} name={"RfcFideicomiso"} label={"RFC del fideicomiso"} />
               <AutoComplete col={12} name={"Id_TipoPersonaFideicomitente"} label={"Fide del comitente"} options={tipoPersona} />
               <Text col={12} name={"NombreRazonSocialFideicomitente"} label={"Nombre o Razón Social del fideicomitente"} />
               <Text col={12} name={"RfcFideicomitente"} label={"RFC"} />
               <Text col={12} name={"NombreRazonSocialFiduciario"} label={"Nombre o Razón Social del fiduciario"} />
               <Text col={12} name={"RfcFiduciario"} label={"RFC"} />
               <AutoComplete col={12} name={"Id_TipoPersonaFideicomisario"} label={"Fide del comisario"} options={tipoPersona} />
               <Text col={12} name={"NombreRazonSocialFideicomisario"} label={"Nombre o Razón Social del fideicomisario"} />
               <Text col={12} name={"RfcFideicomisario"} label={"RFC"} />
               <AutoComplete col={12} name={"Id_Sector"} label={"Sector productivo al que pertenece"} options={sectores} />
               <AutoComplete
                  col={12}
                  name={"EsEnMexico"}
                  label={"Donde se localiza el fideicomiso?"}
                  options={[
                     { id: 1, text: "En méxico" },
                     { id: 0, text: "En el extranjero" }
                  ]}
               />
               <Text col={12} name={"Aclaraciones"} label={"Aclaraciones/Observaciones"} rows={10} />
            </FormikForm>
         </Ngif>

         <Ngif condition={!checked}>
            <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
               Regresar a la pagina anterior
            </Button>
            <Box position={"relative"} width={"100%"} mb={"1rem"} padding={" 1.2rem"}>
               <Button
                  sx={{
                     ml: 2,
                     marginLeft: "1rem",
                     position: "absolute",

                     top: -34,
                     bottom: 38,
                     right: 0,
                     marginRight: "1rem"
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={sendDatas}
               >
                  {update ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
               </Button>
            </Box>
         </Ngif>
      </>
   );
};
