import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const Fideicomisos = ({ data = {} }) => {
   const {
      tipoFideicomiso = vacio(),
      tipoParticipacion = vacio(),
      rfcFideicomiso = vacio(),
      fideicomitente = {},
      fiduciario = {},
      fideicomisario = {},
      sector = {},
      extranjero = vacio(),
      aclaraciones = vacio(),
   } = data;

   return (
      <>
         <TextPdf title="Tipo del fideicomiso" text={testField(tipoFideicomiso)} />
         <TextPdf title="Tipo de participación" text={testField(tipoParticipacion)} />
         <TextPdf title="RFC del fideicomiso" text={testField(rfcFideicomiso)} />

         {/* Fideicomitente */}
         <TextPdf title="Tipo de fideicomitente" text={testField(fideicomitente.tipoPersona)} />
         <TextPdf title="Nombre o razón social del fideicomitente" text={testField(fideicomitente.nombreRazonSocial)} />
         <TextPdf title="RFC del fideicomitente" text={testField(fideicomitente.rfc)} />

         {/* Fiduciario */}
         <TextPdf title="Nombre o razón social del fiduciario" text={testField(fiduciario.nombreRazonSocial)} />
         <TextPdf title="RFC del fiduciario" text={testField(fiduciario.rfc)} />

         {/* Fideicomisario */}
         <TextPdf title="Tipo de fideicomisario" text={testField(fideicomisario.tipoPersona)} />
         <TextPdf title="Nombre o razón social del fideicomisario" text={testField(fideicomisario.nombreRazonSocial)} />
         <TextPdf title="RFC del fideicomisario" text={testField(fideicomisario.rfc)} />

         {/* Sector */}
         <TextPdf title="Clave del sector" text={testField(sector.clave)} />
         <TextPdf title="Valor del sector" text={testField(sector.valor)} />

         <TextPdf title="Extranjero/México" text={testField(extranjero)} />
         <TextPdf title="Aclaraciones/Observaciones" text={testField(aclaraciones)} />
      </>
   );
};
