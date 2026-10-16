import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const Apoyos = ({ data = {} }) => {
   // Extraemos los campos desde data.participacion
   const apoyoObj = data.participacion || {}; // Un solo apoyo
   const tipoApoyo = apoyoObj.tipoApoyo || {};
   const monto = apoyoObj.montoApoyoMensual?.monto || {};

   useEffect(() => { }, []);

   if (!apoyoObj || Object.keys(apoyoObj).length === 0) {
      return <TextPdf title="Apoyo" text="No se encontró información del apoyo." />;
   }

   return (
      <>
         <TextPdf title="Beneficiario del programa" text={testField(apoyoObj.beneficiarioPrograma?.valor)} />
         <TextPdf title="Nombre del programa" text={testField(apoyoObj.nombrePrograma)} />
         <TextPdf title="Institución que otorga el apoyo" text={testField(apoyoObj.institucionOtorgante)} />
         <TextPdf title="Nivel de orden de gobierno" text={testField(apoyoObj.nivelOrdenGobierno)} />
         <TextPdf title="Tipo de apoyo" text={testField(tipoApoyo.valor)} />
         <TextPdf title="Forma de recepción del apoyo" text={testField(apoyoObj.formaRecepcion)} />
         <TextPdf title="Monto del apoyo mensual" text={testField(monto.valor)} />
         <TextPdf title="Aclaraciones/Observaciones" text={testField(apoyoObj.aclaraciones)} />
      </>
   );
};
