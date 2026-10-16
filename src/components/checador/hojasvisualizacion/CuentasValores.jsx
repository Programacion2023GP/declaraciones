import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const CuentasValores = ({ data = [], testada = false, inversiones = [], subInversiones = [], titular = [], monedas = [] }) => {
   const {
      Id_InversionesCuentasValores = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Id_TipoInversion = vacio(),
      Id_SubtipoInversion = vacio(),
      Id_Titular = vacio(),
      T_Id_TipoPersona = vacio(),
      T_NombreRazonSocial = vacio(),
      T_Rfc = vacio(),
      NumeroCuentaContrato = vacio(),
      Id_Pais = vacio(),
      InstitucionRazonSocial = vacio(),
      RfcInstitucion = vacio(),
      SaldoSituacionActual = vacio(),
      Id_SaldoSituacionActual = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio()
   } = data[0] || {};
   const ids = [2, 5, 6];

   return (
      <>
         <TextPdf
            title={"Tipo de inversión/Activo"}
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(inversiones, Id_TipoInversion, testada) : arrayField(inversiones, Id_TipoInversion)}
         />
         <TextPdf
            title={"BANCARIA"}
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(subInversiones, Id_SubtipoInversion, testada) : arrayField(subInversiones, Id_SubtipoInversion)}
         />
         <TextPdf
            title={"Titular de la inversión, cuenta bancaria y otro tipo de valores"}
            text={ids.includes(parseInt(Id_Titular)) || parseInt(Id_Titular) == 1 ? testArrayField(titular, Id_Titular, testada) : arrayField(titular, Id_Titular, testada)}
         />
         <Ngif condition={parseInt(Id_Titular) == 6}>
            <TextPdf title={"Tercero"} text={testField(parseInt(T_Id_TipoPersona) == 1 ? "Persona física" : "Persona moral", testada)} />

            <TextPdf title={"Nombre del tercero o terceros"} text={testField(T_NombreRazonSocial, testada)} />
            <TextPdf title={"RFC"} text={testField(T_Rfc, testada)} />
         </Ngif>

         {/* <TextPdf title={"Fondos de inversión Organizaciones privadas y/o mercantiles Posesión de monedas y/o metales"} text={``} />
         <TextPdf title={"Seguros"} text={``} />
         <TextPdf title={"Valores bursátiles"} text={``} />
         <TextPdf title={"Afores y otros"} text={``} /> */}
         <TextPdf
            title={"Número de cuenta, contrato o póliza"}
            text={ids.includes(parseInt(Id_Titular)) ? testField(NumeroCuentaContrato, testada) : testField(NumeroCuentaContrato, testada)}
         />
         <TextPdf
            title={"¿Dónde se localiza la inversión, cuenta bancaria y otro tipo de valores?"}
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(Id_Pais) == 1 ? "En México" : "En el extranjero", testada)
                  : field(parseInt(Id_Pais) == 1 ? "En México" : "En el extranjero")
            }
         />
         <TextPdf
            title={"Institución o razón social"}
            text={ids.includes(parseInt(Id_Titular)) ? testField(InstitucionRazonSocial, testada) : field(InstitucionRazonSocial)}
         />
         <TextPdf title={"RFC"} text={ids.includes(parseInt(Id_Titular)) ? testField(RfcInstitucion, testada) : field(RfcInstitucion)} />
         <TextPdf title={"Saldo a la fecha"} text={ids.includes(parseInt(Id_Titular)) ? testField(SaldoSituacionActual, testada) : field(SaldoSituacionActual)} />
         <TextPdf
            title={"Tipo de moneda"}
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(monedas, Id_SaldoSituacionActual, testada) : arrayField(monedas, Id_SaldoSituacionActual)}
         />
         <TextPdf title={"Aclaraciones/Observaciones"} text={testField(Aclaraciones, testada)} width={100} />
      </>
   );
};
