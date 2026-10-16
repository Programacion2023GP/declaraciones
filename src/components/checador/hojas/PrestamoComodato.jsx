import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, arrayField, vacio } from "../funciones/Funciones";

export const PrestamoComodato = ({ data = {}, testada = false }) => {
   // Si no hay data, devolvemos vacío
   if (!data || Object.keys(data).length === 0) return null;

   const tipoBien = data.tipoBien || {};
   const inmueble = tipoBien.inmueble || {};
   const vehiculo = tipoBien.vehiculo || {};
   const dueno = data.duenoTitular || {};

   const esVehiculo = Object.keys(vehiculo).length > 0;
   const esInmueble = Object.keys(inmueble).length > 0;

   return (
      <>
         {esVehiculo && (
            <>
               <TextPdf text={field(vehiculo.tipo?.tipoVehiculo?.valor)} title="Tipo de vehículo" />
               <TextPdf text={field(vehiculo.marca)} title="Marca" />
               <TextPdf text={field(vehiculo.modelo)} title="Modelo" />
               <TextPdf text={field(vehiculo.anio)} title="Año" />
            </>
         )}

         {esInmueble && (
            <>
               <TextPdf text={field(inmueble.tipoInmueble?.valor)} title="Tipo de inmueble" />
               {/* Aquí puedes descomentar si quieres mostrar domicilio */}
               {/* <TextPdf text={field(inmueble.domicilioMexico?.calle)} title="Calle" /> */}
            </>
         )}

         <TextPdf text={field(dueno.tipoDuenoTitular)} title="Tipo de dueño/titular" />
         <TextPdf text={testField(dueno.nombreTitular, testada)} title="Nombre del titular" />
         <TextPdf text={testField(dueno.rfc, testada)} title="RFC" />
         <TextPdf text={testField(dueno.relacionConTitular, testada)} title="Relación con titular" />
      </>
   );
};
