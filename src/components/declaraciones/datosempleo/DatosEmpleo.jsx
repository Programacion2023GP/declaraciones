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
import { insertFormik } from "../../FuncionesFormik";
import { isNumber } from "highcharts";

export const DatosEmpleo = ({ loading, data, next, previous, title }) => {
   let { declaracion } = useParams();
   const [id, setID] = useState(0);

   const dispatch = useDispatch();
   const formik = useRef();
   const dataForm = useSelector((state) => state.DatosEmpleo.initialState);
   const validations = useSelector((state) => state.DatosEmpleo.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [active, setActive] = useState(false);
   const { nivelOrdenGobierno, ambitoPublico, nombreEntePublico } = Request({ peticiones: ["nivelOrdenGobierno", "ambitoPublico", "nombreEntePublico"] });
   const [mexico, setMexico] = useState(true);
   const [idEntidad, setIdEntidad] = useState(0);
   const [activeState, setActiveState] = useState(true);

   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosEmpleo.initialState), useSelector((state) => state.DatosEmpleo.validationSchema)]);
   const submit = async (values) => {
      const url = `datoscargoscomision/${id > 0 ? `update/${id}` : "create"}`;
      let data = { ...values };
      data.EsEnMexico = parseInt(data.EsEnMexico);
      if (data.NivelEmpleoCargoComision == 4) {
         data.NivelEmpleoCargoComision = data.NivelEmpleoCargoComisionText;
         delete data.NivelEmpleoCargoComisionText;
      } else {
         delete data.NivelEmpleoCargoComisionText;
      }
      Post(url, data, next);
   };
   useEffect(() => {
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDataEmpleosCargos();
      }
   }, [data]);
   const modifiedDataEmpleosCargos = () => {
      if (loading) {
         setID(parseInt(data.Id_DatosEmpleoCargoComision));
      }
      setMexico(data.EsEnMexico == 0 ? false : true);
      setActiveState(isNumber(parseInt(data.Id_MunicipioAlcaldia)) && false);
      setIdEntidad(isNumber(parseInt(data.Id_EntidadFederativa)) ? parseInt(data.Id_EntidadFederativa) : 0);
      insertFormik(formik, data);
   };

   const steps = [
      {
         label: "Nivel orden del gobierno",
         component: (
            <NivelGobierno
               active={active}
               handleActive={setActive}
               ambitoPublico={ambitoPublico}
               nivelOrdenGobierno={nivelOrdenGobierno}
               nombreEntePublico={nombreEntePublico}
            />
         )
      },
      { label: "Datos empleo", component: <InformacionEmpleo /> },
      { label: "Domicilio", component: <DomicilioDeclarante mex={mexico} activeState={activeState} idEntidad={idEntidad} CodigoPostal={data && data.CodigoPostal} /> }
   ];
   return (
      <>
         <FormikForm
            ref={formik}
            handlePrevious={previous}
            previousButton={true}
            initialValues={dataForm}
            validationSchema={validationSchema}
            title={title}
            button={false}
            submit={submit}
            message={"Los datos que no serán públicos estarán resaltados de color verde"}
         >
            <ComponentStepper
               variantAfter="outlined"
               steps={steps}
               endButton={loading ? "Actualizar y continuar" : "Registrar y continuar"}
               buttonAfter={"Regresar"}
               buttonContinue={"Continuar"}
            />
            {/* <button onClick={()=>{console.log('====================================');
            console.log(formik.current.errors);
            console.log('====================================');}}>ERRORES</button> */}
         </FormikForm>
      </>
   );
};
