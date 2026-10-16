import { TextPdf, OptionsPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { DomiDeclarante } from "./DomiDeclarante";
import { testField, field, vacio } from "../funciones/Funciones";

export const BienesInmuebles = ({ data = {}, testada = false }) => {
   if (!data) return null;

   const {
      tipoInmueble = {},
      titular = [],
      porcentajePropiedad = vacio(),
      superficieTerreno = {},
      superficieConstruccion = {},
      tercero = [],
      transmisor = [],
      formaAdquisicion = {},
      formaPago = vacio(),
      valorAdquisicion = {},
      fechaAdquisicion = vacio(),
      valorConformeA = vacio(),
      motivoBaja = {}
   } = data;

   const titularPrincipal = titular?.[0]?.titularBien?.[0] || {};
   const terceroData = tercero?.[0] || {};
   const transmisorData = transmisor?.[0] || {};

   return (
      <>
         <TextPdf
            title="Tipo de inmueble"
            text={field(tipoInmueble?.valor)}
            width={50}
         />
         <TextPdf
            title="Titular del inmueble"
            text={field(titularPrincipal?.valor)}
            width={50}
         />
         <TextPdf
            title="Porcentaje de propiedad del declarante"
            text={field(porcentajePropiedad)}
            width={50}
         />
         <TextPdf
            title="Superficie del terreno"
            text={`${superficieTerreno?.superficie?.valor || ""} ${superficieTerreno?.superficie?.unidad || ""}`}
            width={50}
         />
         <TextPdf
            title="Superficie de construcción"
            text={`${superficieConstruccion?.superficie?.valor || ""} ${superficieConstruccion?.superficie?.unidad || ""}`}
            width={50}
         />

         {/* --- TERCERO --- */}
         <Ngif condition={!!terceroData?.nombreRazonSocial}>
            <TextPdf
               title="Tercero (tipo de persona)"
               text={field(terceroData?.tipoPersona)}
               width={50}
            />
            <TextPdf
               title="Nombre o razón social del tercero"
               text={field(terceroData?.nombreRazonSocial)}
               width={50}
            />
         </Ngif>

         {/* --- TRANSMISOR --- */}
         <Ngif condition={!!transmisorData?.nombreRazonSocial}>
            <TextPdf
               title="Transmisor (tipo de persona)"
               text={field(transmisorData?.tipoPersona)}
               width={50}
            />
            <TextPdf
               title="Nombre o razón social del transmisor"
               text={field(transmisorData?.nombreRazonSocial)}
               width={50}
            />
            <TextPdf
               title="RFC del transmisor"
               text={field(transmisorData?.rfc)}
               width={50}
            />
         </Ngif>

         {/* --- FORMA DE ADQUISICIÓN / PAGO --- */}
         <TextPdf
            title="Forma de adquisición"
            text={field(formaAdquisicion?.valor)}
            width={50}
         />
         <TextPdf
            title="Forma de pago"
            text={field(formaPago)}
            width={50}
         />

         {/* --- VALOR DE ADQUISICIÓN --- */}
         <TextPdf
            title="Valor de adquisición"
            text={`${valorAdquisicion?.monto?.valor || ""} ${valorAdquisicion?.monto?.moneda || ""}`}
            width={50}
         />

         <TextPdf
            title="Fecha de adquisición"
            text={field(fechaAdquisicion)}
            width={50}
         />
         <TextPdf
            title="Valor conforme a"
            text={field(valorConformeA)}
            width={50}
         />

         {/* --- MOTIVO DE BAJA --- */}
         <Ngif condition={!!motivoBaja?.clave}>
            <TextPdf
               title="Motivo de baja"
               text={field(motivoBaja?.valor)}
               width={50}
            />
         </Ngif>
      </>
   );
};
