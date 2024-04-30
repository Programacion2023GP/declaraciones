import { useEffect, useRef, useState } from "react";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../Reusables/request/Request";
import * as Yup from "yup";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { VehiculoComponent } from "./components/VehiculoComponent";
import { ComponentStepper } from "../../Reusables/componentstepper/ComponentStepper";
import { useParams } from "react-router-dom";

export const TipoVehiculo = ({ next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.Vehiculos.initialState);
   const validations = useSelector((state) => state.Vehiculos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const dispatch = useDispatch();
   const formik = useRef(null);
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const { vehiculos } = Request();
   const [postStepper, setPostStepper] = useState(false);

   const message = ` Todos los datos de Vehículos declarados a nombre de la pareja, dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos. `;
   const submit = async (values) => {
      setPostStepper(!postStepper);
   };
   useEffect(() => {
      console.log(dataForm)
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.Vehiculos.validationSchema), useSelector((state) => state.Vehiculos.initialState)]);
   const steps = [
      {
         label: "Tipo de vehiculo",
         component: <VehiculoComponent vehiculos={vehiculos} />
      }
      // {
      //    label: "Forma de adquisicion",
      //    component: <></>
      // }
   ];
   return (
      <FormikForm
         // className={animateSend ? "animate__animated animate__backInDown" : ""}
         ref={formik}
         submit={submit}
         previousButton={true}
         handlePrevious={previous}
         initialValues={dataForm}
         validationSchema={validationSchema}
         title={title}
         message={message}
         button={false}
      >
         <ComponentStepper postStepper={postStepper} steps={steps} buttonContinue={"Continuar"} endButton={"finalizar"} buttonAfter={"regresar"} />
      </FormikForm>
   );
};
