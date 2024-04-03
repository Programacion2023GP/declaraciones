import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { FormikDependientes } from "./components/FormikDependientes";
import { Box, Card } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { InitialValuesFormik } from "./components/InitialValuesFormik";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { DomicilioDeclarante } from "./components/DomicilioDeclarante";
import { Sectores } from "./components/Sectores";

export const DependientesEconomicos = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const [save, setSave] = useState(true);
   const [idRow, setIdRow] = useState(null);
   const dataForm = useSelector((state) => state.DependientesEconomicos.initialState);
   const validations = useSelector((state) => state.DependientesEconomicos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [domicilioDeclarante, setDomicilioDeclarante] = useState(false);
   const submit = async (values, { resetForm }) => {
      console.warn("dataform", values);
   };
   const handleGetValue = (name, value) => {
      if (name == "HabitaDomicilioDeclarante") {
         setDomicilioDeclarante(value == 0 ? true : false);
      }
   };
   useEffect(() => {}, [useSelector((state) => state.DependientesEconomicos.validationSchema)]);
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            {/* <DataTable headers={["id", "nombre"]} /> */}
         </Box>
         <FormikDependientes initialValues={dataForm} validationSchema={validationSchema} submit={submit} title={title}>
            <InitialValuesFormik handleGetValue={handleGetValue} />
            <Ngif condition={domicilioDeclarante}>
               <DomicilioDeclarante />
            </Ngif>
            <Sectores />
         </FormikDependientes>
      </>
   );
};
