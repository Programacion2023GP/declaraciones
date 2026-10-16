import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { testField, field, vacio } from "../funciones/Funciones";

export const Vehiculos = ({ data = {}, testada = false }) => {
   if (!data) return null;

   const {
      tipoVehiculo = {},
      titular = [],
      transmisor = [],
      marca = vacio(),
      modelo = vacio(),
      anio = vacio(),
      tercero = [],
      formaAdquisicion = {},
      formaPago = vacio(),
      valorAdquisicion = {},
      fechaAdquisicion = vacio(),
      motivoBaja = {}
   } = data;

   const titularPrincipal = titular?.[0]?.titularBien?.[0] || {};
   const transmisorData = transmisor?.[0] || {};
   const terceroData = tercero?.[0] || {};

   return (
      <>
         {/* --- TIPO Y TITULAR --- */}
         <TextPdf title="Tipo de vehículo" text={field(tipoVehiculo?.valor)} width={50} />
         <TextPdf title="Titular del vehículo" text={field(titularPrincipal?.valor)} width={50} />

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

         {/* --- TERCERO --- */}
         <Ngif condition={!!terceroData?.tipoPersona}>
            <TextPdf title="Tercero (tipo de persona)" text={field(terceroData?.tipoPersona)} width={50} />
            <TextPdf title="Nombre o razón social del tercero" text={field(terceroData?.nombreRazonSocial)} width={50} />
            <TextPdf title="RFC del tercero" text={field(terceroData?.rfc)} width={50} />
         </Ngif>

         {/* --- DETALLES DEL VEHÍCULO --- */}
         <TextPdf title="Marca" text={field(marca)} width={50} />
         <TextPdf title="Modelo" text={field(modelo)} width={50} />
         <TextPdf title="Año" text={field(anio)} width={50} />

         {/* --- FORMA DE ADQUISICIÓN / PAGO --- */}
         <TextPdf title="Forma de adquisición" text={field(formaAdquisicion?.valor)} width={50} />
         <TextPdf title="Forma de pago" text={field(formaPago)} width={50} />

         {/* --- VALOR DE ADQUISICIÓN --- */}
         <TextPdf
            title="Valor de adquisición"
            text={`${valorAdquisicion?.valor || ""} ${valorAdquisicion?.moneda || ""}`}
            width={50}
         />

         <TextPdf title="Fecha de adquisición" text={field(fechaAdquisicion)} width={50} />

         {/* --- MOTIVO DE BAJA --- */}
         <Ngif condition={!!motivoBaja?.clave}>
            <TextPdf title="Motivo de baja" text={field(motivoBaja?.valor)} width={50} />
         </Ngif>
      </>
   );
};
