import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, vacio, arrayField, testArrayField } from "../funciones/Funciones";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const Vehiculos = ({ data = [], testada = false, titular, vehiculos, relacion }) => {
   const {
      Id_Vehiculos = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Id_TipoVehiculo = vacio(),
      Id_Titular = vacio(),
      EspecifiqueVehiculo = vacio(),
      TR_Id_TipoPersona = vacio(),
      TR_NombreRazonSocial = vacio(),
      TR_Rfc = vacio(),
      Id_Relacion = vacio(),
      Marca = vacio(),
      Modelo = vacio(),
      Anio = vacio(),
      NumeroSerieRegistro = vacio(),
      T_Id_TipoPersona = vacio(),
      T_NombreRazonSocial = vacio(),
      T_Rfc = vacio(),
      EsEnMexico = vacio(),
      Id_EntidadFederativa = vacio(),
      Id_FormaAdquisicion = vacio(),
      Id_FormaPago = vacio(),
      ValorAdquisicion = vacio(),
      Id_MonedaValorAdquisicion = vacio(),
      FechaAdquisicion = vacio(),
      Id_MotivoBaja = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      EspecifiqueMotivoBaja = vacio()
   } = data[0] || {};
   useEffect(() => {}, []);

   return (
      <>
         <TextPdf
            text={parseInt(T_Id_TipoPersona) != 0 ? testArrayField(vehiculos, Id_TipoVehiculo, testada) : arrayField(vehiculos, Id_TipoVehiculo)}
            title={"Tipo de vehículo "}
         />
         <TextPdf
            text={parseInt(T_Id_TipoPersona) != 0 ? testArrayField(titular, Id_Titular, testada, "value", "label") : arrayField(titular, Id_Titular, "value", "label")}
            title={"Titular del vehículo"}
         />
         <TextPdf
            text={parseInt(T_Id_TipoPersona) != 0 || parseInt(T_Id_TipoPersona) == 1 ? testField(T_NombreRazonSocial) : field(T_NombreRazonSocial)}
            title={"Transmisor"}
         />
         <TextPdf text={parseInt(T_Id_TipoPersona) != 0 || parseInt(T_Id_TipoPersona) == 1 ? testField(T_Rfc) : field(T_Rfc)} title={"RFC"} />
         <Ngif condition={parseInt(T_Id_TipoPersona) == 1}>
            <TextPdf
               text={parseInt(T_Id_TipoPersona) != 0 ? testArrayField(relacion, Id_Relacion, testada) : arrayField(relacion, Id_Relacion)}
               title={"Relación del transmisor del vehículo con el titular"}
            />
            <TextPdf text={testField(TR_Id_TipoPersona == 1 ? "Persona física" : "Persona moral", testada)} title={`Tercero`} width={50} />

            <TextPdf text={testField(TR_NombreRazonSocial, testada)} title={`Nombre del tercero`} width={50} />

            <TextPdf text={testField(TR_Rfc, testada)} title={`RFC`} width={50} />
         </Ngif>
         <TextPdf text={parseInt(T_Id_TipoPersona) != 0 ? testField(Marca, testada) : field(Marca)} title={"Marca"} />
         <TextPdf text={parseInt(T_Id_TipoPersona) != 0 ? testField(Modelo, testada) : field(Modelo)} title={"Modelo"} />
         <TextPdf text={parseInt(T_Id_TipoPersona) != 0 ? testField(Anio, testada) : field(Anio)} title={"Año"} />
         <TextPdf text={parseInt(T_Id_TipoPersona) != 0 ? testField(NumeroSerieRegistro, testada) : field(NumeroSerieRegistro)} title={"Número de serie o registro"} />
         {/* col={12}
            title={"¿Dónde se encuentra registrado?"}
            name={"EsEnMexico"}
            options={[
               { value: 0, label: "En el extranjero" },
               { value: 1, label: "En México" } */}
         <TextPdf
            text={
               parseInt(T_Id_TipoPersona) != 0
                  ? testField(parseInt(EsEnMexico) == 1 ? "En méxico" : "En el extranjero")
                  : field(parseIn(EsEnMexico) == 1 ? "En méxico" : "En el extranjero")
            }
            title={"¿Dónde se encuentra registrado?"}
         />
      </>
   );
};
