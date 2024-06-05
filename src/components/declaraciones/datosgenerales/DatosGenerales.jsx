import { useRef, useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { ComponentStepper } from "../../Reusables/componentstepper/ComponentStepper";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { DatosGeneral } from "./components/DatosGenerales";
import { DatosExtras } from "./components/DatosExtras";
import { Request } from "../../Reusables/request/Request";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDatosGenerales, addValidacioneServidorPublico } from "../../../redux/DatosGeneralesHoja1/DatosGenerales";
// import { PostAxios } from "../../../services/services";
// PostAxios
import { Error, Success } from "../../../toasts/toast";
import { PostAxios } from "../../../services/services";
import { insertFormik } from "../../FuncionesFormik";
export const DatosGenerales = ({ loading,data, next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.DatosGenerales.initialState);
   const validations = useSelector((state) => state.DatosGenerales.validationSchema);
   const [id, setID] = useState(0);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [active, setActive] = useState(true);
   const dispatch = useDispatch();
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const formik = useRef(null);

   useEffect(() => {
      declaracion == 2 ? dispatch(addValidacioneServidorPublico({ tipo: "servidorPublico" })) : "";
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosGenerales.initialState), useSelector((state) => state.DatosGenerales.validationSchema)]);
   useEffect(() => {
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDatosGenerales();
      }
   }, [data]);

   const modifiedDatosGenerales = () => {
      parseInt(data.Id_RegimenMatrimonial) > 0 && setActive(false);
      parseInt(data.Id_EstadoCivil) == 2 && dispatch(addValidacioneServidorPublico({ validations, tipo: "RegimenMatrimonial" }));
      setID(parseInt(data.Id_DatosGenerales));
      insertFormik(formik, data);
   };

   const submit = async (values) => {
      const url = `datosgenerales/${id > 0 ? `update/${id}` : "create"}`;
      // next()
      let data = { ...values };

      data.Id_User = parseInt(localStorage.getItem("Id_User"));
      data.Id_Plazo = parseInt(declaracion);
      dispatch(addDatosGenerales(data));
      try {
         const response = await PostAxios(url, data);
         id < 1 && localStorage.setItem("id_SituacionPatrimonial", response.data.result);
         Success(response.data.message);
         next();
         setSend(true);

         return response.data;
      } catch (error) {
         if (error.response?.data?.data?.message) {
            Error(error.response.data.message);
         } else {
            Error("Ocurrio un error");
         }
      }
   };
   const { nacionalidades, paises, estadocivil, regimenes } = Request({ peticiones: ["nacionalidades", "paises", "estadocivil", "regimenes"] });
   const steps = [
      {
         label: "Datos Generales",
         component: <DatosGeneral />
      },
      {
         label: "Datos Extras",
         component: (
            <DatosExtras
               handleActive={setActive}
               active={active}
               validaciones={validations}
               estadocivil={estadocivil}
               nacionalidades={nacionalidades}
               paises={paises}
               regimenes={regimenes}
            />
         )
      }
   ];
   return (
      <>
         <FormikForm
            ref={formik}
            initialValues={dataForm}
            validationSchema={validationSchema}
            button={false}
            title={title}
            submit={submit}
            message={"Los datos que no serán públicos estarán resaltados de color verde"}
         >
            <ComponentStepper steps={steps} endButton={"Registrar y continuar"} buttonAfter={"Regresar"} buttonContinue={"Continuar"} />
         </FormikForm>
      </>
   );
};
