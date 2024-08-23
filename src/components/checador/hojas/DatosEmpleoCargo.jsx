import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { DomiDeclarante } from "./DomiDeclarante";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";

export const DatosEmpleoCargo = ({ data = [], testada = false, nivelOrdenGobierno, ambitoPublico, municipios = [], entidades = [], paises = [] }) => {
   const {
      Id_DatosEmpleoCargoComision=vacio(),
      Id_SituacionPatrimonial=vacio(),
      Id_NivelOrdenGobierno=vacio(),
      Id_AmbitoPublico=vacio(),
      NombreEntePublico=vacio(),
      AreaAdscripcion=vacio(),
      EmpleoCargoComision=vacio(),
      ContratadoPorHonorarios=vacio(),
      NivelEmpleoCargoComision=vacio(),
      FuncionPrincipal=vacio(),
      FechaTomaConclusionPosesion=vacio(),
      ExtensionTelefonoOficina=vacio(),
      TelefonoOficina=vacio(),
      Calle=vacio(),
      NumeroExterior=vacio(),
      NumeroInterior=vacio(),
      ColoniaLocalidad=vacio(),
      Id_MunicipioAlcaldia=vacio(),
      Id_EntidadFederativa=vacio(),
      CiudadLocalidad=vacio(),
      EstadoProvincia=vacio(),
      Id_Pais=vacio(),
      CodigoPostal=vacio(),
      EsEnMexico=vacio(),
      CuentaConOtroCargoPublico=vacio(),
      Otro_Id_NivelOrdenGobierno=vacio(),
      Otro_Id_AmbitoPublico=vacio(),
      Otro_NombreEntePublico=vacio(),
      Otro_AreaAdscripcion=vacio(),
      Otro_EmpleoCargoComision=vacio(),
      Otro_ContratadoPorHonorarios=vacio(),
      Otro_NivelEmpleoCargoComision=vacio(),
      Otro_FuncionPrincipal=vacio(),
      Otro_FechaTomaConclusionPosesion=vacio(),
      Otro_ExtensionTelefonoOficina=vacio(),
      Otro_TelefonoOficina=vacio(),
      Otro_Calle=vacio(),
      Otro_NumeroExterior=vacio(),
      Otro_NumeroInterior=vacio(),
      Otro_ColoniaLocalidad=vacio(),
      Otro_Id_MunicipioAlcaldia=vacio(),
      Otro_Id_EntidadFederativa=vacio(),
      Otro_CiudadLocalidad=vacio(),
      Otro_EstadoProvincia=vacio(),
      Otro_Id_Pais=vacio(),
      Otro_CodigoPostal=vacio(),
      Otro_EsEnMexico=vacio(),
      Aclaraciones=vacio(),
      FechaRegistro=vacio(),
      EsActivo=vacio(),
      Rfc=vacio(),
      Puesto=vacio(),
      Sector=vacio(),
      SectorEspecificado=vacio(),
      OtroEntePublico=vacio(),
   } = data[0]||{};
   const test = () => {
      return "XXXXXXXXXX";
   };
   // const vacio = () => {
   //    return "-----------------------";
   // };

   return (
      <>
         <TextPdf title={"Nivel/Orden de gobierno"} text={nivelOrdenGobierno.filter((item) => item.id === parseInt(Id_NivelOrdenGobierno))[0]?.text} />
         <TextPdf title={"Ámbito público"} text={ambitoPublico.filter((item) => item.id === parseInt(Id_AmbitoPublico))[0]?.text} />
         <TextPdf title={"Nombre del ente público"} text={field(NombreEntePublico)} />
         <TextPdf title={"Área de adscripción"} text={field(AreaAdscripcion)} width={50} />
         <TextPdf title={"Empleo, cargo o comisión"} text={field(EmpleoCargoComision)} width={100} />
         <TextPdf title={"¿Está contratado por honorarios?"} text={field(parseInt(ContratadoPorHonorarios) == 1 ? "Si" : "No")} width={50} />

         <TextPdf title={"Nivel del empleo, cargo o comision"} text={field(NivelEmpleoCargoComision)} width={50} />
         <TextPdf title={"Función principal"} text={field(FuncionPrincipal)} width={100} />

         <TextPdf title={"Fecha de toma de posesion del empleo,cargo o comisión"} text={field(FechaTomaConclusionPosesion)} width={100} />
         <TextPdf title={"Teléfono de oficina y extensión"} text={field(TelefonoOficina + " EXT " + ExtensionTelefonoOficina)} width={100} />
         <TextPdf title={"Domiclio del empleo, cargo o comisión"} text={field(parseInt(EsEnMexico == 1) ? "En Mexico" : "En el extranjero")} width={100} />
         <DatosDomicilio key={"datos empleo"} entidades={entidades} paises={paises} data={data} municipios={municipios} testada={false} />
         <TextPdf title={"Aclaraciones"} text={field(Aclaraciones)} width={100} />
      </>
   );
};
