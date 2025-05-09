import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const Apoyos = ({ data = [] }) => {
   const {
      beneficiario = vacio(),
      NombrePrograma = vacio(),
      InstitucionOtorgante = vacio(),
      nivelordengobierno = vacio(),
      tipoapoyo = vacio(),
      formarecepcion = vacio(),
      MontoApoyoMensual = vacio(),
      Aclaraciones = vacio()
   } = data[0] || {};
   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={`Beneficiario del programa`} text={testField(beneficiario)} />
         <TextPdf title={`Nombre del programa`} text={testField(NombrePrograma)} />
         <TextPdf title={`Institución que otorga el apoyo`} text={testField(InstitucionOtorgante)} />
         <TextPdf title={`Nivel de orden de gobierno`} text={testField(nivelordengobierno)} />
         <TextPdf title={`Tipo de apoyo`} text={testField(tipoapoyo)} />
         <TextPdf title={`Forma de recepción del apoyo`} text={testField(formarecepcion)} />
         <TextPdf title={`Monto del apoyo mensual`} text={testField(MontoApoyoMensual)} />

         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
