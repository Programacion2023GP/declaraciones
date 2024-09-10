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
import Loading from "../../../Reusables/loading/Loading";

export const BeneficiosPrivados = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(false);
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(Array.isArray(data) && data.length > 0);
   const [mexico, setMexico] = useState(true);
   const [loadData, setLoadData] = useState(data);
   const [loadings, setLoadings] = useState(false);

   const formik = useRef(null);
   const { tipoBeneficios, relacion, tipoPersona, formaRecepcion, monedas, sectores } = Request({
      peticiones: ["tipoBeneficios", "relacion", "tipoPersona", "formaRecepcion", "monedas", "sectores"]
   });
   const initialValues = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_TipoBeneficio: 0,
      Id_BeneficiarioPrograma: 0,
      Id_TipoPersona: 0,
      NombreRazonSocial: "",
      RfcCliente: "",
      Id_FormaRecepcion: 0,
      Id_Sector: 0,
      EspecifiqueBeneficio: "",
      MontoMensualAproximado: 0,
      Id_MontoMensualAproximado: 0,
      Aclaraciones: ""
   };
   const validationSchema = Yup.object().shape({
      Id_TipoBeneficio: Yup.number().min(1, "El tipo de beneficio es requerido").required("El tipo de beneficio es requerido"),
      Id_BeneficiarioPrograma: Yup.number().min(1, "El beneficiario de programa es requerido").required("El beneficiario de programa es requerido"),
      Id_TipoPersona: Yup.number().min(1, "El tipo de persona es requerido").required("El tipo de persona es requerido"),
      NombreRazonSocial: Yup.string().required("El nombre de la empresa o servicio es requerido"),
      RfcCliente: Yup.string()
         .required("El RFC es requerido")
         .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
         .min(10, "El RFC debe tener al menos 10 caracteres")
         .max(13, "El RFC no puede tener más de 13 caracteres"),
      Id_FormaRecepcion: Yup.number().min(1, "La forma de recepción es requerida").required("La forma de recepción es requerida"),
      Id_Sector: Yup.number().min(1, "El sector productivo es requerido").required("El sector productivo es requerido"),
      MontoMensualAproximado: Yup.number().min(0, "El monto es requerido").required("El monto es requerido"),
      Id_MontoMensualAproximado: Yup.number().min(1, "El tipo de moneda es requerida").required("El tipo de moneda es requerida")
      // RecibeRemuneracion: Yup.number().min(0, 'El
   });
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (tipoBeneficios.length > 0 && relacion.length > 0 && tipoPersona.length > 0 && formaRecepcion.length > 0 && monedas.length > 0 && sectores.length > 0) {
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
                  "Nombre empresa o servicio": values.NombreRazonSocial,
                  "Cliente Principal": tipoPersona.find((item) => item.id === parseInt(values.Id_TipoPersona))?.text,
                  "Monto Mensual": values.MontoMensualAproximado,
                  "Sector Productivo": sectores.find((item) => item.id === parseInt(values.Id_Sector))?.text
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
   }, [data, tipoBeneficios, relacion, tipoPersona, formaRecepcion, monedas, sectores]);

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
      const url = `beneficiosprivados/${update ? `update/${localStorage.getItem("id_Intereses")}` : "create"}`;
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
               <AutoComplete col={12} name={`Id_TipoBeneficio`} label={`Tipo de Beneficio`} options={tipoBeneficios} />
               <AutoComplete col={12} name={`Id_BeneficiarioPrograma`} label={`Beneficiario`} options={relacion} />
               <AutoComplete col={12} name={`Id_TipoPersona`} label={`Otorgante`} options={tipoPersona} />
               <Text col={12} name={`NombreRazonSocial`} label={`Nombre o Razón Social del otorgante`} />
               <Text col={12} name={`RfcCliente`} label={`RFC`} />
               <AutoComplete col={12} name={`Id_FormaRecepcion`} label={`Forma Recepción del Beneficio`} options={formaRecepcion} />
               <Text col={12} name={"EspecifiqueBeneficio"} label={"Especifique el Beneficio"} />
               <Text col={12} name={`MontoMensualAproximado`} label={`Monto mensual aproximado del Beneficio`} />
               <AutoComplete col={12} name={`Id_MontoMensualAproximado`} label={"Tipo de Moneda"} options={monedas} />
               <AutoComplete col={12} name={"Id_Sector"} label={"Sector Productivo al que pertenece"} options={sectores} />
               <Text
                  col={12}
                  name={`Aclaraciones`}
                  label={`Aclaraciones/Observaciones
`}
                  rows={10}
               />
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
