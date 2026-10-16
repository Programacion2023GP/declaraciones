import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";
export const PrestamoComodato = ({ data = [], testada = false, municipios = [], paises = [], entidades = [], vehiculos = [], relacion = [], inmuebles = [] }) => {
   const {
      Id_PrestamoComodato = vacio(),
      Id_SituacionPatrimonial = vacio(),
      EsVehiculo = vacio(),
      Id_TipoInmueble = vacio(),
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
      Id_TipoVehiculo = vacio(),
      Marca = vacio(),
      Modelo = vacio(),
      Anio = vacio(),
      NumeroSerieRegistro = vacio(),
      V_EsEnMexico = vacio(),
      V_Id_EntidadFederativa = vacio(),
      Id_TipoDuenoTitular = vacio(),
      NombreTitular = vacio(),
      RfcTitular = vacio(),
      Id_Relacion = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      V_Id_Pais = vacio(),
      TipoBien = vacio(),
      EspecifiqueOtro = vacio()
   } = data[0] || {};
   return (
      <>
         <Ngif condition={parseInt(TipoBien) == 1}>
            <TextPdf text={arrayField(vehiculos, Id_TipoVehiculo)} title={"Tipo de vehículo "} />
         </Ngif>
         <Ngif condition={parseInt(TipoBien) == 0}>
            <TextPdf text={arrayField(inmuebles, Id_TipoInmueble)} title={"Tipo de inmueble"} />
         </Ngif>
         <TextPdf text={field(Marca)} title={"Marca"} />
         <TextPdf text={field(Modelo)} title={"Modelo"} />
         <TextPdf text={field(Anio)} title={"Año"} />
         <TextPdf
            text={parseInt(Id_TipoDuenoTitular) == 1 ? testField(NumeroSerieRegistro, testada) : field(NumeroSerieRegistro)}
            title={"Número de serie o registro"}
         />
         <TextPdf
            text={parseInt(Id_TipoDuenoTitular) == 1 ? testField(NombreTitular, testada) : field(NombreTitular)}
            title={`Nombre del dueño o titular del vehículo ${parseInt(TipoBien) == 1?'vehiculo':'inmueble'}`}
         />
         <TextPdf text={parseInt(Id_TipoDuenoTitular) == 1 ? testField(RfcTitular, testada) : field(RfcTitular)} title={"RFC"} />
         <TextPdf
            text={parseInt(Id_TipoDuenoTitular) == 1 ? testArrayField(relacion, Id_Relacion, testada) : arrayField(relacion, Id_Relacion)}
            title={"Relación con el dueño o titular"}
         />
         <TextPdf
            title={`¿Dónde se encuentra registrado?`}
            text={
               parseInt(Id_TipoDuenoTitular) == 1
                  ? testField(parseInt(EsEnMexico) == 1 ? "México" : "En el extranjero", testada)
                  : field(parseInt(EsEnMexico) == 1 ? "México" : "En el extranjero")
            }
         />
         <DatosDomicilio data={data} entidades={entidades} paises={paises} municipios={municipios} testada={false} />
         <TextPdf text={testField(Aclaraciones, testada)} title={"Aclaraciones/Observaciones"} />
      </>
   );
};
