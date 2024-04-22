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

export const InitialValues = ({ titular, inmuebles, relacion, adquisicion, pago, monedas, conforme, motivobaja }) => {
   const [inmueblesOtro,handleInmueblesOtro]= useState(true)
   const steps = [
      {
         label: "Datos del inmueble",
         component: <Inmuebles inmuebles={inmuebles} relacion={relacion} titular={titular} motivobaja={motivobaja} inmueblesOtro={inmueblesOtro}  handleInmueblesOtro={handleInmueblesOtro}/>
      },
      {
         label: "Tipo de persona",
         component: <TipoDePersona adquisicion={adquisicion} monedas={monedas} pago={pago} conforme={conforme} />
      },
      {
         label: "Domicilio",
         component: <DomicilioDeclarante />
      }
   ];
   useEffect(() => {}, []);
   return (
      <>
         <ComponentStepper steps={steps} buttonContinue={"Continuar"} endButton={"finalizar"} buttonAfter={"regresar"} />
      </>
   );
};
