import { useSelector } from "react-redux";
import { FormikInitialValues } from "./components/FormikInitialValues";
import { FormikIngresosNetos } from "./formik/FormikIngresosNetos";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const IngresosNetos = ({ next, previous, title }) => {
   const dataForm = useSelector((state) => state.IngresosNetos.initialState);
   const validations = useSelector((state) => state.IngresosNetos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));

   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DependientesEconomicos.validationSchema)]);
   return (
      <>
         <FormikIngresosNetos initialValues={dataForm} validationSchema={validationSchema} title={title}>
            <FormikInitialValues />
         </FormikIngresosNetos>
      </>
   );
};
