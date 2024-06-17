import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";

export const DomicilioDeclarante = ({ data = [], testada = false }) => {
   const test = () => {
      return "XXXXXXXXXX";
   };
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
   return (
      <>
         <OptionsPdf title={"Es de mexico"} options={["Si", "No"]} value={EsEnMexico == 1 ? "Si" : "No"} />
         <TextPdf title={"Calle"} text={testada ? test() : Calle} />
         <TextPdf title={"Número Exterior"} text={testada ? test() : NumeroExterior} />
         <TextPdf title={"Número Interior"} text={testada ? test() : NumeroInterior} />
         <TextPdf title={"Colonia/Localidad"} text={testada ? test() : ColoniaLocalidad} />
         <TextPdf title={"Municipio/Alcaldia"} text={testada ? test() : Id_MunicipioAlcaldia} />
         <TextPdf title={"Entidad Federativa"} text={testada ? test() : Id_EntidadFederativa} />
         <TextPdf title={"Código postal"} text={testada ? test() : CodigoPostal} width={100}/>

         {/* <SquardsTextPdf title={"CURP"} text={testada ? "XXXXXXXXXXXXXXXXXX" : Curp} width={60} />
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
