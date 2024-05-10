import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/InitialValues";
import { Request } from "../../Reusables/request/Request";
import DataTable from "../../Reusables/table/DataTable";
import { Box, Button } from "@mui/material";
import { Success } from "../../../toasts/toast";

export const InversionesCuentasValores = ({ next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.InversionesCuentasValores.initialState);
   const validations = useSelector((state) => state.InversionesCuentasValores.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const { titular, tipoinversion, monedas } = Request();
   const formik = useRef(null);

   const submit = async (values, { resetForm }) => {
      values.indentificador = idUnique;
      setDatas(datas.concat(values));
      console.log("aqui");
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
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDatasTable(datasTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };
   const sendData = async () => {
      const newDatas = [...datas];

      const sendApi = async () => {
         for (let i = 0; i < newDatas.length; i++) {
            // dispatch(addValidacionesBienesMuebles(newDatas[i]));
            // delete newDatas[i].identificador;
            await Post("/bienesmuebles/create", newDatas[i]);
         }
      };
      await sendApi();
      setDatas([]);
      next();
      // setSend(true);

      // newDatas.forEach(element => {

      // });

      // next()
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.InversionesCuentasValores.validationSchema), useSelector((state) => state.InversionesCuentasValores.initialState)]);

   return (
      <>
         <Box key={"box"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable
               dataHidden={["identificador"]}
               headers={["Tipo de Inversion / Activo", "Titular", "Institución/ Razon social"]}
               data={datasTable}
               handleDelete={deleteRow}
               deleteButton={true}
            />
         </Box>
         <FormikForm ref={formik} initialValues={dataForm} validationSchema={validationSchema} title={title} submit={submit}>
            <InitialValues titular={titular} tipoinversion={tipoinversion} monedas={monedas} />
            <Button onClick={previous} sx={{ marginTop: "1rem", marginRight: "1rem" }} type="button" variant="contained" color="secondary">
               Regresar
            </Button>
            <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained" color="primary">
               Agregar a la tabla
            </Button>
         </FormikForm>
      </>
   );
};
