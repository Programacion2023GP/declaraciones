import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const Representacion = ({ data = {} }) => {
   const representacionObj = data.participacion || {}; // Un solo objeto

   const tipoPersona = representacionObj.tipoPersona || vacio();
   const monto = representacionObj.montoMensual?.monto || {};
   const ubicacion = representacionObj.ubicacion?.entidadFederativa || {};
   const sector = representacionObj.sector || {};

   useEffect(() => { }, []);

   if (!representacionObj || Object.keys(representacionObj).length === 0) {
      return <TextPdf title="Representación" text="No se encontró información de la representación." />;
   }

   return (
      <>
         <TextPdf title="Relación" text={testField(representacionObj.tipoRelacion)} />
         <TextPdf title="Tipo de representación" text={testField(representacionObj.tipoRepresentacion)} />
         <TextPdf title="Fecha de inicio de la participación de la institución" text={testField(representacionObj.fechaInicioRepresentacion)} />
         <TextPdf title="Tipo de persona" text={testField(tipoPersona)} />
         <TextPdf title="Nombre o razón social del representante o representado" text={testField(representacionObj.nombreRazonSocial)} />
         <TextPdf title="RFC" text={testField(representacionObj.rfc)} />
         <TextPdf title="¿Recibe remuneración?" text={testField(representacionObj.recibeRemuneracion ? "Sí" : "No")} />
         {representacionObj.recibeRemuneracion && (
            <TextPdf title="Monto mensual neto de su representación" text={testField(monto.valor)} />
         )}
         <TextPdf title="Lugar donde se ubica" text={testField(representacionObj.ubicacion?.pais === "MX" ? "México" : "Extranjero")} />
         {representacionObj.ubicacion?.pais === "MX" ? (
            <TextPdf title="Entidad federativa" text={testField(ubicacion.valor)} />
         ) : (
            <TextPdf title="País" text={testField(ubicacion.valor)} />
         )}
         <TextPdf title="Sector productivo que pertenece" text={testField(sector.valor)} />
         <TextPdf title="Aclaraciones/Observaciones" text={testField(representacionObj.aclaraciones)} />
      </>
   );
};
