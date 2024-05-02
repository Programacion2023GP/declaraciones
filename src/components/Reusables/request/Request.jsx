import { useEffect, useState } from "react";
import { GetAxios } from "../../../services/services";

export const Request = () => {
   const [cached, setCached] = useState(false);
   const [inmuebles, setInmuebles] = useState([]);
   const [titular, setTitular] = useState([]);
   const [relacion, setRelaciones] = useState([]);
   const [adquisicion, setAdquisicion] = useState([]);
   const [pago, setPago] = useState([]);
   const [monedas, setMonedas] = useState([]);
   const [conforme, setConforme] = useState([]);
   const [motivobaja, setMotivoBaja] = useState([]);
   const [estadocivil, setEstadoCivil] = useState([]);
   const [regimenes, setRegimenes] = useState([]);
   const [paises, setPaises] = useState([]);
   const [nacionalidades, setNacionalidades] = useState([]);
   const [nivelEstudios, setNivelEstudios] = useState([]);
   const [estatus, setEstatus] = useState([]);
   const [documentosObtenidos, setDocumentosObtenidos] = useState([]);
   const [nivelOrdenGobierno, setNivelOrdenGobierno] = useState([]);
   const [ambitoPublico, setAmbitoPublico] = useState([]);
   const [entidades, setEntidades] = useState([]);
   const [nombreEntePublico, setNombreEntePublico] = useState([]);
   const [vehiculos, setVehiculos] = useState([]);
   const [titularVehiculos,setTitutarVehiculos]= useState([])
   useEffect(() => {
      const responses = async () => {
         setInmuebles(await GetAxios("tipoinmueble/show"));
         setTitular(await GetAxios("titularbien/show"));
         setRelaciones(await GetAxios("relacioncondeclarante/show"));
         setAdquisicion(await GetAxios("formadquisicion/show"));
         setPago(await GetAxios("formapago/show"));
         setMonedas(await GetAxios("monedas/show"));
         setConforme(await GetAxios("valorconforme/show"));
         setMotivoBaja(await GetAxios("motivobaja/show"));
         setEstadoCivil(await GetAxios("/estadoCivil/show"));
         setRegimenes(await GetAxios("/regimenes/show"));
         setPaises(await GetAxios("/paises/show"));
         setNacionalidades(await GetAxios("/paises/showNacionalidad"));
         setNivelEstudios(await GetAxios("/nivelestudios/show"));
         setEstatus(await GetAxios("/estatus/show"));
         setDocumentosObtenidos(await GetAxios("/documentosbtenidos/show"));
         setNivelOrdenGobierno(await GetAxios("/nivelordengobierno/show"));
         setAmbitoPublico(await GetAxios("/ambitospublicos/show"));
         setEntidades(await GetAxios("/entidades/show"));
         setPaises(await GetAxios("/paises/show"));
         setNombreEntePublico(await GetAxios("/nombrentepublico/show"));
         setVehiculos(await GetAxios("tipovehiculos/show"));
         setTitutarVehiculos(await GetAxios("titularvehiculos/show"))
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
      monedas,
      conforme,
      motivobaja,
      estadocivil,
      regimenes,
      paises,
      nacionalidades,
      nivelEstudios,
      estatus,
      documentosObtenidos,
      nivelOrdenGobierno,
      ambitoPublico,
      entidades,
      nombreEntePublico,
      vehiculos,
      titularVehiculos
   };
};
