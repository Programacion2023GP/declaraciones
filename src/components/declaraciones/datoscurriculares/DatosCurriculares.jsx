import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Request } from "../../Reusables/request/Request";
import { useSelector } from "react-redux";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/initialValues";
import { Post } from "../funciones/post";
export const DatosCurriculares = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const dataForm = useSelector((state) => state.DatosCurriculares.initialState);
   const validations = useSelector((state) => state.DatosCurriculares.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const sumbit = async (values, { setSubmitting }) => {
      values.EsEnMexico = parseInt(values.EsEnMexico);
      Post("/datoscurriculares/create", values, next());
   };
   const { nivelEstudios, estatus, documentosObtenidos } = Request({peticiones:["nivelEstudios","estatus","documentosObtenidos"]});
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosGenerales.initialState), useSelector((state) => state.DatosGenerales.validationSchema)]);

   return (
      <FormikForm
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
