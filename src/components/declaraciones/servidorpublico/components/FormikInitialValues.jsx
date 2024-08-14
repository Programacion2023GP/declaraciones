import { useParams } from "react-router-dom";
import { Periodos } from "./Periodos";
import { SPublicoI } from "./SPublicoI";
import { SPublicoII } from "./SPublicoII";
import { SPublicoIII } from "./SPublicoIII";
import { Segmento, TabSegment } from "./Segmentos";
import { Totales } from "./Totales";

export const FormikInitialValues = ({ messageButton }) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return (
      <Segmento messageButton={messageButton}>
         <TabSegment label={"Periodos"}>
            <Periodos />
         </TabSegment>
         <TabSegment
            label={`Renumeración  ${declaracion === 2 || declaracion === 4 ? "anual" : declaracion === 1 || declaracion === 3 ? "mensual" : "hasta la fecha"}`}
         >
            <SPublicoI />
         </TabSegment>
         <TabSegment label={"Otros ingresos del declarante"}>
            <SPublicoII />
         </TabSegment>
         <TabSegment label={"Ingresos netos de la pareja y/o dependientes economicos"}>
            <SPublicoIII />
         </TabSegment>
         <TabSegment label={"Aclaraciones y totales"}>
            <Totales />
         </TabSegment>
      </Segmento>
   );
};
