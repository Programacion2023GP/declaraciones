import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DomiDeclarante } from "./DomiDeclarante";
export const BienesInmuebles = ({
   data = [],
   testada = false,
   inmuebles = [],
   titular = [],
   adquisicion = [],
   pago = [],
   monedas = [],
   relacion = [],
   motivosbaja = [],
   municipios = [],
   entidades = [],
   paises = []
}) => {
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
               text={ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1 ? testField(TR_NombreRazonSocial, testada) : field(T_NombreRazonSocial)}
               title={`Transmisor`}
               width={50}
            />
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1 ? testField(TR_Rfc, testada) : field(T_Rfc)}
               title={`RFC`}
               width={50}
            />
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

         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(SuperficieTerreno, testada) : field(SuperficieTerreno)}
            title={`Superficie del terreno`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(Superficieconstruncion, testada) : field(Superficieconstruncion)}
            title={`Superficie de construcción`}
            width={50}
         />
         <TextPdf
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(TR_Id_TipoPersona) == 1 ? "SI" : "NO", testada)
                  : field(parseInt(TR_Id_TipoPersona) == 1 ? "SI" : "NO")
            }
            title={`Tercero`}
            width={50}
         />
         <Ngif condition={parseInt(TR_Id_TipoPersona) == 1}>
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1 ? testField(T_NombreRazonSocial, testada) : field(T_NombreRazonSocial)}
               title={`Nombre del tercero`}
               width={50}
            />
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) || parseInt(T_Id_TipoPersona) == 1 ? testField(T_Rfc, testada) : field(T_Rfc)}
               title={`RFC`}
               width={50}
            />
         </Ngif>
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(adquisicion, Id_FormaAdquisicion, testada) : arrayField(adquisicion, Id_FormaAdquisicion)}
            title={`Forma de adquisición`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(pago, Id_FormaPago, testada) : arrayField(pago, Id_FormaPago)}
            title={`Forma de pago`}
            width={50}
         />
         {/* <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(relacion, Id_Relacion, testada) : arrayField(relacion, Id_Relacion)}
            title={`Transmisor`}
            width={50}
         /> */}
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(TR_NombreRazonSocial, testada) : field(TR_NombreRazonSocial)}
            title={`Nombre o razón social del transmisor de la propiedad`}
            width={50}
         />

         <TextPdf text={ids.includes(parseInt(Id_Titular)) ? testField(TR_Rfc, testada) : field(TR_Rfc)} title={`RFC`} width={50} />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(relacion, Id_Relacion, testada) : arrayField(relacion, Id_Relacion)}
            title={`Relación del transmisor de la propiedad con la propiedad`}
            width={100}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(ValorAdquisicion, testada) : field(ValorAdquisicion)}
            title={`Valor de adquisición`}
            width={100}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testArrayField(monedas, Id_MonedaValorAdquisicion, testada) : arrayField(monedas, Id_MonedaValorAdquisicion)}
            title={`Tipo de moneda
            `}
            width={100}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? stArrayField(monedas, Id_ValorConformeA, testada) : arrayField(monedas, Id_ValorConformeA)}
            title={`El valor de adquisición del inmueble es conforme a`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(FechaAdquisicion, testada) : field(FechaAdquisicion)}
            title={`Fecha de adquisición del inmueble`}
            width={50}
         />
         <TextPdf
            text={ids.includes(parseInt(Id_Titular)) ? testField(DatoIdentificacion, testada) : field(DatoIdentificacion)}
            title={`Datos del registro público de la propiedad: folio real u otro dato que permita su identificación`}
            width={50}
         />
         <TextPdf
            title={"Ubicación del Inmueble"}
            text={
               ids.includes(parseInt(Id_Titular))
                  ? testField(parseInt(EsEnMexico) == 1 ? "En México" : "En el extranjero", testada)
                  : field(parseInt(EsEnMexico) == 1 ? "En México" : "En el extranjero")
            }
            width={50}
         />

         <DomiDeclarante testada={testada} data={data} entidades={entidades} paises={paises} municipios={municipios} />
         <Ngif condition={parseInt(Id_MotivoBaja) > 0}>
            <TextPdf
               text={ids.includes(parseInt(Id_Titular)) ? testArrayField(motivosbaja, Id_MotivoBaja, testada) : arrayField(motivosbaja, Id_MotivoBaja)}
               title={`Motivo de baja`}
               width={50}
            />
            <Ngif condition={parseInt(Id_MotivoBaja) == 4}>
               <TextPdf
                  text={ids.includes(parseInt(Id_Titular)) ? testField(OtroMotivoBaja, testada) : field(OtroMotivoBaja)}
                  title={`Otro motivo de baja`}
                  width={50}
               />
            </Ngif>
         </Ngif>
      </>
   );
};
