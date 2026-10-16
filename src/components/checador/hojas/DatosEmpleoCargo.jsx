import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { DomiDeclarante } from "./DomiDeclarante";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";
import { useEffect, useState } from "react";

export const DatosEmpleoCargo = ({
   data = {},
   testada = false,
  
}) => {
   const domicilioExtranjero = data?.domicilioExtranjero || {};
   const domicilioMexico = data?.domicilioMexico || {};

   // Determinar si es de México: si 'pais' está vacío → es México
   const esMexico = !domicilioExtranjero.pais;
   const {
     
      nivelOrdenGobierno = vacio(),
      ambitoPublico = vacio(),
      nombreEntePublico = vacio(),
      areaAdscripcion = vacio(),
      empleoCargoComision = vacio(),
      contratadoPorHonorarios = vacio(),
      nivelempleoCargoComision = vacio(),
      funcionPrincipal = vacio(),
      fechaTomaPosesion = vacio(),
      telefonoOficina={},
    
     
      aclaracionesObservaciones = vacio(),
   
   } = data || {};
   useEffect(()=>{

      console.log("aca", data.nivelEmpleoCargoComision)

   },[])


   return (
      <>
         <TextPdf title={"Nivel/Orden de gobierno"} text={nivelOrdenGobierno} />
         <TextPdf title={"Ámbito público"} text={ambitoPublico} />
         <TextPdf title={"Nombre del ente público"} text={field(nombreEntePublico)} />
         <TextPdf title={"Área de adscripción"} text={field(areaAdscripcion)} width={50} />
         <TextPdf title={"Empleo, cargo o comisión"} text={field(empleoCargoComision)} width={100} />
         <TextPdf title={"¿Está contratado por honorarios?"} text={field(contratadoPorHonorarios?"SI":"NO")} width={50} />

         <TextPdf
            title={"Nivel del empleo, cargo o comision"}
            text={
               nivelempleoCargoComision}
            width={50}
         />
         <TextPdf title={"Función principal"} text={field(funcionPrincipal)} width={100} />

         <TextPdf title={"Fecha de toma de posesion del empleo,cargo o comisión"} text={field(fechaTomaPosesion)} width={100} />
         <TextPdf title={"Teléfono de oficina y extensión"} text={field(telefonoOficina?.telefono + " EXT " + telefonoOficina?.extension)} width={100} />
         <TextPdf title={"Domiclio del empleo, cargo o comisión"} text={field(esMexico?"México":"Extranjero")} width={100} />

         <DatosDomicilio
            data={{ domicilioMexico, domicilioExtranjero }}
            testada={testada}
            EsEnMexico={esMexico}
         />
         <TextPdf title={"Aclaraciones"} text={field(aclaracionesObservaciones)} width={100} />
      </>
   );
};
