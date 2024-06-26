import { testField, field, testArrayField, arrayField } from "../../funciones/Funciones";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../../Reusables/pdf/PdfDeclaracion";
import { useEffect, useState } from "react";
import { Ngif } from "../../../Reusables/conditionals/Ngif";

export const DatosDomicilio = ({ data = [], testada = false, municipios = [], entidades, paises }) => {
   const [municipio, setMunicipio] = useState();
   const [entidad, setEntidad] = useState();
   const [pais, setPais] = useState();
   const {
      Aclaraciones,
      Calle,
      CiudadLocalidad,
      CodigoPostal,
      ColoniaLocalidad,
      EsActivo,
      EsEnMexico,
      EstadoProvincia,
      FechaRegistro,
      Id_DomicilioDeclarante,
      Id_EntidadFederativa,
      Id_MunicipioAlcaldia,
      Id_Pais,
      Id_SituacionPatrimonial,

      NumeroExterior,
      NumeroInterior
   } = data[0];
   useEffect(() => {
      setMunicipio(testArrayField(municipios, Id_MunicipioAlcaldia, testada));
      setEntidad(testArrayField(entidades, Id_EntidadFederativa, testada));
      setPais(testArrayField(paises, Id_Pais, testada));
   }, []);
   return (
      <>
         <TextPdf title={"Calle"} text={testField(Calle, testada)} />
         <TextPdf title={"Número Exterior"} text={testField(NumeroExterior, testada)} />
         <TextPdf title={"Número Interior"} text={testField(NumeroInterior, testada)} />
         <TextPdf title={"Colonia/Localidad"} text={testField(ColoniaLocalidad, testada)} />
         <Ngif condition={parseInt(EsEnMexico) == 1}>
            <TextPdf title={"Municipio/Alcaldia"} text={testField(municipio, testada)} />
            <TextPdf title={"Entidad Federativa"} text={testField(entidad, testada)} />
         </Ngif>
         <Ngif condition={parseInt(EsEnMexico) == 0}>
            <TextPdf title={"Pais"} text={pais} />
            <TextPdf title={"Estado Provincia"} text={testField(EstadoProvincia, testada)} />
         </Ngif>

         <TextPdf title={"Código postal"} text={testField(CodigoPostal, testada)} width={100} />
      </>
   );
};
