import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Success } from "../../../toasts/toast";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { Request } from "../../Reusables/request/Request";
import { InitialValues } from "./components/InitialValues";
import { useParams } from "react-router-dom";
import { Box, Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { addAdeudosPasivos } from "../../../redux/AdeudosPasivoshoja14/AdeudosPasivosHoja14";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";

export const AdeudosPasivos = ({ title, next, previous, setSend }) => {
   const validations = useSelector((state) => state.AdeudosPasivos.validationSchema);
   const dataForm = useSelector((state) => state.AdeudosPasivos.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formik = useRef(null);
   const [checked, setChecked] = useState(true);
   const { titular, monedas, tipoAdeudos } = Request();
   const [datasTable, setDatasTable] = useState([]);

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
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDatasTable(datasTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const submit = async (values) => {
      values.indentificador = idUnique;
      setDatas(datas.concat(values));
      setDatasTable(
         datasTable.concat({
            identificador: values.indentificador,
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
      const newDatas = [...datas];
      const sendApi = async () => {
         for (let i = 0; i < newDatas.length; i++) {
            dispatch(addAdeudosPasivos(newDatas[i]));
            // delete newDatas[i].identificador;

            await Post("/adeudospasivos/create", newDatas[i]);
         }
      };
      await sendApi();

      setDatas([]);
      setDatasTable([])
      next();
   };
   return (
      <>
         <Box key={"box"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable
               dataHidden={["identificador"]}
               headers={["Nombre", "Titular del Adeudo", "No. Cuenta"]}
               data={datasTable}
               handleDelete={deleteRow}
               deleteButton={true}
            />
         </Box>

         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando adeudos/pasivos?" : "¿Tiene adeudos/pasivos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm initialValues={dataForm} validationSchema={validationSchema} submit={submit} title={title} advertence={message} ref={formik}>
               <InitialValues titular={titular} monedas={monedas} tipoAdeudos={tipoAdeudos} />
               <Button onClick={previous} sx={{ marginTop: "1rem", marginRight: "1rem" }} type="button" variant="contained" color="secondary">
                  Regresar
               </Button>
               <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained" color="primary">
                  Agregar a la tabla
               </Button>
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button onClick={sendData} sx={{ marginTop: "1rem", marginLeft: "1rem" }} type="submit" variant="contained" color="primary">
               {datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
