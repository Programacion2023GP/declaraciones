import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DatosGenerales } from "./DatosGenerales";
export const DatosPareja = ({ data = {}, testada = false, }) => {
   const {
      nombre = vacio(),
      primerApellido = vacio(),
      segundoApellido = vacio(),
      fechaNacimiento = vacio(),
      rfc = vacio(),
      relacionConDeclarante = vacio(),
      ciudadanoExtranjero = vacio(),
      curp = vacio(),
      esDependienteEconomico = vacio(),
      habitaDomicilioDeclarante = vacio(),
      Id_ActividadLaboral = vacio(),
      Aclaraciones = vacio(),
      actividadLaboral = {}
   } = data || {};

   return (
      <>
         <TextPdf title={"Nombre"} text={testField(nombre, testada)} />
         <TextPdf title={"Apellido Paterno"} text={testField(primerApellido, testada)} />
         <TextPdf title={"Apellido Materno"} text={testField(segundoApellido, testada)} />
         <TextPdf title={"Curp"} text={testField(curp, testada)} width={50} />
         <TextPdf title={"Rfc"} text={testField(rfc, testada)} width={50} />
         <TextPdf title={"Fecha de nacimiento"} text={testField(fechaNacimiento, testada)} width={50} />
         <TextPdf title={"Relación con el declarante"} text={testField(relacionConDeclarante, testada)} width={50} />
         <TextPdf title={"¿Es ciudadano extranjero?"} text={testField(ciudadanoExtranjero == 1 ? "Si" : "No", testada)} width={50} />
         <TextPdf title={"¿Es dependiente economico?"} text={testField(esDependienteEconomico == 1 ? "Si" : "No", testada)} width={50} />
         <TextPdf title={"¿Habita en el domicilio del declarante?"} text={testField(habitaDomicilioDeclarante == 1 ? "Si" : "No", testada)} width={50} />
         {/* <TextPdf title={"¿Habita en el domicilio del declarante?"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
         <TextPdf title={"Lugar donde recide"} text={testField(ciudadanoExtranjero == 0 ? "México" : "Extranjero", testada)} width={50} />
         {/* <TextPdf title={"Domicilio de la pareja"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
         {parseInt(Id_ActividadLaboral) > 0 && parseInt(Id_ActividadLaboral) < 5 && (
            <TextPdf
               title="Actividad Laboral"
               text={testField(
                
                  actividadLaboral,
                  testada
               )}
               width={50}
            />
         )}

         <TextPdf title={"Aclaraciones/Observaciones"} text={testField(Aclaraciones, testada)} width={50} />
      </>
   );
};
