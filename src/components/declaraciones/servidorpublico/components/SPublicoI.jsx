import { useRef } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { useParams } from "react-router-dom";
import { labelRenumeracion } from "../../funciones/ingresosEservidor/labels";

export const SPublicoI = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   return <Numeric col={12} name={"RemuneracionNetaCargoPublico"} label={labelRenumeracion(declaracion)} placeholder={labelRenumeracion(declaracion)} />;
};
