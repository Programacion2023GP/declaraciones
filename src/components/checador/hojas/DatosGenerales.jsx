import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";

export const DatosGenerales = ({ data = [], estadocivil,nacionalidades,paises,regimenes, testada = false }) => {
   const [civil, setCivil] = useState();
   const {
      Nombre,
      PrimerApellido,
      SegundoApellido,
      Curp,
      Rfc,
      Homoclave,
      CorreoInstitucional,
      CorreoPersonal,
      TelefonoCasa,
      TelefonoCelularPersonal,
      Id_EstadoCivil,
      Aclaraciones,
      Id_Nacionalidad,
      Id_PaisNacimiento,
      Id_RegimenMatrimonial
   } = data[0];
   useEffect(() => {
      setCivil(estadocivil.filter((item) => item.id === parseInt(Id_EstadoCivil))[0]?.text);
   }, []);
   useEffect(() => {}, [civil, testada]);

   const test = () => {
      return "XXXXXXXXXX";
   };
   return (
      <>
         <TextPdf title={"Nombre"} text={Nombre} />
         <TextPdf title={"Apellido Paterno"} text={PrimerApellido} />
         <TextPdf title={"Apellido Materno"} text={SegundoApellido} />
         <SquardsTextPdf title={"CURP"} text={testada ? "XXXXXXXXXXXXXXXXXX" : Curp} width={60} />
         <SquardsTextPdf title={"Rfc"} text={testada ? test() : Rfc} width={40} />
         <SquardsTextPdf title={"Homoclave"} text={testada ? "XXX" : Homoclave} width={33} />
         <TextPdf title={"Correo institucional"} text={testada ? test() : CorreoInstitucional} />
         <TextPdf title={"Correo personal"} text={testada ? test() : CorreoPersonal} />
         <TextPdf title={"Número telefonico de casa"} text={testada ? test() : TelefonoCasa} width={50} />
         <TextPdf title={"Número personal"} text={testada ? test() : TelefonoCelularPersonal} width={50} />
         <TextPdf title={"Situacíon Personal/ Estado civil"} text={testada ? test() : civil} width={100} />
         <TextPdf title={"Régimen Matrimonial"} text={testada ? test() : CorreoInstitucional} />
         <TextPdf title={"País de nacimiento"} text={testada ? test() : CorreoInstitucional} />
         <TextPdf title={"Nacionalidad"} text={testada ? test() : CorreoInstitucional} />
         <TextPdf title={"Aclaraciones/Observaciones"} text={testada ? test() : Aclaraciones} />

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
