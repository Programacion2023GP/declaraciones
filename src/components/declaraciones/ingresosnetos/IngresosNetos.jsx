import { useDispatch, useSelector } from "react-redux";
import { FormikInitialValues } from "./components/FormikInitialValues";
import { FormikIngresosNetos } from "./formik/FormikIngresosNetos";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { addIngresosNetos } from "../../../redux/IngresosNetosHoja8/IngresosNetosHoja8";
import { PostAxios } from "../../../services/services";
import { Post } from "../funciones/post";
import { insertFormik } from "../../FuncionesFormik";
import { FormikForm } from "../../Reusables/formik/FormikForm";

export const IngresosNetos = ({ data, next, previous, title }) => {
   const formik = useRef();
   const dataForm = useSelector((state) => state.IngresosNetos.initialState);
   const validations = useSelector((state) => state.IngresosNetos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const dispatch = useDispatch();
   const [id, setID] = useState(0);

   const submit = async (values, { resetForm }) => {
      dispatch(addIngresosNetos(values));
      const url = `ingresos/${id > 0 ? `update/${id}` :"create"}`;

      try {
         const response = await Post(url, values, next);
         // next();
         // Success(response.data.message);

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
      console.log(data);
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDataIngresos();
      }
   }, [data]);
   const modifiedDataIngresos = () => {
      setID(parseInt(data.Id_Ingresos));
      delete data.Id_Ingresos;
      insertFormik(formik, data);
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.IngresosNetos.validationSchema), useSelector((state) => state.IngresosNetos.initialState)]);
   return (
      <>
         <FormikForm button={true} ref={formik} previous={previous} initialValues={dataForm} validationSchema={validationSchema} title={title} submit={submit}>
            <FormikInitialValues />
         </FormikForm>
      </>
   );
};
