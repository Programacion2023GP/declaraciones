import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const DependientesEconomicos = ({ data = {}, testada = false,}) => {
   const {

      nombre = vacio(),
      primerApellido = vacio(),
      segundoApellido = vacio(),
      fechaNacimiento = vacio(),
      rfc = vacio(),
      parentescoRelacion = {},
      extranjero = vacio(),
      curp = vacio(),
      habitaDomicilioDeclarante = vacio(),
      actividadLaboral = {},
      Aclaraciones = vacio()
   } = data || {};
   useEffect(()=>{
      console.log("acas",data);
   },[])
   return (
      <>
         <TextPdf title={"Nombre"} text={testField(nombre, testada)} />
         <TextPdf title={"Apellido Paterno"} text={testField(primerApellido, testada)} />
         <TextPdf title={"Apellido Materno"} text={testField(segundoApellido, testada)} />
         <TextPdf title={"Curp"} text={testField(curp, testada)} width={50} />
         <TextPdf title={"Rfc"} text={testField(rfc, testada)} width={50} />
         <TextPdf title={"Fecha de nacimiento"} text={testField(fechaNacimiento, testada)} width={50} />
         <TextPdf title={"Parentesco / relación con el declarante"} text={testField(parentescoRelacion?.valor, testada)} width={50} />
         <TextPdf title={"¿Es ciudadano extranjero?"} text={testField(extranjero == 1 ? "Si" : "No", testada)} width={50} />
         {/* <TextPdf title={"¿Es dependiente economico?"} text={testField(EsDependienteEconomico == 1 ? "Si" : "No")} width={50} /> */}
         <TextPdf title={"¿Habita en el domicilio del declarante?"} text={testField(habitaDomicilioDeclarante == 1 ? "Si" : "No", testada)} width={50} />
         <TextPdf title={"Lugar donde reside"} text={testField(!extranjero ? "México" : "Extranjero", testada)} width={50} />
         {/* <TextPdf title={"Lugar donde recide"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
         {/* <TextPdf title={"Domicilio de la pareja"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
            <TextPdf
               title="Actividad Laboral"
               text={testArrayField(
                  actividadLaboral?.valor,
                  testada
               )}
               width={50}
            />
         

         <TextPdf title={"Aclaraciones/Observaciones"} text={testField(Aclaraciones, testada)} width={100} />
      </>
   );
};
