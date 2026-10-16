import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { field, testField, vacio } from "../funciones/Funciones";
import { useEffect } from "react";

export const BienesMuebles = ({ data = {}, testada = false }) => {
   if (!data) return null;

   const {
      tipoBien = {},
      titular = [],
      transmisor = [],
      tercero = {},
      descripcionGeneralBien = vacio(),
      formaAdquisicion = {},
      formaPago = vacio(),
      valorAdquisicion = {},
      fechaAdquisicion = vacio(),
      motivoBaja = {},
   } = data;
  
   const titularPrincipal = titular?.[0]?.titularBien?.[0] || {};
   const transmisorData = transmisor?.[0] || {};

   return (
      <>
         {/* --- TIPO Y TITULAR --- */}
         <TextPdf title="Tipo de bien" text={field(tipoBien?.valor)} width={50} />
         <TextPdf title="Titular del bien" text={field(titularPrincipal?.valor)} width={50} />

         {/* --- TRANSMISOR --- */}
         <Ngif condition={!!transmisorData?.tipoPersona}>
            <TextPdf title="Transmisor (tipo de persona)" text={field(transmisorData?.tipoPersona)} width={50} />
            <Ngif condition={!!transmisorData?.nombreRazonSocial}>
               <TextPdf title="Nombre o razón social del transmisor" text={field(transmisorData?.nombreRazonSocial)} width={50} />
            </Ngif>
            <Ngif condition={!!transmisorData?.rfc}>
               <TextPdf title="RFC del transmisor" text={field(transmisorData?.rfc)} width={50} />
            </Ngif>
         </Ngif>

         {/* --- TERCERO (COPROPIEDAD) --- */}
         <Ngif condition={!!tercero?.tipoPersona}>
            <TextPdf title="Tercero (tipo de persona)" text={field(tercero?.tipoPersona)} width={50} />
            <TextPdf title="Nombre del tercero" text={field(tercero?.nombreRazonSocial)} width={50} />
            <TextPdf title="RFC del tercero" text={field(tercero?.rfc)} width={50} />
         </Ngif>

         {/* --- DESCRIPCIÓN DEL BIEN --- */}
         <TextPdf title="Descripción general del bien" text={field(descripcionGeneralBien)} width={100} />

         {/* --- ADQUISICIÓN --- */}
         <TextPdf title="Forma de adquisición" text={field(formaAdquisicion?.valor)} width={50} />
         <TextPdf title="Fecha de adquisición" text={field(fechaAdquisicion)} width={50} />

         {/* --- VALOR Y PAGO --- */}
         <TextPdf
            title="Valor de adquisición del bien"
            text={`${valorAdquisicion?.valor || ""} ${valorAdquisicion?.moneda || ""}`}
            width={50}
         />
         <TextPdf title="Forma de pago" text={field(formaPago)} width={50} />

         {/* --- MOTIVO DE BAJA --- */}
         <Ngif condition={!!motivoBaja?.clave}>
            <TextPdf title="Motivo de baja del bien" text={field(motivoBaja?.valor)} width={100} />
         </Ngif>
      </>
   );
};
