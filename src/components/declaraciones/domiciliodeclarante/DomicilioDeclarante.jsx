import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import { DomicilioDeclaranteGeneral } from "./components/DomicilioDeclarante";
import { Post } from "../funciones/post";
import { Text } from "../../Reusables/input/Input";
import { insertFormik } from "../../FuncionesFormik";
export const DomicilioDeclarante = ({ loading, data, next, previous, title }) => {
   const dataForm = useSelector((state) => state.DomicilioDeclarante.initialState);
   const validations = useSelector((state) => state.DomicilioDeclarante.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const formik = useRef(null);
   const [id, setID] = useState(0);
   const [mexico, setMexico] = useState(true);
   const dispatch = useDispatch();
   const sumbit = async (values, { setSubmitting }) => {
      const url = `domiciliodeclarante/${id > 0 ? `update/${id}` : "create"}`;

      values.EsEnMexico = parseInt(values.EsEnMexico);

      Post(url, values, next);
   };

   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DomicilioDeclarante.initialState), useSelector((state) => state.DomicilioDeclarante.validationSchema)]);

   useEffect(() => {
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDatosDeclarante();
      }
   }, [data]);
   const modifiedDatosDeclarante = () => {
      parseInt(data.EsEnMexico) == 0 && setMexico(false);
      if (loading) {
         setID(parseInt(data.Id_DomicilioDeclarante));
      }
      insertFormik(formik, data);
   
   };
   return (
      <>
         <FormikForm
            ref={formik}
            previousButton={true}
            handlePrevious={previous}
            initialValues={dataForm}
            validationSchema={validationSchema}
            button={true}
            title={title}
            messageButton={loading ? "Actualizar y continuar" : "Registrar y continuar"}
            submit={sumbit}
            message={"Los datos que no serán públicos estarán resaltados de color verde"}
         >
            <DomicilioDeclaranteGeneral mex={mexico} estado={data && parseInt(data.Id_EntidadFederativa) > 0 ? data.Id_EntidadFederativa : 0} CodigoPostal ={data && data.CodigoPostal} />
            <br />
            <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />
         </FormikForm>
      </>
   );
};
