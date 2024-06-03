import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Request } from "../../Reusables/request/Request";
import { useSelector } from "react-redux";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/initialValues";
import { Post } from "../funciones/post";
import { insertFormik } from "../../FuncionesFormik";
export const DatosCurriculares = ({ data, next, previous, title }) => {
   let { declaracion } = useParams();
   const dataForm = useSelector((state) => state.DatosCurriculares.initialState);
   const validations = useSelector((state) => state.DatosCurriculares.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [id, setID] = useState(0);

   const sumbit = async (values, { setSubmitting }) => {
      const url = `datoscurriculares/${id > 0 ? `update/${id}` : "create"}`;

      values.EsEnMexico = parseInt(values.EsEnMexico);
      Post(url, values, next);
   };
   const formik = useRef(null);
   const { nivelEstudios, estatus, documentosObtenidos } = Request({ peticiones: ["nivelEstudios", "estatus", "documentosObtenidos"] });
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosGenerales.initialState), useSelector((state) => state.DatosGenerales.validationSchema)]);
   useEffect(() => {
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDatosCurriculares();
      }
   }, [data]);
   const modifiedDatosCurriculares = () => {

      setID(parseInt(data.Id_DatosCurriculares));
      insertFormik(formik, data);
   };
   return (
      <FormikForm
         ref={formik}
         previousButton={true}
         handlePrevious={previous}
         button={true}
         submit={sumbit}
         initialValues={dataForm}
         validationSchema={validationSchema}
         title={title}
         message={"Capture su ultimo grado de estudios."}
      >
         <InitialValues nivelEstudios={nivelEstudios} estatus={estatus} documentosObtenidos={documentosObtenidos} />
      </FormikForm>
   );
};
