import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const BienesInmuebles = ({ data = [], testada = false, inmuebles = [], titular = [] }) => {
   const {
      Id_BienesInmuebles = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Id_TipoInmueble = vacio(),
      Id_Titular = vacio(),
      PorcentajePropiedad = vacio(),
      SuperficieTerreno = vacio(),
      Id_UnidadSuperficieTerreno = vacio(),
      T_Id_TipoPersona = vacio(),
      T_NombreRazonSocial = vacio(),
      T_Rfc = vacio(),
      TR_Id_TipoPersona = vacio(),
      TR_NombreRazonSocial = vacio(),
      TR_Rfc = vacio(),
      Id_Relacion = vacio(),
      Id_FormaAdquisicion = vacio(),
      Id_FormaPago = vacio(),
      ValorAdquisicion = vacio(),
      Id_MonedaValorAdquisicion = vacio(),
      FechaAdquisicion = vacio(),
      DatoIdentificacion = vacio(),
      Id_ValorConformeA = vacio(),
      Calle = vacio(),
      NumeroExterior = vacio(),
      NumeroInterior = vacio(),
      ColoniaLocalidad = vacio(),
      Id_MunicipioAlcaldia = vacio(),
      Id_EntidadFederativa = vacio(),
      CiudadLocalidad = vacio(),
      EstadoProvincia = vacio(),
      Id_Pais = vacio(),
      CodigoPostal = vacio(),
      EsEnMexico = vacio(),
      Id_MotivoBaja = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      Superficieconstruncion = vacio(),
      motivobaja = vacio(),
      OtroMotivoBaja = vacio()
   } = data[0] || {};
   //#region 1 DECLARANTE
   const ids = [2, 5, 6];
   return (
      <>
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(inmuebles, Id_TipoInmueble, testada) : arrayField(inmuebles, Id_TipoInmueble)}
            title={`Tipo de inmueble`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(titular, Id_Titular, testada) : arrayField(titular, Id_Titular)}
            title={`Titular del inmueble`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(PorcentajePropiedad, testada) : field(PorcentajePropiedad)}
            title={`Porcentaje de propiedad del declarante
conforme a escrituración o contrato`}
            width={100}
         />

         <TextPdf text={ids.includes(parseInt(Id_Titular)) ? testField(SuperficieTerreno, testada) : field(SuperficieTerreno)} title={`Superficie del terreno`} />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(Superficieconstruncion, testada) : field(Superficieconstruncion)}
            title={`Superficie de construcción`}
         />
         <TextPdf
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(TR_Id_TipoPersona) == 1 ? "SI" : "NO", testada)
                  : field(parseInt(TR_Id_TipoPersona) == 1 ? "SI" : "NO")
            }
            title={`Tercero`}
         />
         <Ngif condition={parseInt(TR_Id_TipoPersona) == 1}>
            <TextPdf text={ids.includes(parseInt(Id_Titular)) ? testField(T_NombreRazonSocial, testada) : field(T_NombreRazonSocial)} title={`Nombre del tercero`} />
            <TextPdf text={ids.includes(parseInt(Id_Titular)) ? testField(T_Rfc, testada) : field(T_Rfc)} title={`RFC`} />
         </Ngif>
      </>
   );
};
