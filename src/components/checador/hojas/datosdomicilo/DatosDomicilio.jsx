import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";

export const DatosDomicilio = ({ data = {}, testada = false, EsEnMexico = false }) => {
   const domicilio = EsEnMexico ? data.domicilioMexico : data.domicilioExtranjero || {};

   const {
      calle = vacio(),
      numeroExterior = vacio(),
      numeroInterior = vacio(),
      coloniaLocalidad = vacio(),
      municipioAlcaldia = vacio(),
      entidadFederativa = vacio(),
      codigoPostal = vacio(),
      pais = vacio(),
      estadoProvincia = vacio(),
      aclaracionesObservaciones = vacio(),
   } = domicilio;

   return (
      <>
         <TextPdf title={"Calle"} text={testField(calle, testada)} />
         <TextPdf title={"Número Exterior"} text={testField(numeroExterior, testada)} />
         <TextPdf title={"Número Interior"} text={testField(numeroInterior, testada)} />
         <TextPdf title={"Colonia/Localidad"} text={testField(coloniaLocalidad, testada)} />
         {EsEnMexico ? <>

            <TextPdf title={"Municipio/Alcaldia"} text={testField(municipioAlcaldia?.valor, testada)} />
            <TextPdf title={"Entidad Federativa"} text={testField(entidadFederativa?.valor, testada)} />

         </> :

            <>

               <TextPdf title={"Pais"} text={testField(pais, testada)} />
               <TextPdf title={"Estado Provincia"} text={testField(estadoProvincia, testada)} />
            </>
         }



         <TextPdf title={"Código postal"} text={testField(codigoPostal, testada)} width={100} />
      </>
   );
};
