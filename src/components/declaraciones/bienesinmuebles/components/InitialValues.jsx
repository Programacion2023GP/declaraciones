import { useEffect, useState } from "react";
import Interface from "../../../../services/interface";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Text } from "../../../Reusables/input/Input";
import { DatePicker } from "@mui/lab";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { useFormikContext } from "formik";
import { ComponenteMexico } from "./componentesdomicilios/ComponenteMexico";
import { ComponenteExtranjero } from "./componentesdomicilios/ComponenteExtranjero";
import { DomicilioDeclarante } from "./DomicilioDeclarante";
import { ComponentStepper } from "../../../Reusables/componentstepper/ComponentStepper";
import { TipoDePersona } from "./TipoDePersona";
import { Inmuebles } from "./Inmueble";

export const InitialValues = ({ titular, inmuebles, relacion, adquisicion, pago, monedas, conforme, motivobaja,postStepper }) => {
   const [inmueblesOtro,handleInmueblesOtro]= useState(true)
   const [motivo,setMotivo] = useState(false)
   const [openMunicio,setOpenMunicipio] = useState(true)
   const [estado,setEstado]= useState(true)
   const [checked, setChecked] = useState(true);

   const formik = useFormikContext()
   useEffect(()=>{
      setMotivo(true)
      handleInmueblesOtro(true)
   },[formik.isSubmitting])
   const steps = [
      {
         label: "Datos del inmueble",
         component: <Inmuebles key={'inmbuebles'} incluirmotivo={setMotivo} motivo={motivo} inmuebles={inmuebles} relacion={relacion} titular={titular} motivobaja={motivobaja} inmueblesOtro={inmueblesOtro}  handleInmueblesOtro={handleInmueblesOtro}/>
      },
      {
         label: "Tipo de persona",
         component: <TipoDePersona key={'TipoDePersona'}  adquisicion={adquisicion} monedas={monedas} pago={pago} conforme={conforme} />
      },
      {
         label: "Domicilio",
         component: <DomicilioDeclarante key={'DomicilioDeclarante'} openMunicipio={openMunicio}  setOpenMunicipio={setOpenMunicipio} setEstado={setEstado} estado={estado}/>
      },
     
   ];
   useEffect(() => {}, []);
   return (
      <>
            
         <ComponentStepper postStepper={postStepper} steps={steps} buttonContinue={"Continuar"} endButton={"finalizar"} buttonAfter={"regresar"} />
      </>
   );
};
