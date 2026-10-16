import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const Clientes = ({ data = {} }) => {
   const clienteObj = data.participacion || {}; // Un solo cliente
   const empresa = clienteObj.empresa || {};
   const cliente = clienteObj.clientePrincipal || {};
   const sector = clienteObj.sector || {};
   const monto = clienteObj.montoAproximadoGanancia?.monto || {};
   const ubicacion = clienteObj.ubicacion || {};
   const entidad = ubicacion.entidadFederativa || {};
   const EsEnMexico = ubicacion.pais === "MX";

   useEffect(() => { }, []);

   if (!clienteObj || Object.keys(clienteObj).length === 0) {
      return <TextPdf title="Cliente principal" text="No se encontró información del cliente." />;
   }

   return (
      <>
         <TextPdf title="Relación" text={testField(clienteObj.tipoRelacion)} />
         <TextPdf title="Nombre de la empresa o servicio que proporciona" text={testField(empresa.nombreEmpresaServicio)} />
         <TextPdf title="Rfc empresa" text={testField(empresa.rfc)} />
         <TextPdf title="Cliente principal" text={testField(cliente.tipoPersona)} />
         <TextPdf title="Nombre o la razón social del cliente principal" text={testField(cliente.nombreRazonSocial)} />
         <TextPdf title="Rfc cliente" text={testField(cliente.rfc)} />
         <TextPdf title="Sector productivo que pertenece" text={testField(sector.valor)} />
         <TextPdf title="Monto mensual neto de su representación" text={testField(monto.valor)} />
         <TextPdf title="Tipo de moneda" text={testField(monto.moneda || "MXN")} />
         <TextPdf title="Lugar donde se ubica" text={testField(EsEnMexico ? "México" : "Extranjero")} />
         {EsEnMexico ? (
            <TextPdf title="Entidad federativa" text={testField(entidad.valor)} />
         ) : (
            <TextPdf title="País" text={testField(ubicacion.pais)} />
         )}
         <TextPdf title="Aclaraciones/Observaciones" text={testField(clienteObj.Aclaraciones)} />
      </>
   );
};
