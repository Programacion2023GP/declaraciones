import { useEffect } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { Ngif } from "../../Reusables/conditionals/Ngif";
export const ExperienciaLaboral = ({ data = [], ambitopublico }) => {
   const {
      Aclaraciones = vacio(),
      Area = vacio(),
      AreaAdscripcion = vacio(),
      EmpleoCargoComision = vacio(),
      EsActivo = vacio(),
      FechaEngreso = vacio(),
      FechaIngreso = vacio(),
      FechaRegistro = vacio(),
      FueEnMexico = vacio(),
      FuncionPrincipal = vacio(),
      Id_AmbitoPublico = vacio(),
      Id_AmbitoSector = vacio(),
      Id_ExperienciaLaboral = vacio(),
      Id_NivelOrdenGobierno = vacio(),
      Id_Sector = vacio(),
      Id_SituacionPatrimonial = vacio(),
      NombreEmpresaSociedadAsociacion = vacio(),
      NombreEntePublico = vacio(),
      Puesto = vacio(),
      RFC = vacio(),
      SectorEspecificado = vacio()
   } = data[0] || {};

   useEffect(() => {}, []);
   return (
      <>
         <TextPdf title={"Ámbito/Sector en el que laboraste"} text={field(parseInt(Id_AmbitoSector) == 1 ? "PÚBLICO" : "PRIVADO")} width={50} />
         <TextPdf title={"Ámbito público"} text={arrayField(ambitopublico, Id_AmbitoPublico)} width={50} />
         <TextPdf title={"Nombre del ente público/Nombre de la empresa, sociedad o asosiación"} text={field(NombreEmpresaSociedadAsociacion)} width={50} />
         <TextPdf title={"RFC"} text={field(RFC)} width={50} />
         <TextPdf title={"Áerea de la adscripción"} text={field(AreaAdscripcion)} width={50} />
         <TextPdf title={"Empleo, cargo o comisión/Puesto"} text={field(EmpleoCargoComision)} width={50} />
         <TextPdf title={"Función principal"} text={field(FuncionPrincipal)} width={50} />
         <Ngif condition={parseInt(Id_Sector) > 0}>
            <TextPdf
               title={"Sector al que pertenece"}
               text={
                  Id_Sector == 0
                     ? field(SectorEspecificado)
                     : arrayField(
                          [
                             { value: 1, label: "Empresa" },
                             { value: 2, label: "Sociedad o Asociación" },
                             { value: 0, label: "Otro especifique ..." }
                          ],
                          Id_Sector
                       )
               }
               width={50}
            />
         </Ngif>
         <TextPdf title={"Fecha de ingreso"} text={field(FechaIngreso)} width={50} />
         <TextPdf title={"Fecha de egreso "} text={field(FechaEngreso)} width={50} />
         <TextPdf
            title={"Lugar donde se ubica"}
            text={arrayField(
               [
                  { value: 1, label: "Si" },
                  { value: 0, label: "No" }
               ],
               FueEnMexico
            )}
            width={50}
         />
         <TextPdf title={"Aclaraciones"} text={field(Aclaraciones)} width={100} />


      </>
   );
};
