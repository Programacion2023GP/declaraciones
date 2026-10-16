import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const ParticipacionTomaDecisiones = ({ data = {} }) => {
   const {
      tipoRelacion = vacio(),
      tipoInstitucion = { valor: vacio() },
      puestoRol = vacio(),
      fechaInicioParticipacion = vacio(),
      recibeRemuneracion = false,
      montoMensual = { valor: vacio(), moneda: vacio() },
      ubicacion = { pais: vacio(), entidadFederativa: { valor: vacio() } },
      Aclaraciones = vacio(),
   } = data;

   useEffect(() => { }, []);

   return (
      <>
         <TextPdf title="Relación" text={testField(tipoRelacion)} />
         <TextPdf title="Tipo de institución" text={testField(tipoInstitucion.valor)} />
         <TextPdf title="Puesto o rol" text={testField(puestoRol)} />
         <TextPdf title="Fecha de inicio de participación" text={testField(fechaInicioParticipacion)} />
         <TextPdf title="Recibe remuneración" text={recibeRemuneracion ? "Sí" : "No"} />

         {!recibeRemuneracion && (
            <TextPdf
               title={ubicacion.pais === "MX" ? "Entidad federativa" : "País"}
               text={ubicacion.pais === "MX" ? testField(ubicacion.entidadFederativa.valor) : testField(ubicacion.pais)}
            />
         )}

         <TextPdf title="Monto mensual neto" text={testField(montoMensual.valor)} />
         <TextPdf title="Tipo de moneda" text={testField(montoMensual.moneda)} />
         <TextPdf title="Aclaraciones/Observaciones" text={testField(Aclaraciones)} />
      </>
   );
};
