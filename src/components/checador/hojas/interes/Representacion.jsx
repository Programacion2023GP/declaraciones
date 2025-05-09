import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const Representacion = ({ data = [] }) => {
   const {
      relacion = vacio(),
      representacion = vacio(),
      FechaInicioRepresentacion = vacio(),
      NombreRazonSocial = vacio(),
      Rfc = vacio(),
      RecibeRemuneracion = vacio(),
      EsEnMexico = vacio(),
      Pais = vacio(),
      Municipio = vacio(),
      Aclaraciones = vacio(),
      Id_TipoPersona = vacio(),
      MontoMensual = vacio(),
      sector=vacio(),
   } = data[0] || {};
   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={`Relacion`} text={testField(relacion)} />
         <TextPdf title={`Tipo de representación`} text={testField(representacion)} />
         <TextPdf title={`Fecha de inicio de la participación de la institución`} text={testField(FechaInicioRepresentacion)} />
         <TextPdf title={`Representante/Representado`} text={testField(Id_TipoPersona)} />
         <TextPdf title={`Nombre o razon social del represetante o representado`} text={testField(NombreRazonSocial)} />
         <TextPdf title={`Rfc`} text={testField(Rfc)} />
         <TextPdf title={`¿Recibe remuneración?`} text={testField(RecibeRemuneracion)} />
         <TextPdf title={`Lugar donde se ubica`} text={testField(EsEnMexico=='si'?'México':'Extranjero')} />

         {RecibeRemuneracion == "si" && <TextPdf title={`Monto mensual neto de su representación`} text={testField(MontoMensual)} />}
         {EsEnMexico ? <TextPdf title={`Entidad federativa`} text={testField(Municipio)} /> : <TextPdf title={`Pais`} text={testField(Pais)} />}
         <TextPdf title={`Sector productivo que pertenece`} text={testField(sector)} />

         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
