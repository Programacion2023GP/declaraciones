import { useDispatch, useSelector } from "react-redux";
import { FormikInitialValues } from "./components/FormikInitialValues";
import { FormikIngresosNetos } from "./formik/FormikIngresosNetos";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { addDatosDependientesEconomicos } from "../../../redux/IngresosNetosHoja8/IngresosNetosHoja8";
import { PostAxios } from "../../../services/services";

export const IngresosNetos = ({ next, previous, title }) => {
   const dataForm = useSelector((state) => state.IngresosNetos.initialState);
   const validations = useSelector((state) => state.IngresosNetos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const dispatch = useDispatch();
   const submit = async (values, { resetForm }) => {
      dispatch(addDatosDependientesEconomicos(values));
      try {
         const response = await PostAxios("/ingresos/create", values);
         next();
         Success(response.data.message);

         return response.data;
      } catch (error) {
         if (error.response?.data?.data?.message) {
            Error(error.response.data.data.message);
         } else {
            Error("Ocurrio un error");
         }
      }
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
      console.log('====================================');
      console.log("renderizado");
      console.log('====================================');
   }, [useSelector((state) => state.IngresosNetos.validationSchema), useSelector((state) => state.IngresosNetos.initialState)]);
   return (
      <>
         <FormikIngresosNetos previous={previous} initialValues={dataForm} validationSchema={validationSchema} title={title} submit={submit}>
            <FormikInitialValues />
         </FormikIngresosNetos>
      </>
   );
};
