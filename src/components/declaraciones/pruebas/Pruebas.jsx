import { useEffect } from "react";
import Interface from "../../../services/interface";
const schema = {
   nombre: "string"
};

export const Pruebas  = ({ nombre, edad, apellido }) => {
   const props = { nombre, edad, apellido };
   useEffect(() => {
      Interface(props, schema);
   }, [props]);
};
