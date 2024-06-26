import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField } from "../funciones/Funciones";

export const DatosCurriculares = ({ data = [], testada = false, nivelEstudios = [], estatus = [], documentosObtenidos = [] }) => {
   const [estudio, setEstudio] = useState();
   const [estatu, setEstatu] = useState();
   const [documento, setDocumento] = useState();

   const {
      Id_DatosCurriculares,
      Id_SituacionPatrimonial,
      Id_Nivel,
      NombreInstitucionEducativa,
      Id_UbicacionInstitucionEducativa,
      CarreraAreaConocimiento,
      Id_Estatus,
      Id_DocumentoObtenido,
      FechaObtencion,
      Aclaraciones,
      FechaRegistro,
      EsActivo,
      
   } = data[0];
   useEffect(() => {
  
      setEstudio(nivelEstudios.filter((item) => item.id === parseInt(Id_Nivel))[0]?.text);
      setEstatu(estatus.filter((item) => item.id === parseInt(Id_Estatus))[0]?.text);
      setDocumento(documentosObtenidos.filter((item) => item.id === parseInt(Id_DocumentoObtenido))[0]?.text);
   }, []);

   return (
      <>
         <TextPdf title={"Nivel escolar"} text={field(estudio)} width={50} />
         <TextPdf title={"Institución educativa"} text={field(NombreInstitucionEducativa)} width={50} />
         <TextPdf title={"Carrera o área de conocimiento"} text={field(CarreraAreaConocimiento)} width={50} />
         <TextPdf title={"Estatus"} text={field(estatu)} width={50} />
         <TextPdf title={"Documento obtenido"} text={field(documento)} width={50} />
         <TextPdf title={"Fecha de obtención del documento"} text={field(FechaObtencion)} width={50} />
         <TextPdf title={"Lugar donde se ubica la institución educativa"} text={parseInt(Id_UbicacionInstitucionEducativa) == 1 ? "En México" : "En el extranjero"} width={50} />
         <TextPdf title={"Aclaraciones/Observaciones"} text={field(Aclaraciones)} width={50} />

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
