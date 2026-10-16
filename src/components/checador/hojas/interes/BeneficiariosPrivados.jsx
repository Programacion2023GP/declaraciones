import { useEffect } from "react";
import { TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, vacio } from "../../funciones/Funciones";

export const BeneficiariosPrivados = ({ data = {} }) => {
   const {
      tipoBeneficio = {},
      beneficiario = {},
      otorgante = {},
      formaRecepcion = vacio(),
      especifiqueBeneficio = vacio(),
      montoMensualAproximado = {},
      sector = {},
      Aclaraciones = vacio(),
   } = data;

   useEffect(() => { }, []);

   return (
      <>
         <TextPdf title="Tipo de beneficio" text={testField(tipoBeneficio?.valor)} />
         <TextPdf title="Beneficiario" text={testField(beneficiario?.beneficiariosPrograma?.valor)} />
         <TextPdf title="Otorgante" text={testField(otorgante?.nombreRazonSocial)} />
         <TextPdf title="Rfc" text={testField(otorgante?.rfc)} />
         <TextPdf title="Forma de recepción del beneficio" text={testField(formaRecepcion)} />
         <TextPdf title="Especifique el beneficio" text={testField(especifiqueBeneficio)} />
         <TextPdf title="Monto mensual aproximado del beneficio" text={testField(montoMensualAproximado?.monto?.valor)} />
         <TextPdf title="Tipo de moneda" text={testField(montoMensualAproximado?.monto?.moneda)} />
         <TextPdf title="Sector productivo al que pertenece" text={testField(sector?.valor)} />
         <TextPdf title="Aclaraciones/Observaciones" text={testField(Aclaraciones)} />
      </>
   );
};
