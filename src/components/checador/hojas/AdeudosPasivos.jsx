import { useEffect } from "react";
import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, vacio } from "../funciones/Funciones";

export const AdeudosPasivos = ({ data = {}, testada = false }) => {
   const {
      tipoAdeudo = { valor: "" },
      NumeroCuentaContrato = vacio(),
      FechaAdquisicion = vacio(),
      montoOriginal = { monto: { valor: "", moneda: "MXN" } },
      saldoInsolutoSituacionActual = { monto: { valor: "", moneda: "MXN" } },
      otorganteCredito = { tipoPersona: "", nombreInstitucion: "", rfc: "" },
      localizacionAdeudo = { pais: "" },
      Aclaraciones = vacio(),
   } = data;

   // Corrección: tomar el primer elemento del array
   const titularItem = (data.titular?.[0] || { titularBien: [] });
   const titularValor = titularItem.titularBien?.[0]?.valor || "";

   const terceroItem = (data.tercero?.[0] || { tipoPersona: "", nombreRazonSocial: "", rfc: "" });

   useEffect(() => {
      console.log("Datos AdeudosPasivos:", data);
   }, []);

   return (
      <>
         <TextPdf title={`Titular del adeudo`} text={testada ? testField(titularValor, testada) : field(titularValor)} />
         <TextPdf title={`Tipo de adeudo`} text={testada ? testField(tipoAdeudo?.valor, testada) : field(tipoAdeudo?.valor)} />
         <TextPdf title={`Número de cuenta o contrato`} text={testField(NumeroCuentaContrato, testada)} />
         <TextPdf title={`Fecha de adquisición del adeudo / pasivo`} text={testField(FechaAdquisicion, testada)} />
         <TextPdf title={`Monto original del adeudo / pasivo`} text={testField(montoOriginal?.monto?.valor, testada)} />
         <TextPdf title={`Saldo insoluto`} text={testField(saldoInsolutoSituacionActual?.monto?.valor, testada)} />
         <TextPdf title={`Tercero`} text={testada ? testField(terceroItem.tipoPersona, testada) : field(terceroItem.tipoPersona)} />
         <TextPdf title={`Nombre del tercero o terceros`} text={testField(terceroItem.nombreRazonSocial, testada)} />
         <TextPdf title={`RFC del tercero`} text={testField(terceroItem.rfc, testada)} />
         <TextPdf title={`Otorgante del crédito`} text={testField(otorganteCredito?.tipoPersona, testada)} />
         <TextPdf title={`Nombre / institución o razón social`} text={testField(otorganteCredito?.nombreInstitucion, testada)} />
         <TextPdf title={`RFC del otorgante`} text={testField(otorganteCredito?.rfc, testada)} />
         <TextPdf title={`País`} text={testField(localizacionAdeudo?.pais, testada)} />
         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones, testada)} />
      </>
   );
};
