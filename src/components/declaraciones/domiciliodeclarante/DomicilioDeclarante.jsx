import { useEffect, useState } from "react";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { useSelector } from "react-redux";
import { DomicilioDeclaranteGeneral } from "./components/DomicilioDeclarante";
import { Post } from "../funciones/post";
import { Text } from "../../Reusables/input/Input";
export const DomicilioDeclarante = ({ next, previous, title }) => {
   const dataForm = useSelector((state) => state.DomicilioDeclarante.initialState);
   const validations = useSelector((state) => state.DomicilioDeclarante.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));

   const sumbit = async (values, { setSubmitting }) => {
     values.EsEnMexico = parseInt(values.EsEnMexico);
      Post("/domiciliodeclarante/create", values, next());
   };

   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DomicilioDeclarante.initialState), useSelector((state) => state.DomicilioDeclarante.validationSchema)]);

   return (
      <>
         <FormikForm
            previousButton={true}
            handlePrevious={previous}
            initialValues={dataForm}
            validationSchema={validationSchema}
            button={true}
            title={title}
            submit={sumbit}
            message={"Los datos que no serán públicos estarán resaltados de color verde"}
         >
            <DomicilioDeclaranteGeneral />
            <br />
            <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

         </FormikForm>
      </>
   );
};
