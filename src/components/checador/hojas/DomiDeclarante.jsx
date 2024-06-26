import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField,vacio } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";
export const DomiDeclarante = ({ data = [], testada = false, municipios = [], entidades, paises }) => {
   const [municipio, setMunicipio] = useState();
   const [entidad, setEntidad] = useState();
   const [pais, setPais] = useState();
   const {
      Aclaraciones = vacio(),
      Calle = vacio(),
      CiudadLocalidad = vacio(),
      CodigoPostal = vacio(),
      ColoniaLocalidad = vacio(),
      EsActivo = vacio(),
      EsEnMexico = vacio(),
      EstadoProvincia = vacio(),
      FechaRegistro = vacio(),
      Id_DomicilioDeclarante = vacio(),
      Id_EntidadFederativa = vacio(),
      Id_MunicipioAlcaldia = vacio(),
      Id_Pais = vacio(),
      Id_SituacionPatrimonial = vacio(),

      NumeroExterior = vacio(),
      NumeroInterior = vacio()
   } = data[0] || {};

   return (
      <>
         <TextPdf text={testField(parseInt(EsEnMexico) == 1 ? "Sí" : "No", testada)} title={"¿Es de México?"} />
         <DatosDomicilio entidades={entidades} paises={paises} data={data} municipios={municipios} testada={testada} />

         {/* <SquardsTextPdf title={"CURP"} text={testada ? "XXXXXXXXXXXXXXXXXX" : Curp} width={60)} />
          <SquardsTextPdf title={"Rfc"} text={testada ? test() : Rfc} width={40} />
          <SquardsTextPdf title={"Homoclave"} text={testada ? "XXX" : Homoclave} width={33} />
          <TextPdf title={"Correo institucional"} text={testada ? test() : CorreoInstitucional} />
          <TextPdf title={"Correo personal"} text={testada ? test() : CorreoPersonal} />
          <TextPdf title={"Número telefonico de casa"} text={testada ? test() : TelefonoCasa} width={50} />
          <TextPdf title={"Número personal"} text={testada ? test() : TelefonoCelularPersonal} width={50} />
          <TextPdf title={"Situacíon Personal/ Estado civil"} text={testada ? test() : civil} width={100} /> */}

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
