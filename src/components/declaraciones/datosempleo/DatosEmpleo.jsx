import { useEffect, useRef, useState } from "react";
import { Text } from "../../Reusables/input/Input";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { Post } from "../funciones/post";
import { ComponentStepper } from "../../Reusables/componentstepper/ComponentStepper";
import { Request } from "../../Reusables/request/Request";
import { NivelGobierno } from "./components/NiveldelGobierno";
import { InformacionEmpleo } from "./components/InformacionEmpleo";
import { DomicilioDeclarante } from "./components/DomicilioDeclarante";
import { configValidationsEmpleo } from "../../../redux/DatosEmpleoHoja4/DatosEmpleo";

export const DatosEmpleo = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const dispatch = useDispatch()
   const dataForm = useSelector((state) => state.DatosEmpleo.initialState);
   const validations = useSelector((state) => state.DatosEmpleo.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [active,setActive] =useState(false)
   const { nivelOrdenGobierno, ambitoPublico,nombreEntePublico } = Request({peticiones:["nivelOrdenGobierno","ambitoPublico","nombreEntePublico"]});
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosEmpleo.initialState), useSelector((state) => state.DatosEmpleo.validationSchema)]);
   const submit = async (values) => {
      let data = { ...values };
      data.EsEnMexico = parseInt(data.EsEnMexico);
      if (data.NivelEmpleoCargoComision == 4) {
         data.NivelEmpleoCargoComision = data.NivelEmpleoCargoComisionText;
         delete data.NivelEmpleoCargoComisionText;
      } else {
         delete data.NivelEmpleoCargoComisionText;
      }
      Post("datoscargoscomision/create", data, next);
   };




   const steps = [
      { label: "Nivel orden del gobierno",
       component: <NivelGobierno active={active} handleActive={setActive} ambitoPublico={ambitoPublico} nivelOrdenGobierno={nivelOrdenGobierno} nombreEntePublico={nombreEntePublico} /> },
      { label: "Datos empleo", component: <InformacionEmpleo /> },
      { label: "Domicilio", component: <DomicilioDeclarante /> }
   ];
   return (
      <>
         <FormikForm
            handlePrevious={previous}
            previousButton={true}
            initialValues={dataForm}
            validationSchema={validationSchema}
            title={title}
            button={false}
            submit={submit}
            message={"Los datos que no serán públicos estarán resaltados de color"}
         >
            <ComponentStepper  steps={steps} endButton={"Registrar y continuar"} buttonAfter={"Regresar"} buttonContinue={"Continuar"} />
         </FormikForm>
      </>
   );
};
