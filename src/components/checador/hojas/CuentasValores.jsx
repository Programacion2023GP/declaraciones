import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { field, testField, vacio } from "../funciones/Funciones";

export const CuentasValores = ({ data = {}, testada = false }) => {
   if (!data) return null;

   const {
      tipoInversion = {},
      subTipoInversion = {},
      titular = [],
      tercero = [],
      localizacionInversion = {},
      numeroCuentaContrato = vacio(),
      saldoSituacionActual = {},
      aclaraciones = vacio(),
   } = data;

   const titularPrincipal = titular?.[0]?.titularBien || {};
   const terceroData = tercero?.[0] || {};

   return (
      <>
         {/* --- TIPO DE INVERSIÓN --- */}
         <TextPdf title="Tipo de inversión / activo" text={field(tipoInversion?.valor)} width={50} />
         <TextPdf title="Subtipo de inversión / activo" text={field(subTipoInversion?.valor)} width={50} />

         {/* --- TITULAR --- */}
         <TextPdf
            title="Titular de la inversión, cuenta bancaria u otro valor"
            text={field(titularPrincipal?.valor)}
            width={100}
         />

         {/* --- TERCERO --- */}
         <Ngif condition={!!terceroData?.tipoPersona}>
            <TextPdf title="Tercero (tipo de persona)" text={field(terceroData?.tipoPersona)} width={50} />
            <TextPdf title="Nombre o razón social del tercero" text={field(terceroData?.nombreRazonSocial)} width={50} />
            <TextPdf title="RFC del tercero" text={field(terceroData?.rfc)} width={50} />
         </Ngif>

         {/* --- LOCALIZACIÓN --- */}
         <TextPdf
            title="Ubicación de la inversión"
            text={field(localizacionInversion?.pais === "MX" ? "En México" : "En el extranjero")}
            width={100}
         />
         <TextPdf
            title="Institución o razón social"
            text={field(localizacionInversion?.institucionRazonSocial)}
            width={50}
         />
         <TextPdf title="RFC de la institución" text={field(localizacionInversion?.rfc)} width={50} />

         {/* --- DATOS FINANCIEROS --- */}
         <Ngif condition={!!saldoSituacionActual?.valor}>
            <TextPdf
               title="Saldo a la fecha de conclusión"
               text={`${saldoSituacionActual?.valor || ""} ${saldoSituacionActual?.moneda || ""}`}
               width={50}
            />
         </Ngif>

         {/* --- ACLARACIONES --- */}
         <TextPdf title="Aclaraciones / Observaciones" text={field(aclaraciones)} width={100} />
      </>
   );
};
