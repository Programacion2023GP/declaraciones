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
   const { nivelOrdenGobierno, ambitoPublico, nombreEntePublico, adscripcion, adscripcionOrganismo } = Request({
      peticiones: ["nivelOrdenGobierno", "ambitoPublico", "nombreEntePublico", "adscripcion", "adscripcionOrganismo"]
   });
   const [mexico, setMexico] = useState(true);
   const [idEntidad, setIdEntidad] = useState(0);
   const [activeState, setActiveState] = useState(true);
   const [loadData, setLoadData] = useState(data);
   const [newAdscripcion, setNewAdscripcion] = useState([]);
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosEmpleo.initialState), useSelector((state) => state.DatosEmpleo.validationSchema)]);
   useEffect(() => {
      const response = [];
      adscripcion.map((item) => {
         response.push({
            id: item.text,
            text: item.text
         });
      });
      setNewAdscripcion(response);
   }, [adscripcion]); //
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
      if (loadData?.constructor === Object && Object.keys(loadData).length > 0) {
         modifiedDataEmpleosCargos();
      }
   }, [data]);
   const modifiedDataEmpleosCargos = () => {
      if (loading) {
         setID(parseInt(loadData.Id_DatosEmpleoCargoComision));
      }
      setMexico(loadData.EsEnMexico == 0 ? false : true);
      setActiveState(isNumber(parseInt(loadData.Id_MunicipioAlcaldia)) && false);
      setIdEntidad(isNumber(parseInt(loadData.Id_EntidadFederativa)) ? parseInt(loadData.Id_EntidadFederativa) : 0);
      insertFormik(formik, loadData);
   };

   const steps = [
      {
         label: "Nivel orden del gobierno",
         component: (
            <NivelGobierno
               aerea={loadData && loadData.AreaAdscripcion}
               adscripcionOrganismo={adscripcionOrganismo}
               active={active}
               handleActive={setActive}
               ambitoPublico={ambitoPublico}
               nivelOrdenGobierno={nivelOrdenGobierno}
               nombreEntePublico={nombreEntePublico}
               adscripcion={newAdscripcion}
            />
         )
      },
      { label: "Datos empleo", component: <InformacionEmpleo /> },
      {
         label: "Domicilio",
         component: <DomicilioDeclarante mex={mexico} activeState={activeState} idEntidad={idEntidad} CodigoPostal={loadData && loadData.CodigoPostal} />
      }
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
