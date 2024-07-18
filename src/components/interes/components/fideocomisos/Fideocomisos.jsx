import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";
import * as Yup from "yup";
import { Request } from "../../../Reusables/request/Request";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useRef, useState } from "react";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Error, Success } from "../../../../toasts/toast";
import DataTable from "../../../Reusables/table/DataTable";
import { Axios, PostAxios } from "../../../../services/services";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
export const Fideocomisos = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(loading);
   const [mexico, setMexico] = useState(true);
   const formik = useRef(null);
   const { tipoParticipacion, sectores, tipoPersona,tipoFideocomisos } = Request({
      peticiones: ["tipoParticipacion", "sectores", "tipoPersona",'tipoFideocomisos']
   });
   const tipoRelaciones = [
      { value: 1, label: "Declarante" },
      { value: 2, label: "Pareja" },
      { value: 3, label: "Dependiente económico" }
   ];
   const initialValues = {
      Id_Intereses: 0,
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
      EsEnMexico:0,
      Id_Sector: 0,
      Aclaraciones: "",
   };
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
            id: values.id,
            "Tipo de Fideicomiso": tipoFideocomisos.find((item) => item.id === parseInt(values.Id_TipoFideicomiso))?.text,
            "Nombre o Razón Social": values.NombreRazonSocialFideicomitente,
            "Sector al que Pertenece":sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text,
            "Donde se Localiza": values.EsEnMexico==1?'En méxico':'En el extranjero'
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
      const url = `fideocomisos/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
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
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/7/1/${parseInt(localStorage.getItem("Id_User"))}`);
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
      setDatas(datas.filter((item) => item.id != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
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
               label={
                  datasTable.length > 0
                     ? "¿Deseas seguir agregando fideocomisos?"
                     : "¿Tiene fideocomisos?"
               }
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm ref={formik} initialValues={initialValues} submit={submit} button>
               <CustomRadio col={12} name={"Id_TipoRelacion"} label={""} options={tipoRelaciones} />
                <AutoComplete col={12}  name={'Id_TipoFideicomiso'} label={`Tipo de fideicomiso`} options={tipoFideocomisos} />
               <AutoComplete col={12} name={"Id_TipoParticipacion"} label={"Tipo de participación"} options={tipoParticipacion} />
               <Text col={12} name={"RfcFideicomiso"} label={"RFC del fideicomiso"} />
               <AutoComplete col={12} name={"Id_TipoPersonaFideicomitente"} label={"Fideicomitente"} options={tipoPersona} />
               <Text col={12} name={"NombreRazonSocialFideicomitente"} label={"Nombre o Razón Social del fideicomitente"} />
               <Text col={12} name={"RfcFideicomitente"} label={"RFC"} />
               <Text col={12} name={"NombreRazonSocialFiduciario"} label={"Nombre o Razón Social del fiduciario"} />
               <Text col={12} name={"RfcFiduciario"} label={"RFC"} />
               <AutoComplete col={12} name={"Id_TipoPersonaFideicomisario"} label={"Fideicomisario"} options={tipoPersona} />
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
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatas}>
               {loading ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
