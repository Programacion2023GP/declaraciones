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
export const BeneficiosPrivados = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(loading);
   const [mexico, setMexico] = useState(true);

   const formik = useRef(null);
   const {tipoBeneficios,relacion,tipoPersona,formaRecepcion,monedas,sectores} = Request({peticiones:['tipoBeneficios','relacion','tipoPersona','formaRecepcion','monedas','sectores']})
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoBeneficio: 0,
      Id_BeneficiarioPrograma: 0,
      Id_TipoPersona: 0,
      NombreRazonSocial: "",
      RfcCliente: "",
      Id_FormaRecepcion:0,
      Id_Sector: 0,
      EspecifiqueBeneficio:"",
      MontoMensualAproximado: 0,
      Id_MontoMensualAproximado: 0,
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
            "Nombre empresa o servicio": values.NombreRazonSocial,
            "Cliente Principal": tipoPersona.find((item) => item.id === parseInt(values.Id_TipoPersona))?.text,
            "Monto Mensual": values.MontoMensualAproximado,
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
      const url = `beneficiosprivados/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
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
            const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/6/1/${parseInt(localStorage.getItem("Id_User"))}`);
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
             <AutoComplete col={12}  name={`Id_TipoBeneficio`} label={`Tipo de Beneficio`} options={tipoBeneficios} />
             <AutoComplete col={12}  name={`Id_BeneficiarioPrograma`} label={`Beneficiario`} options={relacion} />
             <AutoComplete col={12}  name={`Id_TipoPersona`} label={`Otorgante`} options={tipoPersona} />
             <Text col={12} name={`NombreRazonSocial`} label={`Nombre o Razón Social del otorgante`}  />
             <Text col={12} name={`RfcCliente`} label={`RFC`}  />
             <AutoComplete col={12}  name={`Id_FormaRecepcion`} label={`Forma Recepción del Beneficio`} options={formaRecepcion} />
             <Text col={12} name={'EspecifiqueBeneficio'} label={'Especifique el Beneficio'}  />
             <Text col={12} name={`MontoMensualAproximado`} label={`Monto mensual aproximado del Beneficio`}  />
             <AutoComplete col={12}  name={`Id_MontoMensualAproximado`} label={'Tipo de Moneda'} options={monedas} />
             <AutoComplete col={12}  name={'Id_Sector'} label={'Sector Productivo al que pertenece'} options={sectores} />
             <Text col={12} name={`Aclaraciones`} label={`Aclaraciones/Observaciones
`}  rows={10}/>
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
