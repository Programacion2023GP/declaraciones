import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const ParticipacionTomaDecisiones = ({ data = [] }) => {
   const {
      relacion = vacio(),
      NombreEmpresaSociedadAsociacion = vacio(),
      RfcEmpresa = vacio(),
      PorcentajeParticipacion = vacio(),
      participacion = vacio(),
      tipomoneda = vacio(),
      RecibeRemuneracion = vacio(),
      MontoMensual = vacio(),
      pais = vacio(),
      Municipio = vacio(),
      sector = vacio(),
      Aclaraciones = vacio(),
      EsEnMexico = vacio()
   } = data[0] || {};
   useEffect(() => {
   }, []);
   return (
      <>
         <TextPdf title={`Relacion`} text={testField(relacion)} />
         <TextPdf title={`Nombre de la empresa o asociación`} text={testField(NombreEmpresaSociedadAsociacion)} />
         <TextPdf title={`Rfc empresa`} text={testField(RfcEmpresa)} />
         <TextPdf title={`Porcentaje de la participacion de acuerdo a la escrituras`} text={testField(PorcentajeParticipacion)} />
         <TextPdf title={`Tipo de participación`} text={testField(participacion)} />
         <TextPdf title={`Recibe remuneración`} text={testField(RecibeRemuneracion)} />
         {RecibeRemuneracion == "no" && (
            <>{EsEnMexico ? <TextPdf title={`Entidad federativa`} text={testField(Municipio)} /> : <TextPdf title={`Pais`} text={testField(pais)} />}</>
         )}
         <TextPdf title={`Tipo de moneda`} text={testField(tipomoneda)} />

         <TextPdf title={`Monto mensual neto`} text={testField(MontoMensual)} />
         <TextPdf title={`Sector productivo que pertenece`} text={testField(sector)} />

         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
