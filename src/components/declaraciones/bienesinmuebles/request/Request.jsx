import { useEffect, useState } from "react";
import { GetAxios } from "../../../../services/services";

export const Request = () => {
   const [cached, setCached] = useState(false);
   const [inmuebles, setInmuebles] = useState([]);
   const [titular, setTitular] = useState([]);
   const [relacion, setRelaciones] = useState([]);
   const [adquisicion, setAdquisicion] = useState([]);
   const [pago, setPago] = useState([]);

   useEffect(() => {
      const responses = async () => {
         setInmuebles(await GetAxios("tipoinmueble/show"));
         setTitular(await GetAxios("titularbien/show"));
         setRelaciones(await GetAxios("relacioncondeclarante/show"));
         setAdquisicion(await GetAxios("formadquisicion/show"));
         setPago(await GetAxios("formapago/show"));

         setCached(true);
      };
      if (!cached) {
         responses();
      }
   }, []);
   return {
      inmuebles,
      titular,
      relacion,
      adquisicion,
      pago,
   };
};
