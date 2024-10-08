import { useEffect, useState } from "react";
import { GetAxios } from "../../../services/services";
import { useDispatch } from "react-redux";

export const Request = ({ peticiones = [] }) => {
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
   const [titularVehiculos, setTitutarVehiculos] = useState([]);
   const [tiposbienesmuebles, setTiposBienesMuebles] = useState([]);
   const [tipoinversion, setTipoInversion] = useState([]);
   const [tipoAdeudos, setTipoAdeudos] = useState([]);
   const [adscripcion, setAdscripcion] = useState([]);
   const [adscripcionOrganismo, setAdscripcionOrganismo] = useState([]);

   const [municipios, setMunicipios] = useState([]);
   const [instrumentos, SetInstrumentos] = useState([]);
   const [bienenAjenacion, setBieneAjenacion] = useState([]);
   const [subInversiones, setSubInversiones] = useState([]);
   //intereses
   const [tipoParticipacion, setTipoParticipacion] = useState([]);
   const [sectores, setSectores] = useState([]);
   const [tipoApoyos, setTipoApoyos] = useState([]);
   const [formaRecepcion, setFormaRecepcion] = useState([]);
   const [representacion, setRepresentacion] = useState([]);
   const [tipoPersona, setTipoPersona] = useState([]);
   const [tipoBeneficios, setTipoBeneficios] = useState([]);
   const [tipoFideocomisos, setTipoFideocomisos] = useState([]);
   const [organismo, setOrganismo] = useState([]);
    const [empleos,setEmpleos] = useState([]);
   // usuarios form
   const [intengrantes, setIntengrantes] = useState([]);
   const [roles, setRoles] = useState([]);
   //mis declaraciones
   const [instituciones, setInstituciones] = useState([]);
   const [apartados, setApartados] = useState([]);
   useEffect(() => {
      const responses = async () => {
         peticiones.includes("adscripcionOrganismo") && setAdscripcionOrganismo(await GetAxios("adscripcion/index"));
         peticiones.includes("empleos") && setEmpleos(await GetAxios("empleos/index"));

         peticiones.includes("sectores") && setSectores(await GetAxios("sector/show"));
         peticiones.includes("instituciones") && setInstituciones(await GetAxios("tipoinstituciones/show"));
         peticiones.includes("tipoApoyos") && setTipoApoyos(await GetAxios("tipoapoyos/show"));
         peticiones.includes("organismo") && setOrganismo(await GetAxios("adscripcion/organismo"));

         peticiones.includes("formaRecepcion") && setFormaRecepcion(await GetAxios("formarecepcion/show"));
         peticiones.includes("representacion") && setRepresentacion(await GetAxios("representacion/show"));
         peticiones.includes("tipoPersona") && setTipoPersona(await GetAxios("tipopersona/show"));
         peticiones.includes("tipoBeneficios") && setTipoBeneficios(await GetAxios("tipobeneficios/show"));
         peticiones.includes("tipoFideocomisos") && setTipoFideocomisos(await GetAxios("tipofideocomisos/show"));

         peticiones.includes("tipoParticipacion") && setTipoParticipacion(await GetAxios("tipoparticipacion/show"));
         peticiones.includes("municipios") && setMunicipios(await GetAxios("municipios/show"));
         peticiones.includes("instrumentos") && SetInstrumentos(await GetAxios("tipoinstrumento/show"));
         peticiones.includes("bienenAjenacion") && setBieneAjenacion(await GetAxios("bienenajenacion/show"));
         peticiones.includes("subInversiones") && setSubInversiones(await GetAxios("subtiposinversion/showAll"));

         peticiones.includes("inmuebles") && setInmuebles(await GetAxios("tipoinmueble/show"));
         peticiones.includes("titular") && setTitular(await GetAxios("titularbien/show"));
         peticiones.includes("relacion") && setRelaciones(await GetAxios("relacioncondeclarante/show"));
         peticiones.includes("adquisicion") && setAdquisicion(await GetAxios("formadquisicion/show"));
         peticiones.includes("pago") && setPago(await GetAxios("formapago/show"));
         peticiones.includes("monedas") && setMonedas(await GetAxios("monedas/show"));
         peticiones.includes("conforme") && setConforme(await GetAxios("valorconforme/show"));
         peticiones.includes("motivobaja") && setMotivoBaja(await GetAxios("motivobaja/show"));
         peticiones.includes("estadocivil") && setEstadoCivil(await GetAxios("estadoCivil/show"));
         peticiones.includes("regimenes") && setRegimenes(await GetAxios("regimenes/show"));
         peticiones.includes("paises") && setPaises(await GetAxios("paises/show"));
         peticiones.includes("nacionalidades") && setNacionalidades(await GetAxios("paises/showNacionalidad"));
         peticiones.includes("nivelEstudios") && setNivelEstudios(await GetAxios("nivelestudios/show"));
         peticiones.includes("estatus") && setEstatus(await GetAxios("estatus/show"));
         peticiones.includes("documentosObtenidos") && setDocumentosObtenidos(await GetAxios("documentosbtenidos/show"));
         peticiones.includes("nivelOrdenGobierno") && setNivelOrdenGobierno(await GetAxios("nivelordengobierno/show"));
         peticiones.includes("ambitoPublico") && setAmbitoPublico(await GetAxios("ambitospublicos/show"));
         peticiones.includes("entidades") && setEntidades(await GetAxios("entidades/show"));
         peticiones.includes("paises") && setPaises(await GetAxios("paises/show"));
         peticiones.includes("nombreEntePublico") && setNombreEntePublico(await GetAxios("nombrentepublico/show"));
         peticiones.includes("vehiculos") && setVehiculos(await GetAxios("tipovehiculos/show"));
         peticiones.includes("titularVehiculos") && setTitutarVehiculos(await GetAxios("titularvehiculos/show"));
         peticiones.includes("tiposbienesmuebles") && setTiposBienesMuebles(await GetAxios("tiposbienesmuebles/show"));
         peticiones.includes("tipoinversion") && setTipoInversion(await GetAxios("tipoinversion/show"));
         peticiones.includes("tipoAdeudos") && setTipoAdeudos(await GetAxios("tiposadeudos/show"));
         peticiones.includes("apartados") && setApartados(await GetAxios(`apartados/show/${parseInt(localStorage.getItem("Id_User"))}`));
         peticiones.includes("intengrantes") && setIntengrantes(await GetAxios("intengrantes/show"));
         peticiones.includes("roles") && setRoles(await GetAxios("roles/show"));
         peticiones.includes("adscripcion") && setAdscripcion(await GetAxios("adscripcion/show"));

         setCached(true);
      };
      if (!cached) {
         responses();
      }
   }, [cached]);
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
      titularVehiculos,
      tiposbienesmuebles,
      tipoinversion,
      tipoAdeudos,
      apartados,
      roles,
      intengrantes,
      adscripcion,
      municipios,
      instrumentos,
      bienenAjenacion,
      subInversiones,
      tipoParticipacion,
      sectores,
      instituciones,
      tipoApoyos,
      formaRecepcion,
      representacion,
      tipoPersona,
      tipoBeneficios,
      tipoFideocomisos,
      organismo,
      adscripcionOrganismo,
      empleos
   };
};
