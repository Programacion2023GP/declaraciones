import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, vacio } from "../funciones/Funciones";

export const DatosGenerales = ({ data = {}, testada =false}) => {
  
   const {
      nombre = vacio(),
      primerApellido = vacio(),
      segundoApellido = vacio(),
      curp,
      correoElectronico: { institucional = vacio(), personal = vacio() } = {},
      rfc: { rfc = vacio(), homoClave = vacio() } = {}, // <--- notice RFC: { ... }
      telefono: { casa = vacio(), celularPersonal = vacio() } = {},
      situacionPersonalEstadoCivil = {},
      regimenMatrimonial ={},
      aclaracionesObservaciones,
     paisNacimiento,
      nacionalidad
   } = data || {};
 

   return (
      <>
         <TextPdf title={"Nombre"} text={field(nombre, testada)} />
         <TextPdf title={"Apellido Paterno"} text={field(primerApellido, testada)} />
         <TextPdf title={"Apellido Materno"} text={field(segundoApellido, testada)} />
        
            <>
            <TextPdf title={"CURP"} text={testada ? "XXXXXXXXXXXXXXXXXX" : curp} width={50} />
               <TextPdf title={"Rfc"} text={testField(rfc, testada)} width={50} />
               <TextPdf title={"Homoclave"} text={testada ? "XXX" : homoClave} width={50} />
            <TextPdf title={"Correo institucional"} text={testField(institucional, testada)} />
               <TextPdf title={"Correo personal"} text={testField(personal, testada)} />
               <TextPdf title={"Número telefonico de casa"} text={testField(casa, testada)} width={50} />
            <TextPdf title={"Número personal"} text={testField(celularPersonal, testada)} width={50} />
               <TextPdf
                  title={"Situacíon Personal/ Estado civil"}
               text={testField(situacionPersonalEstadoCivil?.valor, testada)}
                  width={50}
               />
            <TextPdf title={"Régimen Matrimonial"} text={testField(regimenMatrimonial?.valor, testada)} />
            <TextPdf title={"País de nacimiento"} text={testField(paisNacimiento, testada)} />
            <TextPdf title={"Nacionalidad"} text={testField(nacionalidad, testada)} />
            <TextPdf title={"Aclaraciones/Observaciones"} text={testField(aclaracionesObservaciones, testada)} width={100} />
            </>
         

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
