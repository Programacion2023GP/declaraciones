import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";
import { testField } from "../funciones/Funciones";

export const DomiDeclarante = ({ data = {}, testada = false }) => {
   const domicilioExtranjero = data?.domicilioExtranjero || {};
   const domicilioMexico = data?.domicilioMexico || {};

   // Determinar si es de México: si 'pais' está vacío → es México
   const esMexico = !domicilioExtranjero.pais;

   return (
      <>
         <TextPdf text={testField(esMexico ? "Sí" : "No", testada)} title={"¿Es de México?"} />

         <DatosDomicilio
            data={{ domicilioMexico, domicilioExtranjero }}
            testada={testada}
            EsEnMexico={esMexico}
         />
      </>
   );
};
