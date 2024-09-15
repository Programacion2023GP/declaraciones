import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";

export const DatosCurriculares = ({ data = [], testada = false, nivelEstudios = [], estatus = [], documentosObtenidos = [] }) => {
   const [estudio, setEstudio] = useState();
   const [estatu, setEstatu] = useState();
   const [documento, setDocumento] = useState();

   const {
      Id_DatosCurriculares=vacio(),
      Id_SituacionPatrimonial=vacio(),
      Id_Nivel=vacio(),
      NombreInstitucionEducativa=vacio(),
      Id_UbicacionInstitucionEducativa=vacio(),
      CarreraAreaConocimiento=vacio(),
      Id_Estatus=vacio(),
      Id_DocumentoObtenido=vacio(),
      FechaObtencion=vacio(),
      Aclaraciones=vacio(),
      FechaRegistro=vacio(),
      EsActivo=vacio(),
      
   } = data[0]||{};
   useEffect(() => {
  
      setEstudio(nivelEstudios.filter((item) => item.id === parseInt(Id_Nivel))[0]?.text);
      setEstatu(estatus.filter((item) => item.id === parseInt(Id_Estatus))[0]?.text);
      setDocumento(documentosObtenidos.filter((item) => item.id === parseInt(Id_DocumentoObtenido))[0]?.text);
   }, []);

   return (
      <>
         <TextPdf title={"Nivel escolar"} text={field(nivelEstudios.filter((item) => item.id === parseInt(Id_Nivel))[0]?.text)} width={50} />
         <TextPdf title={"Institución educativa"} text={field(NombreInstitucionEducativa)} width={50} />
         <TextPdf title={"Carrera o área de conocimiento"} text={field(CarreraAreaConocimiento)} width={50} />
         <TextPdf title={"Estatus"} text={field(estatus.filter((item) => item.id === parseInt(Id_Estatus))[0]?.text)} width={50} />
         <TextPdf title={"Documento obtenido"} text={field(documentosObtenidos.filter((item) => item.id === parseInt(Id_DocumentoObtenido))[0]?.text)} width={50} />
         <TextPdf title={"Fecha de obtención del documento"} text={field(FechaObtencion)} width={50} />
         <TextPdf title={"Lugar donde se ubica la institución educativa"} text={parseInt(Id_UbicacionInstitucionEducativa) == 1 ? "En México" : "En el extranjero"} width={50} />
         <TextPdf title={"Aclaraciones/Observaciones"} text={field(Aclaraciones)} width={50} />

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
