import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const Participacion = ({ data = {} }) => {
   const {
      tipoRelacion = vacio(),
      nombreEmpresaSociedadAsociacion = vacio(),
      rfc = vacio(),
      porcentajeParticipacion = vacio(),
      tipoParticipacion = { valor: vacio() },
      recibeRemuneracion = false,
      montoMensual = { monto: { valor: vacio() } },
      ubicacion = { pais: vacio(), entidadFederativa: { valor: vacio() } },
      sector = { valor: vacio() },
   } = data;

   useEffect(() => { }, []);

   return (
      <>
         <TextPdf title="Relación" text={testField(tipoRelacion)} />
         <TextPdf title="Nombre de la empresa o asociación" text={testField(nombreEmpresaSociedadAsociacion)} />
         <TextPdf title="RFC empresa" text={testField(rfc)} />
         <TextPdf title="Porcentaje de participación" text={testField(porcentajeParticipacion)} />
         <TextPdf title="Tipo de participación" text={testField(tipoParticipacion.valor)} />
         <TextPdf title="¿Recibe remuneración?" text={recibeRemuneracion ? "Sí" : "No"} />

         {recibeRemuneracion && (
            <TextPdf title="Monto mensual neto de su representación" text={testField(montoMensual.monto.valor)} />
         )}

         <TextPdf
            title={ubicacion.pais === "MX" ? "Entidad federativa" : "País"}
            text={ubicacion.pais === "MX" ? testField(ubicacion.entidadFederativa.valor) : testField(ubicacion.pais)}
         />

         <TextPdf title="Sector productivo que pertenece" text={testField(sector.valor)} />
      </>
   );
};
