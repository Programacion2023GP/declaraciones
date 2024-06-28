import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField } from "../funciones/Funciones";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const BienesMuebles = ({ data = [], testada, bienes = [], titular = [], relacion = [], adquisicion = [], pago = [], monedas = [], motivosBajas = [] }) => {
   const {
      Id_BienesMuebles = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Id_TipoBien = vacio(),
      Id_Titular = vacio(),
      TR_Id_TipoPersona = vacio(),
      TR_NombreRazonSocial = vacio(),
      TR_Rfc = vacio(),
      Id_Relacion = vacio(),
      DescripcionGeneralBien = vacio(),
      T_Id_TipoPersona = vacio(),
      T_NombreRazonSocial = vacio(),
      T_Rfc = vacio(),
      Id_FormaAdquisicion = vacio(),
      Id_FormaPago = vacio(),
      ValorAdquisicion = vacio(),
      Id_MonedaValorAdquisicion = vacio(),
      FechaAdquisicion = vacio(),
      Id_MotivoBaja = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      Copropiedad = vacio(),
      EspecifiqueOtroTipo = vacio()
   } = data[0] || {};
   const ids = [2, 5, 6];

   return (
      <>
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(bienes, Id_TipoBien, testada) : arrayField(bienes, Id_TipoBien)}
            title={`Tipo del bien`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(titular, Id_Titular, testada) : arrayField(titular, Id_Titular)}
            title={`Titular del bien`}
            width={50}
         />
         <TextPdf
            title={`Transmisor`}
            text={
               ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1
                  ? testField(TR_Id_TipoPersona == 1 ? "Si" : "No", testada)
                  : field(TR_Id_TipoPersona == 1 ? "Si" : "No")
            }
         />
         <TextPdf
            title={`Nombre o razón social del transmisor`}
            text={ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1 ? testField(TR_NombreRazonSocial, testada) : field(TR_NombreRazonSocial)}
         />
         <TextPdf title={`RFC`}   text={ids.includes(parseInt(Id_Titular))  ? testField(TR_Rfc, testada) : field(TR_Rfc)}/>
         
         <TextPdf title={`Relación del transmisor del mueble con el titular`} />
         <Ngif condition={parseInt(Copropiedad) == 1}>
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) || parseInt(TR_Id_TipoPersona) == 1 ? testField(T_NombreRazonSocial, testada) : field(T_NombreRazonSocial)}
               title={`Nombre del tercero o terceros`}
               width={50}
            />
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) || parseInt(TR_Id_TipoPersona) == 1 ? testField(T_Rfc, testada) : field(T_Rfc)}
               title={`RFC`}
               width={50}
            />
            {/* <TextPdf title={`Tercero`} />
         <TextPdf title={`Nombre del tercero o terceros`} />
         <TextPdf title={`RFC`} /> */}
         </Ngif>

         <TextPdf title={`Descripcion General del Bien`} />
         <TextPdf title={`Forma de adquisición`} />
         <TextPdf title={`Fecha de adquisición`} />
         <TextPdf title={`Valor de adquisición del mueble`} />
         <TextPdf title={`Forma de pago`} />
         <TextPdf title={`Tipo de moneda`} />
         <TextPdf title={`En caso de baja del mueble incluir motivo`} />
         <TextPdf title={`Aclaraciones/Observaciones`} width={100} />
      </>
   );
};
