import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/InitialValues";
import { Request } from "../../Reusables/request/Request";
import DataTable from "../../Reusables/table/DataTable";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { addInversionesCuentasValores } from "../../../redux/InversionesCuentasValoresHoja13/InversionesCuentasValores";
import { Post } from "../funciones/post";
import { Axios } from "../../../services/services";

export const InversionesCuentasValores = ({ loading, data, next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.InversionesCuentasValores.initialState);
   const validations = useSelector((state) => state.InversionesCuentasValores.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const { titular, tipoinversion, monedas } = Request({ peticiones: ["titular", "tipoinversion", "monedas"] });
   const formik = useRef(null);
   const [checked, setChecked] = useState(true);
   const [update, setUpdate] = useState(loading);

   const dispatch = useDispatch();
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const submit = async (values, { resetForm }) => {
      values.indentificador = idUnique;
      setDatas(datas.concat(values));
      setDatasTable(
         datasTable.concat({
            identificador: values.indentificador,
            tipoinversion: tipoinversion.filter((item) => item.id === values.Id_TipoInversion)[0]?.text,
            titular: titular.filter((item) => item.id === values.Id_Titular)[0]?.text,
            InstitucionRazonSocial: values.InstitucionRazonSocial
         })
      );

      setIdUnique(idUnique + 1);
      Success("Se agrego a la tabla");

      formik.current.resetForm();
   };
   useEffect(() => {
      if (tipoinversion.length > 0 && titular.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            setDatas([]);
            setDatasTable([]);
            // setUpdate(true);
            data.forEach((values, index) => {
            
               delete values.Id_InversionesCuentasValores;
               addDataTableModified(values, index);
            });
         }
      }
   }, [data, tipoinversion, titular]);
   const addDataTableModified = (values, index) => {
      values.identificador = index;
      const newDatas = [...datas, values];

      const newData = {
         identificador: index,
         tipoinversion: tipoinversion.filter((item) => item.id === parseInt(values.Id_TipoInversion))[0]?.text,
         titular: titular.filter((item) => item.id === parseInt(values.Id_Titular))[0]?.text,
         InstitucionRazonSocial: values.InstitucionRazonSocial
      };

      setDatasTable((prevDatasTable) => prevDatasTable.concat(newData));
      setDatas((prevDatas) => prevDatas.concat(newDatas));

      setIdUnique(index + 1);
   };
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDatasTable(datasTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };
   const sendData = async () => {
      if (datas.length > 0) {
         const newDatas = [...datas];
         const url = `inversionescuentas/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;

         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               // dispatch(addInversionesCuentasValores(newDatas[i]));
            }
            // console.log("data enviada",newDatas);
            await Post(url, newDatas, next);
         };
         await sendApi();
         // setDatas([]);
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${13}/1`);
            Success(response.data.data.message);

            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.InversionesCuentasValores.validationSchema), useSelector((state) => state.InversionesCuentasValores.initialState)]);

   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  // loading={loading && datas.length > 0}
                  dataHidden={["identificador"]}
                  headers={["Tipo de Inversion / Activo", "Titular", "Institución/ Razon social"]}
                  data={datasTable}
                  handleDelete={deleteRow}
                  deleteButton={true}
               />
            </Card>
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando inversiones cuentas y valores?" : "¿Tiene inversiones cuentas y valores?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm  ref={formik} initialValues={dataForm} validationSchema={validationSchema} title={title} submit={submit}>
               <InitialValues titular={titular} tipoinversion={tipoinversion} monedas={monedas} />
               <Button onClick={previous} sx={{ marginTop: "1rem", marginRight: "1rem" }} type="button" variant="text" color="inherit">
                  Regresar a la pagina anterior
               </Button>
               <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained" color="primary">
                  Agregar a la tabla
               </Button>
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button onClick={sendData} sx={{ marginTop: "1rem", marginLeft: "1rem" }} type="submit" variant="contained" color="primary">
               {/* {datas.length > 0 ? "Registrar y continuar" : "Continuar"} */}
               {loading ? "Actualizar y Continuar" : datas.length > 0 ? "Registrar y Continuar" : "Continuar"}

            </Button>
         </Ngif>
      </>
   );
};
