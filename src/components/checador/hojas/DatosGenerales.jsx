import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field } from "../funciones/Funciones";

export const DatosGenerales = ({ data = [], estadocivil, nacionalidades, paises, regimenes, testada = false }) => {
   const [civil, setCivil] = useState();
   const [nacionalidad, setNacionalidad] = useState();
   const [pais, setPais] = useState();
   const [regimen, setRegimen] = useState();

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
      setNacionalidad(nacionalidades.filter((item) => item.id === parseInt(Id_Nacionalidad))[0]?.text);
      setPais(paises.filter((item) => item.id === parseInt(Id_PaisNacimiento))[0]?.text);
      setRegimen(regimenes.filter((item) => item.id === parseInt(Id_RegimenMatrimonial))[0]?.text);
   }, []);
   useEffect(() => {}, [civil, testada]);

   return (
      <>
         <TextPdf title={"Nombre"} text={field(Nombre, testada)} />
         <TextPdf title={"Apellido Paterno"} text={field(PrimerApellido, testada)} />
         <TextPdf title={"Apellido Materno"} text={field(SegundoApellido, testada)} />
         <SquardsTextPdf title={"CURP"} text={testada ? "XXXXXXXXXXXXXXXXXX" : Curp} width={60} />
         <SquardsTextPdf title={"Rfc"} text={testField(Rfc, testada)} width={40} />
         <SquardsTextPdf title={"Homoclave"} text={testada ? "XXX" : Homoclave} width={33} />
         <TextPdf title={"Correo institucional"} text={testField(CorreoInstitucional, testada)} />
         <TextPdf title={"Correo personal"} text={testField(CorreoPersonal, testada)} />
         <TextPdf title={"Número telefonico de casa"} text={testField(TelefonoCasa, testada)} width={33} />
         <TextPdf title={"Número personal"} text={testField(TelefonoCelularPersonal, testada)} width={33} />
         <TextPdf title={"Situacíon Personal/ Estado civil"} text={testField(civil, testada)} width={33} />
         <TextPdf title={"Régimen Matrimonial"} text={testField(regimen, testada)} />
         <TextPdf title={"País de nacimiento"} text={testField(pais, testada)} />
         <TextPdf title={"Nacionalidad"} text={testField(nacionalidad, testada)} />
         <TextPdf title={"Aclaraciones/Observaciones"} text={testField(Aclaraciones, testada)} width={100} />

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
