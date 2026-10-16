import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const Fideicomisos = ({ data = [] }) => {
   const {
      relacion = vacio(),
      fideocomiso = vacio(),
      participacion = vacio(),
      RfcFideicomiso = vacio(),
      tipo_fideicomitente = vacio(),
      NombreRazonSocialFideicomitente = vacio(),
      RfcFideicomitente = vacio(),
      tipo_fideicomisario = vacio(),
      NombreRazonSocialFideicomisario = vacio(),
      RfcFideicomisario = vacio(),

      Aclaraciones = vacio(),

      sector = vacio(),
      pais = vacio(),

   } = data[0] || {};
   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={`Relacion`} text={testField(relacion)} />
         <TextPdf title={`Tipo del fideocomiso`} text={testField(fideocomiso)} />
         <TextPdf title={`Participación`} text={testField(participacion)} />
         <TextPdf title={`Rfc del fideicomiso`} text={testField(RfcFideicomiso)} />
         <TextPdf title={`Fide del ficomitente`} text={testField(tipo_fideicomitente)} />
         <TextPdf title={`Nombre o razón social del fidecomitente`} text={testField(NombreRazonSocialFideicomitente)} />
        
         <TextPdf title={`Rfc del fideicomitente`} text={testField(RfcFideicomitente)} />
         <TextPdf title={`Fide del comisario`} text={testField(tipo_fideicomisario)} />
         <TextPdf title={`Nombre o razón social del fideocomisario`} text={testField(NombreRazonSocialFideicomisario)} />
         <TextPdf title={`Rfc del fideicomisario`} text={testField(RfcFideicomisario)} />
         <TextPdf title={`Sector`} text={testField(sector)} />
         <TextPdf title={`Pais`} text={testField(pais)} />

         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
