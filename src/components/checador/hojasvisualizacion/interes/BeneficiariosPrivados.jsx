import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const BeneficiariosPrivados = ({ data = [] }) => {
   const {
    beneficiario = vacio(),
    tipobeneficio = vacio(),
    otorgante = vacio(),
    NombreRazonSocial = vacio(),
    RfcCliente = vacio(),
    formarecepcion = vacio(),
    EspecifiqueBeneficio = vacio(),
    MontoMensualAproximado = vacio(),
      moneda = vacio(),
      sector = vacio(),
      Aclaraciones = vacio(),
   } = data[0] || {};
   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={`Tipo de beneficio`} text={testField(tipobeneficio)} />
         <TextPdf title={`Beneficiario`} text={testField(beneficiario)} />
         <TextPdf title={`Otorgante`} text={testField(otorgante)} />
         <TextPdf title={`Nombre o razón social`} text={testField(NombreRazonSocial)} />

         <TextPdf title={`Rfc`} text={testField(RfcCliente)} />
        
         <TextPdf title={`Forma de recepción del beneficio`} text={testField(formarecepcion)} />
         <TextPdf title={`Especifique el beneficio`} text={testField(EspecifiqueBeneficio)} />
         <TextPdf title={`Monto mensual aproximado del beneficio`} text={testField(MontoMensualAproximado)} />
         <TextPdf title={`Tipo de moneda`} text={testField(moneda)} />
         <TextPdf title={`Sector productivo al que pertenece`} text={testField(sector)} />

         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
