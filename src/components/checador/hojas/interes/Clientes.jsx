import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../../funciones/Funciones";
export const Clientes = ({ data = [] }) => {
   const {
      relacion = vacio(),
      RfcEmpresa = vacio(),
      cliente_principal = vacio(),
      NombreEmpresa = vacio(),
      NombreRazonSocial = vacio(),
      RfcCliente = vacio(),
      sector = vacio(),
      MontoMensual = vacio(),
      moneda = vacio(),
      EsEnMexico = vacio(),
      Pais = vacio(),
      Municipio = vacio(),
      Aclaraciones = vacio()
   } = data[0] || {};
   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={`Relacion`} text={testField(relacion)} />
         <TextPdf title={`Nombre de la empresa o servicio que proporciona`} text={testField(NombreEmpresa)} />
         <TextPdf title={`Rfc empresa`} text={testField(RfcEmpresa)} />
         <TextPdf title={`Cliente principal`} text={testField(cliente_principal)} />
         <TextPdf title={`Nombre o la razón social del cliente principal`} text={testField(NombreRazonSocial)} />
         <TextPdf title={`Rfc cliente`} text={testField(RfcCliente)} />
        
         <TextPdf title={`Sector productivo que pertenece`} text={testField(sector)} />
         <TextPdf title={`Monto mensual neto de su representación`} text={testField(MontoMensual)} />
         <TextPdf title={`Tipo de moneda`} text={testField(moneda)} />
         <TextPdf title={`Lugar donde se ubica`} text={testField(EsEnMexico == "si" ? "México" : "Extranjero")} />
         {EsEnMexico ? <TextPdf title={`Entidad federativa`} text={testField(Municipio)} /> : <TextPdf title={`Pais`} text={testField(Pais)} />}
         <TextPdf title={`Aclaraciones/Observaciones`} text={testField(Aclaraciones)} />
      </>
   );
};
