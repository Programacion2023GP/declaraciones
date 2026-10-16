import { useEffect } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const ExperienciaLaboral = ({ data = {} }) => {

   const {
      ambitoSector={},
      ambitoPublico = vacio(),
      areaAdscripcion = vacio(),
      area = vacio(),
      empleoCargoComision = vacio(),
      funcionPrincipal = vacio(),
      fechaIngreso = vacio(),
      fechaEgreso = vacio(),
      ubicacion = vacio(),
      nombreEmpresaSociedadAsociacion = vacio(),

      rfc = vacio(),
      Aclaraciones = vacio(),
     
   } = data || {};
  
   useEffect(() => {


   }, []);
   return (
      <>
         <TextPdf title={"Ámbito/Sector en el que laboraste"} text={field(ambitoSector?.valor)} width={50} />
         <TextPdf title={"Ámbito público"} text={field(ambitoPublico)} width={50} />
         <TextPdf title={"Nombre del ente público/Nombre de la empresa, sociedad o asosiación"} text={field(nombreEmpresaSociedadAsociacion)} width={50} />
         <TextPdf title={"RFC"} text={field(rfc)} width={50} />
         <TextPdf title={"Áerea de la adscripción"} text={field(areaAdscripcion || area)} width={50} />
         <TextPdf title={"Empleo, cargo o comisión/Puesto"} text={field(empleoCargoComision)} width={50} />
         <TextPdf title={"Función principal"} text={field(funcionPrincipal)} width={50} />
         <Ngif condition={parseInt(ambitoSector?.Id_AmbitoSector) > 0}>
            <TextPdf
               title={"Sector al que pertenece"}
               text={
                  ambitoSector?.Id_AmbitoSector == 0
                     ? field("otro")
                     : arrayField(
                          [
                             { value: 1, label: "Empresa" },
                             { value: 2, label: "Sociedad o Asociación" },
                             { value: 0, label: "Otro especifique ..." }
                          ],
                          ambitoSector?.Id_AmbitoSector
                       )
               }
               width={50}
            />
         </Ngif>
         <TextPdf title={"Fecha de ingreso"} text={field(fechaIngreso)} width={50} />
         <TextPdf title={"Fecha de egreso "} text={field(fechaEgreso)} width={50} />
         <TextPdf title={"Lugar donde se ubica"} text={field(ubicacion)} width={50} />
         <TextPdf title={"Aclaraciones"} text={field(Aclaraciones)} width={100} />
      </>
   );
};
