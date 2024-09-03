import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Success } from "../../../toasts/toast";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { Request } from "../../Reusables/request/Request";
import { InitialValues } from "./components/InitialValues";
import { useParams } from "react-router-dom";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { addAdeudosPasivos } from "../../../redux/AdeudosPasivoshoja14/AdeudosPasivosHoja14";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";
import { Axios } from "../../../services/services";
import Loading from "../../Reusables/loading/Loading";

export const AdeudosPasivos = ({ loading, data, title, next, previous, setSend }) => {
   const validations = useSelector((state) => state.AdeudosPasivos.validationSchema);
   const dataForm = useSelector((state) => state.AdeudosPasivos.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formik = useRef(null);
   const [checked, setChecked] = useState(false);
   const { titular, monedas, tipoAdeudos } = Request({ peticiones: ["titular", "monedas", "tipoAdeudos"] });
   const [datasTable, setDatasTable] = useState([]);
   const [update, setUpdate] = useState(loading);
   const [loadData, setLoadData] = useState(data);
   const [loadings, setLoadings] = useState(false);

   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const message =
      declaracion == 1 || declaracion == 3
         ? "Reportar la situación de adeudos/pasivos a la fecha de ingreso al empleo cargo o comisión"
         : declaracion == 2 || declaracion == 4
           ? "Reportar la situación de adeudos/pasivos del año inmediato anterior"
           : declaracion == 5 || declaracion == 6
             ? "Reportar la situación de adeudos/pasivos a la fecha de conclusión del empleo,cargo o comisión"
             : "";

   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.AdeudosPasivos.validationSchema), useSelector((state) => state.AdeudosPasivos.initialState)]);
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.id));
      setDatasTable(datasTable.filter((element) => element.id != row.id));
      Success("Se borro de la tabla");
   };
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (titular.length > 0) {
         if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
            let newDatasArray = [];
            let newDataTableArray = [];

            loadData.forEach((values, index) => {
               delete values.Id_AdeudosPasivos;
               const { newSendData, newData } = addDataTableModified(values, index);
               newDatasArray.push(newSendData);
               newDataTableArray.push(newData);
            });

            setDatas(newDatasArray);
            setDatasTable(newDataTableArray);
            setLoadings(false);
         }
      }
   }, [data, titular]);

   const addDataTableModified = (values, index) => {
      const valuesCopy = { ...values, identificador: index };

      const newData = {
         id: index,
         nombre: values.OC_NombreRazonSocial,
         titular: titular.find((item) => item.id === parseInt(values.Id_Titular))?.text,
         NumeroCuentaContrato: values.NumeroCuentaContrato
      };
      setIdUnique(index + 1);

      return { newSendData: valuesCopy, newData };
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const submit = async (values) => {
      values.identificador = idUnique;
      setDatas(datas.concat(values));
      setDatasTable(
         datasTable.concat({
            id: values.identificador,
            nombre: values.OC_NombreRazonSocial,
            titular: titular.filter((item) => item.id === values.Id_Titular)[0]?.text,
            NumeroCuentaContrato: values.NumeroCuentaContrato
         })
      );

      setIdUnique(idUnique + 1);
      Success("Se agrego a la tabla");

      formik.current.resetForm();
   };
   const sendData = async () => {
      const url = `adeudospasivos/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;

      if (datas.length > 0) {
         const newDatas = [...datas];
         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               dispatch(addAdeudosPasivos(newDatas[i]));
               // delete newDatas[i].identificador;
            }
            await Post(url, newDatas, next);
         };
         await sendApi();

         setDatas([]);
         setDatasTable([]);
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${14}/1`);
            Success(response.data.data.message);

            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               {loadings && <Loading />}

               <DataTable
                  // loading={loading && datas.length > 0}
                  dataHidden={["id"]}
                  headers={["Nombre", "Titular del Adeudo", "No. Cuenta"]}
                  data={datasTable}
                  handleDelete={deleteRow}
                  deleteButton={true}
               />
            </Card>
         </Box>

         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando adeudos/pasivos?" : "¿Tiene adeudos/pasivos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm initialValues={dataForm} validationSchema={validationSchema} submit={submit} title={title} ref={formik}>
               <InitialValues titular={titular} monedas={monedas} tipoAdeudos={tipoAdeudos} />
               <Button onClick={previous} sx={{ marginTop: "1rem", marginRight: "1rem" }} type="button" variant="text" color="inherit">
                  Regresar a la pagina anterior
               </Button>
               <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained" color="primary">
                  Agregar a la tabla
               </Button>
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
               Regresar a la pagina anterior
            </Button>
            <Button onClick={sendData} sx={{ marginTop: "1rem", marginLeft: "1rem" }} type="submit" variant="contained" color="primary">
               {/* {datas.length > 0 ? "Registrar y Continuar" : "Continuar"} */}
               {loading ? "Actualizar y Continuar" : datas.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
