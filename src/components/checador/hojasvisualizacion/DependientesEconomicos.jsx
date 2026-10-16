import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const DependientesEconomicos = ({ data = {}, testada = false, relacion = [] }) => {
   const {
      Id_DatosDependienteEconomico = vacio(),
      Id_SituacionPatrimonial = vacio(),
      Nombre = vacio(),
      PrimerApellido = vacio(),
      SegundoApellido = vacio(),
      FechaNacimiento = vacio(),
      RfcDependiente = vacio(),
      Id_ParentescoRelacion = vacio(),
      EsCiudadanoExtranjero = vacio(),
      Curp = vacio(),
      HabitaDomicilioDeclarante = vacio(),
      Id_LugarDondeReside = vacio(),
      Calle = vacio(),
      NumeroExterior = vacio(),
      NumeroInterior = vacio(),
      ColoniaLocalidad = vacio(),
      Id_MunicipioAlcaldia = vacio(),
      Id_EntidadFederativa = vacio(),
      CiudadLocalidad = vacio(),
      EstadoProvincia = vacio(),
      Id_Pais = vacio(),
      CodigoPostal = vacio(),
      Id_ActividadLaboral = vacio(),
      Id_NivelOrdenGobierno = vacio(),
      Id_AmbitoPublico = vacio(),
      NombreEntePublico = vacio(),
      AreaAdscripcion = vacio(),
      FuncionPrincipal = vacio(),
      NombreEmpresaSociedadAsociacion = vacio(),
      RfcEmpresa = vacio(),
      Id_Sector = vacio(),
      EsProveedorContratistaGobierno = vacio(),
      EmpleoCargoComision = vacio(),
      FechaIngreso = vacio(),
      ValorSalarioMensualNeto = vacio(),
      Id_MonedaSalarioMensualNeto = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      Homoclave = vacio(),
      EsMexico = vacio()
   } = data[0] || {};

   return (
      <>
         <TextPdf title={"Nombre"} text={testField(Nombre, testada)} />
         <TextPdf title={"Apellido Paterno"} text={testField(PrimerApellido, testada)} />
         <TextPdf title={"Apellido Materno"} text={testField(SegundoApellido, testada)} />
         <TextPdf title={"Curp"} text={testField(Curp, testada)} width={50} />
         <TextPdf title={"Rfc"} text={testField(RfcDependiente, testada)} width={50} />
         <TextPdf title={"Fecha de nacimiento"} text={testField(FechaNacimiento, testada)} width={50} />
         <TextPdf title={"Parentesco / relación con el declarante"} text={testArrayField(relacion, Id_ParentescoRelacion, testada)} width={50} />
         <TextPdf title={"¿Es ciudadano extranjero?"} text={testField(EsCiudadanoExtranjero == 1 ? "Si" : "No", testada)} width={50} />
         {/* <TextPdf title={"¿Es dependiente economico?"} text={testField(EsDependienteEconomico == 1 ? "Si" : "No")} width={50} /> */}
         <TextPdf title={"¿Habita en el domicilio del declarante?"} text={testField(HabitaDomicilioDeclarante == 1 ? "Si" : "No", testada)} width={50} />
         <TextPdf title={"Lugar donde reside"} text={testField(EsMexico ? "México" : "Extranjero", testada)} width={50} />
         {/* <TextPdf title={"Lugar donde recide"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
         {/* <TextPdf title={"Domicilio de la pareja"} text={testField(EsMexico == 1 ? "México" : "Extranjero")} width={50} /> */}
         {parseInt(Id_ActividadLaboral) > 0 && parseInt(Id_ActividadLaboral) < 5 && (
            <TextPdf
               title="Actividad Laboral"
               text={testArrayField(
                  [
                     { value: 1, label: "Privado" },
                     { value: 2, label: "Público" },
                     { value: 3, label: "Ninguno" },
                     { value: 4, label: "Otro" }
                  ],
                  Id_ActividadLaboral,
                  testada
               )}
               width={50}
            />
         )}

         <TextPdf title={"Aclaraciones/Observaciones"} text={testField(Aclaraciones, testada)} width={100} />
      </>
   );
};
