import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const AdeudosPasivos = ({ data = [], testada = false, adeudos = [], titular, monedas = [] }) => {

   const {
      Id_AdeudosPasivos = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Id_Titular = vacio(),
      Id_TipoAdeudo = vacio(),
      NumeroCuentaContrato = vacio(),
      FechaAdquisicion = vacio(),
      Monto = vacio(),
      Id_Monto = vacio(),
      SaldoInsolutoSituacionActual = vacio(),
      Id_SaldoInsolutoSituacionActual = vacio(),
      T_Id_TipoPersona = vacio(),
      T_NombreRazonSocial = vacio(),
      T_Rfc = vacio(),
      OC_Id_TipoPersona = vacio(),
      OC_NombreRazonSocial = vacio(),
      OC_Rfc = vacio(),
      EsEnMexico = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      Id_Pais = vacio(),
      EspecifiqueOtro = vacio()
   } = data[0] || {};
   const ids = [2, 5, 6];
   useEffect(() => {

   }, []);
   return (
      <>
         <TextPdf
            title={`Titular del adeudo`}
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(titular, Id_Titular, testada) : arrayField(titular, Id_Titular)}
         />
         {parseInt(Id_TipoAdeudo) > 0 && (
            <TextPdf
               title={`Tipo de adeudo`}
               text={ids.includes(parseInt(Id_Titular)) ? testArrayField(adeudos, Id_TipoAdeudo, testada) : arrayField(adeudos, Id_TipoAdeudo)}
            />
         )}
         <TextPdf
            title={`Número de cuenta o contrato`}
            text={ids.includes(parseInt(Id_Titular)) ? testField(NumeroCuentaContrato, testada) : testField(NumeroCuentaContrato, testada)}
         />

         <TextPdf
            title={`Fecha de adquisición del adeudo / pasivo`}
            text={ids.includes(parseInt(Id_Titular)) ? testField(FechaAdquisicion, testada) : field(FechaAdquisicion)}
         />

         <TextPdf title={`Monto original del adeudo / pasivo`} text={ids.includes(parseInt(Id_Titular)) ? testField(Monto, testada) : field(Monto)} />
         {parseInt(Id_SaldoInsolutoSituacionActual) > 0 && (
            <TextPdf
               title={`Tipo de moneda`}
               text={
                  ids.includes(parseInt(Id_Titular))
                     ? testArrayField(monedas, Id_SaldoInsolutoSituacionActual, testada)
                     : arrayField(monedas, Id_SaldoInsolutoSituacionActual)
               }
            />
         )}
         <TextPdf
            title={`Saldo insoluto`}
            text={ids.includes(parseInt(Id_Titular)) ? testField(SaldoInsolutoSituacionActual, testada) : testField(SaldoInsolutoSituacionActual, testada)}
         />

         <TextPdf
            title={`Tercero`}
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(T_Id_TipoPersona) == 1 ? "Persona física" : "Persona moral", testada)
                  : field(parseInt(T_Id_TipoPersona) == 1 ? "Persona física" : "Persona moral")
            }
         />
         <TextPdf
            title={`Nombre del tercero o terceros`}
            text={ids.includes(parseInt(Id_Titular)) ? testField(T_NombreRazonSocial, testada) : field(T_NombreRazonSocial)}
         />
         <TextPdf title={`RFC`} text={ids.includes(parseInt(Id_Titular)) ? testField(T_Rfc, testada) : field(T_Rfc)} />
         <TextPdf
            title={`Otorgante del crédito`}
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(OC_Id_TipoPersona) == 1 ? "Persona física" : "Persona moral", testada)
                  : field(parseInt(OC_Id_TipoPersona) == 1 ? "Persona física" : "Persona moral")
            }
         />
         <TextPdf
            title={`Nombre / institución o razón social`}
            text={ids.includes(parseInt(Id_Titular)) || parseInt(OC_Id_TipoPersona) == 1 ? testField(OC_NombreRazonSocial, testada) : field(OC_NombreRazonSocial)}
         />
         <TextPdf title={`RFC`} text={ids.includes(parseInt(Id_Titular)) || parseInt(OC_Id_TipoPersona) == 1 ? testField(OC_Rfc, testada) : field(OC_Rfc)} />
         <TextPdf
            title="¿Dónde se localiza el adeudo?"
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(EsEnMexico) == 1 ? "México" : "en el extranjero", testada)
                  : field(parseInt(EsEnMexico) == 1 ? "México" : "en el extranjero")
            }
         />

         <TextPdf
            title={`País`}
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(EsEnMexico) == 1 ? "México" : vacio(), testada)
                  : field(parseInt(EsEnMexico) == 1 ? "México" : vacio())
            }
         />
         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
