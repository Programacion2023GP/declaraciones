import { useEffect, useState } from "react";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";

export const DatosCurriculares = ({ data = {}, testada = false,  }) => {


   const {
      nivel ={},
      institucionEducativa ={},
      carreraAreaConocimiento =vacio(),
      estatus =vacio(),
      documentoObtenido =vacio(),
      fechaObtencion =vacio(),
      aclaracionesObservaciones = vacio(),
      
   } = data||{};
   useEffect(() => {
  
    
   }, []);

   return (
      <>
         <TextPdf title={"Nivel escolar"} text={field(nivel?.valor)} width={50} />
         <TextPdf title={"Institución educativa"} text={field(institucionEducativa?.nombre)} width={50} />
         <TextPdf title={"Carrera o área de conocimiento"} text={field(carreraAreaConocimiento)} width={50} />
         <TextPdf title={"Estatus"} text={field(estatus)} width={50} />
         <TextPdf title={"Documento obtenido"} text={field(documentoObtenido)} width={50} />
         <TextPdf title={"Fecha de obtención del documento"} text={field(fechaObtencion)} width={50} />
         <TextPdf title={"Lugar donde se ubica la institución educativa"} text={field(institucionEducativa?.ubicacion)} width={50} />
         <TextPdf title={"Aclaraciones/Observaciones"} text={field(aclaracionesObservaciones)} width={50} />

         {/* <OptionsPdf title={"Es de mexico"} options={["SI", "NO"]} value={"NO"} /> */}
      </>
   );
};
