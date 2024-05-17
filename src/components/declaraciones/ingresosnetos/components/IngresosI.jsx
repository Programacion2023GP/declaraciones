import { useRef } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { useParams } from "react-router-dom";
import { labelRenumeracion } from "../../funciones/ingresosEservidor/labels";
import { Text } from "../../../Reusables/input/Input";

export const IngresosI = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);

   return (
      <Text type={'number'} col={12} name={"RemuneracionMensualAnualConclusionCargoPublico"} label={labelRenumeracion(declaracion)} placeholder={labelRenumeracion(declaracion)} />
   );
};
