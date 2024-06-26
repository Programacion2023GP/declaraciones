import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { DomiDeclarante } from "./DomiDeclarante";
import { testField, field, testArrayField, arrayField } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";

export const DatosEmpleoCargo = ({ data = [], testada = false, nivelOrdenGobierno, ambitoPublico,municipios=[], entidades=[], paises=[] }) => {
   const {
      Id_DatosEmpleoCargoComision,
      Id_SituacionPatrimonial,
      Id_NivelOrdenGobierno,
      Id_AmbitoPublico,
      NombreEntePublico,
      AreaAdscripcion,
      EmpleoCargoComision,
      ContratadoPorHonorarios,
      NivelEmpleoCargoComision,
      FuncionPrincipal,
      FechaTomaConclusionPosesion,
      ExtensionTelefonoOficina,
      TelefonoOficina,
      Calle,
      NumeroExterior,
      NumeroInterior,
      ColoniaLocalidad,
      Id_MunicipioAlcaldia,
      Id_EntidadFederativa,
      CiudadLocalidad,
      EstadoProvincia,
      Id_Pais,
      CodigoPostal,
      EsEnMexico,
      CuentaConOtroCargoPublico,
      Otro_Id_NivelOrdenGobierno,
      Otro_Id_AmbitoPublico,
      Otro_NombreEntePublico,
      Otro_AreaAdscripcion,
      Otro_EmpleoCargoComision,
      Otro_ContratadoPorHonorarios,
      Otro_NivelEmpleoCargoComision,
      Otro_FuncionPrincipal,
      Otro_FechaTomaConclusionPosesion,
      Otro_ExtensionTelefonoOficina,
      Otro_TelefonoOficina,
      Otro_Calle,
      Otro_NumeroExterior,
      Otro_NumeroInterior,
      Otro_ColoniaLocalidad,
      Otro_Id_MunicipioAlcaldia,
      Otro_Id_EntidadFederativa,
      Otro_CiudadLocalidad,
      Otro_EstadoProvincia,
      Otro_Id_Pais,
      Otro_CodigoPostal,
      Otro_EsEnMexico,
      Aclaraciones,
      FechaRegistro,
      EsActivo,
      Rfc,
      Puesto,
      Sector,
      SectorEspecificado,
      OtroEntePublico
   } = data[0];
   const test = () => {
      return "XXXXXXXXXX";
   };
   const vacio = () => {
      return "-----------------------";
   };
 
   return (
      <>
         <TextPdf title={"Nivel/Orden de gobierno"} text={nivelOrdenGobierno.filter((item) => item.id === parseInt(Id_NivelOrdenGobierno))[0]?.text} />
         <TextPdf title={"Ámbito público"} text={ambitoPublico.filter((item) => item.id === parseInt(Id_AmbitoPublico))[0]?.text} />
         <TextPdf title={"Nombre del ente público"} text={field(NombreEntePublico)} />
         <TextPdf title={"Área de adscripción"} text={field(AreaAdscripcion)} width={50} />
         <TextPdf title={"Empleo, cargo o comisión"} text={field(EmpleoCargoComision)} width={50} />
         <TextPdf title={"¿Está contratado por honorarios?"} text={field(parseInt(ContratadoPorHonorarios) == 1 ? "Si" : "No")} width={50} />

         <TextPdf title={"Empleo, cargo o comisión"} text={field(NivelEmpleoCargoComision)} width={50} />
         <TextPdf title={"Función principal"} text={field(FuncionPrincipal)} width={100} />

         <TextPdf title={"Fecha de toma de posesion del empleo,cargo o comisión"} text={field(FechaTomaConclusionPosesion)} width={100} />
         <TextPdf title={"Teléfono de oficina y extensión"} text={field(TelefonoOficina + " EXT " + ExtensionTelefonoOficina)} width={100} />
         <TextPdf title={"Domiclio del empleo, cargo o comisión"} text={field(parseInt(EsEnMexico == 1) ? "En Mexico" : "En el extranjero")} width={100} />
         <DatosDomicilio  key={'datos empleo'} entidades={entidades} paises={paises} data={data} municipios={municipios} testada={false}/>
         <TextPdf title={"Aclaraciones"} text={field(Aclaraciones)} width={100} />

         
      </>
   );
};
