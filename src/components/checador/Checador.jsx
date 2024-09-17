import { useEffect, useRef, useState } from "react";
import DataTable, { Modal } from "../Reusables/table/DataTable";
import { Box, Card, Grid, Typography, Button, IconButton } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Axios, GetAxios, PostAxios } from "../../services/services";
import { Error, Success, Warning } from "../../toasts/toast";
import { PagePdf, PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../Reusables/conditionals/Ngif";
import { DatosGenerales } from "./hojas/DatosGenerales";
// import { DomicilioDeclarante } from "./hojas/DomicilioDeclarante";
import { DatosCurriculares } from "./hojas/DatosCurriculares";
import Swal from "sweetalert2";
import Loading from "../Reusables/loading/Loading";
import { DatosEmpleoCargo } from "./hojas/DatosEmpleoCargo";
import { DomiDeclarante } from "./hojas/DomiDeclarante";
import { ExperienciaLaboral } from "./hojas/ExperienciaLaboral";
import { DatosPareja } from "./hojas/DatosPareja";
import For from "../Reusables/for/For";
import { DependientesEconomicos } from "./hojas/DependientesEconomicos";
import { IngresosNetos } from "./hojas/IngresosNetos";
import { ServidorPublico } from "./hojas/ServidorPublico";
import { AvisoPrivacidad } from "./hojas/avisoprivacidad/AvisoPrivacidad";
import { Notas } from "./hojas/notas/Notas";
import { BienesInmuebles } from "./hojas/BienesInmuebles";
import { Vehiculos } from "./hojas/Vehiculos";
import { BienesMuebles } from "./hojas/BienesMuebles";
import Print from "@mui/icons-material/LocalPrintshopRounded";
import PrintTest from "@mui/icons-material/LocalPrintshopTwoTone";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Acuse } from "./hojas/acuse/Acuse";
import { CuentasValores } from "./hojas/CuentasValores";
import { AdeudosPasivos } from "./hojas/AdeudosPasivos";
import { PrestamoComodato } from "./hojas/PrestamoComodato";
import DeclarationDocument from "./hojas/BajoProtesta";
import { Document, PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import "./DateRangeSelector.css"; // Importa el archivo CSS para estilos adicionales

// import { es } from "date-fns/locale"; // Importa el locale en español

// Acuse
const Checador = ({}) => {
   useEffect(() => {
      init();
   }, []);

   const {
      estadocivil,
      regimenes,
      paises,
      nacionalidades,
      nivelEstudios,
      estatus,
      documentosObtenidos,
      nivelOrdenGobierno,
      ambitoPublico,
      municipios,
      entidades,
      relacion,
      instrumentos,
      bienenAjenacion,
      inmuebles,
      titular,
      adquisicion,
      pago,
      monedas,
      motivobaja,
      titularVehiculos,
      vehiculos,
      tiposbienesmuebles,
      tipoinversion,
      subInversiones,
      tipoAdeudos
   } = Request({
      peticiones: [
         "tipoAdeudos",
         "estadocivil",
         "regimenes",
         "paises",
         "nacionalidades",
         "nivelEstudios",
         "estatus",
         "documentosObtenidos",
         "nivelOrdenGobierno",
         "ambitoPublico",
         "municipios",
         "entidades",
         "relacion",
         "instrumentos",
         "bienenAjenacion",
         "inmuebles",
         "titular",
         "adquisicion",
         "pago",
         "monedas",
         "motivobaja",
         "titularVehiculos",
         "vehiculos",
         "tiposbienesmuebles",
         "tipoinversion",
         "subInversiones"
      ]
   });

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [datosGenerales, setDatosGenerales] = useState([]);
   const [domiciliioDeclarante, setDomiciliioDeclarante] = useState([]);
   const [datosCurriculares, setDatosCurriculares] = useState([]);
   const [datosEmpleos, setDatosEmpleos] = useState([]);
   const [experienciaLaboral, setExperienciaLaboral] = useState([]);
   const [datosPareja, setDatosPareja] = useState([]);
   const [datosDependienteEconomicos, setDatosDependienteEconomicos] = useState([]);
   const [ingresosNetos, setIngresosNetos] = useState([]);
   const [servidorPublico, setServidorPublico] = useState([]);
   const [bienesInmuebles, setBienesInmuebles] = useState([]);
   const [tpVehiculos, setTpVehiculos] = useState([]);
   const [bienesMuebles, setBienesMuebles] = useState([]);
   const [cuentaValores, setCuentaValores] = useState([]);
   const [adeudos, setAdeudos] = useState([]);
   const [prestamosComodatos, setPrestamosComodatos] = useState([]);
   const [message, setMessage] = useState();
   const [loadingMessage, setLoadingMessage] = useState(null);
   const [modal, setModal] = useState(false);
   const [pass, setPass] = useState(false);
   const [peticionesLoading, setPeticionesLoading] = useState(false);
   const [selectedDeclaracion, setSelectedDeclaracion] = useState(0);
   const [pages, setPages] = useState(0);
   const [name, setName] = useState(null);
   const [tester, setTexter] = useState(false);
   const [acuse, setAcuse] = useState(false);
   const [tpDeclaracion, setTtpDeclaracion] = useState(null);
   const [myRow, setRow] = useState(null);
   const [adscripcion, setAdscripcion] = useState([]);
   const [dates, setDates] = useState([null, null]);
   const [testerDates, setTesterDates] = useState(false);
   const [messageExtra, setMessageExtra] = useState("");
   const [btnDownloadRef, setBtnDownloadRef] = useState(false);

   const existPeticiones = (peticiones) => {
      let count = 0;
      if (peticiones) {
         peticiones.forEach((array) => {
            if (Array.isArray(array) && array.length > 0) {
               count++;
            }
         });
      }
      if (count == peticiones.length) {
         setBtnDownloadRef(document.getElementById("btnDownloadRef"));

         setPeticionesLoading(true);
      }
   };
   const [declaraciones, setDeclaraciones] = useState([]);
   const [masive, setMasive] = useState(false);
   // const btnDownloadRef = useRef(null);

   const DBLocal = {
      dataDatosGenerales: [],
      dataDomiciliodeclarante: [],
      datosCurriculares: [],
      empleoCargoComision: [],
      dataExperiencialaboral: [],
      dataDependientes: [],
      datosPareja: [],
      ingresosNetos: [],
      servidorPublico: [],
      dataBienesInmuebles: [],
      dataTpVehiculos: [],
      dataBienesMuebles: [],
      dataCuentasValores: [],
      dataAdeudos: [],
      dataPrestamosComodatos: []
   };

   useEffect(() => {
      existPeticiones([
         estadocivil,
         regimenes,
         paises,
         nacionalidades,
         nivelEstudios,
         estatus,
         documentosObtenidos,
         nivelOrdenGobierno,
         ambitoPublico,
         municipios,
         entidades,
         relacion,
         instrumentos,
         bienenAjenacion,
         inmuebles,
         titular,
         adquisicion,
         pago,
         monedas,
         motivobaja,
         titularVehiculos,
         vehiculos,
         tiposbienesmuebles,
         tipoinversion,
         subInversiones,
         tipoAdeudos
      ]);
   }, [
      estadocivil,
      regimenes,
      paises,
      nacionalidades,
      nivelEstudios,
      estatus,
      documentosObtenidos,
      nivelOrdenGobierno,
      ambitoPublico,
      municipios,
      entidades,
      relacion,
      instrumentos,
      bienenAjenacion,
      inmuebles,
      titular,
      adquisicion,
      pago,
      monedas,
      motivobaja,
      titularVehiculos,
      vehiculos,
      tiposbienesmuebles,
      tipoinversion,
      subInversiones,
      tipoAdeudos
   ]);
   const init = async () => {
      setLoading(true);
      setAdscripcion(await GetAxios("adscripcion/show"));
      setData(await GetAxios(`apartados/all`));
      setLoading(false);
   };
   useEffect(() => {}, [adscripcion, datosGenerales]);
   const handlePdfTester = async (row) => {
      setRow(row);

      setLoadingMessage(null);
      setMasive(false);
      setTexter(true);
      handelPdf(row);
   };
   const handlePdfPrint = async (row) => {
      setLoadingMessage(null);

      setMasive(false);

      setRow(row);

      setTexter(false);
      handelPdf(row);
   };
   const handleAcuse = async (row) => {
      setDatosGenerales(await GetAxios(`datosgenerales/acuse/${row.Folio}`));
      setRow(row);
      setTtpDeclaracion(row.Tipo_declaracion);
      setAcuse(true);
   };

   const handleClickButtonMasive = async () => {
      setMasive(true);
      setTexter(true);
      const folios = [];

      const fechaInicio = dayjs(selectedDate);

      const fechaFin = dayjs(selectedDate2);
      // VERIFICAR QUE ESTE EN FECHA DE SOLICITUDES

      const dataFiltrados = data.filter((item) => {
         // console.log("item",item)
         // return
         const fecha = item.FechaRegistroFormateada.split("/");
         const fechaRegistro = dayjs(fecha[2] + "-" + fecha[1] + "-" + fecha[0]); // Asegurarse del formato correcto

         // Crear el objeto Date con formato correcto (año, mes, día)

         // Sumar un día
         // Suponiendo que item.FechaRegistroFormateada es del tipo "dd/mm/yyyy"

         // Crear el objeto Date con formato correcto (año, mes, día)

         // Sumar un día
         if (!fechaInicio.isValid()) {
            console.error("Fecha de inicio no es válida:", fechaInicio);
            return false; // Salta este registro
         }
         if (!fechaFin.isValid()) {
            console.error("Fecha de fin no es válida:", fechaFin);
            return false; // Salta este registro
         }
         if (!fechaRegistro.isValid()) {
            console.error("Fecha de registro no es válida:", fechaRegistro);
            return false; // Salta este registro
         }
         if (fechaRegistro.isBetween(fechaInicio, fechaFin, "day", "[]")) {
            // Comprobación de si está dentro del rango
            console.log(fechaInicio, fechaFin, fechaRegistro);

            folios.push(item.Folio);
            return item; //true;
         }

         // return false;
      });
      // console.log("",dataFiltrados);
      if (dataFiltrados.length == 0) {
         Warning("no hay datos; parece que no hay informacion en las fechas filtradas");
         return;
      }
      setLoadingMessage(true);
      setMessage("preparando el entorno para las declaraciones");
      setModal(true);
      // const foliosStirng = folios.join();
      // console.log("🚀 ~ handleClickButtonMasive ~ foliosStirng:", foliosStirng);

      // SOLICITAR DATA DE CADA TABLA
      const dataPost = { masiveIds: folios };
      // console.log("🚀 ~ handleClickButtonMasive ~ dataPost:", dataPost);
      const resDatosGenerales = await PostAxios(`datosgenerales/index/masive`, dataPost);
      DBLocal.dataDatosGenerales = resDatosGenerales.data.result;
      const resDomicilioDeclarante = await PostAxios(`domiciliodeclarante/index/masive`, dataPost);
      DBLocal.dataDomiciliodeclarante = resDomicilioDeclarante.data.result;
      const resDatosCurriculares = await PostAxios(`datoscurriculares/index/masive`, dataPost);
      DBLocal.datosCurriculares = resDatosCurriculares.data.result;

      const resEmpleoCargoComision = await PostAxios(`datoscargoscomision/index/masive`, dataPost);
      DBLocal.empleoCargoComision = resEmpleoCargoComision.data.result;

      const resExperienciaLaboral = await PostAxios(`experiencialaboral/index/masive`, dataPost);
      DBLocal.dataExperiencialaboral = resExperienciaLaboral.data.result;

      const resDatosPareja = await PostAxios(`datospareja/index/masive`, dataPost);
      DBLocal.datosPareja = resDatosPareja.data.result;

      const resDatosDependientes = await PostAxios(`dependienteseconomicos/index/masive`, dataPost);
      DBLocal.dataDependientes = resDatosDependientes.data.result;

      const resIngresosNetos = await PostAxios(`ingresos/index/masive`, dataPost);
      DBLocal.ingresosNetos = resIngresosNetos.data.result;

      const resServidorpublico = await PostAxios(`servidorpublico/index/masive`, dataPost);
      DBLocal.servidorPublico = resServidorpublico.data.result;

      const resBienesInmuebles = await PostAxios(`bienesinmuebles/index/masive`, dataPost);
      DBLocal.dataBienesInmuebles = resBienesInmuebles.data.result;

      const resVehiculos = await PostAxios(`vehiculos/index/masive`, dataPost);
      DBLocal.dataTpVehiculos = resVehiculos.data.result;

      const resBienesMuebles = await PostAxios(`bienesmuebles/index/masive`, dataPost);
      DBLocal.dataBienesMuebles = resBienesMuebles.data.result;

      const resInversiones = await PostAxios(`inversionescuentas/index/masive`, dataPost);
      DBLocal.dataCuentasValores = resInversiones.data.result;

      const resAdeudos = await PostAxios(`adeudospasivos/index/masive`, dataPost);
      DBLocal.dataAdeudos = resAdeudos.data.result;

      const resPrestamos = await PostAxios(`prestamoscomodatos/index/masive`, dataPost);
      DBLocal.dataPrestamosComodatos = resPrestamos.data.result;

      // console.log("🚀 ~ handleClickButtonMasive ~ DBLocal:", DBLocal);
      let cont = 0;
      for (const row of dataFiltrados) {
         setRow(row);
         cont++;
         // console.log("🚀 ~ Iterating dataFiltrados ~ row:", row);

         // Asegúrate de esperar que el PDF se maneje
         setLoadingMessage(true);
         setModal(true);
         setMessageExtra(`DESCARGANDO EL PDF ${cont} /${dataFiltrados.length}`);

         // Asegúrate de que el botón existe antes de continuar
         let btnDownloadRef = document.getElementById("btnDownloadRef");
         console.log("btnDownloadRef", btnDownloadRef);

         if (!btnDownloadRef) {
            console.error("Botón no encontrado");
            continue;
         }

         await handelPdf(row, true);
         // console.log("🚀 ~ handleClickButtonMasive ~ btnDownloadRef:", btnDownloadRef);

         // Crear una promesa que resuelva cuando el click haya sido manejado
         await new Promise((resolve) => {
            // Escuchar el evento de click
            btnDownloadRef.addEventListener("click", function handleClick() {
               // Una vez hecho el click, resuelve la promesa
               resolve();

               // Abrir el PDF una vez hecho el click
               OpenPdf();

               // Elimina el listener para evitar múltiples resoluciones
               btnDownloadRef.removeEventListener("click", handleClick);
            });

            // Simula el click en el botón
            const checkElement = setInterval(() => {
               const btnDownloadRef = document.getElementById("btnDownloadRef");

               if (btnDownloadRef) {
                  btnDownloadRef.click();
                  clearInterval(checkElement); // Detiene el intervalo una vez que el botón ha sido clicado
               }
            }, 100); // Revisa cada 100 milisegundos
         });
      }
      setMessageExtra("");
   };
   const handelPdf = async (row, masive = false) => {
      setName(row.name);
      // console.log(row.Declaracion, row.Tipo_declaracion);
      const declaracionMapping = {
         Simplificada: {
            Inicial: 4,
            Modificación: 5,
            Conclusión: 6
         },
         Completa: {
            Inicial: 1,
            Modificación: 2,
            Conclusión: 3
         }
      };

      if (row.Declaracion in declaracionMapping) {
         const tipoDeclaracion = row.Tipo_declaracion.trim(); // Trimming para eliminar espacios en blanco adicionales

         if (tipoDeclaracion in declaracionMapping[row.Declaracion]) {
            setSelectedDeclaracion(declaracionMapping[row.Declaracion][tipoDeclaracion]);
         }
      }
      const page = row.Declaracion == "Simplificada" ? 6 : row.Declaracion == "Completa" && row.Tipo_declaracion != "Modificación" ? 14 : 15;
      setPages(page);
      setOpen(true);
      setModal(true);
      setLoadingMessage(true);

      // Función auxiliar para simular una pausa de medio segundo
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
         setMessage("Datos generales");
         setPass(1);

         setDatosGenerales(
            masive ? DBLocal.dataDatosGenerales.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`datosgenerales/index/${row.Folio}`)
         );

         await delay(500); // Esperar medio segundo (500 milisegundos)
         setPass(2);

         setDomiciliioDeclarante(
            masive
               ? DBLocal.dataDomiciliodeclarante.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
               : await GetAxios(`domiciliodeclarante/index/${row.Folio}`)
         );

         setMessage("Domicilio declarante");

         await delay(500); // Esperar medio segundo nuevamente
         setPass(3);

         setMessage("Datos curriculares");

         setDatosCurriculares(
            masive ? DBLocal.datosCurriculares.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`datoscurriculares/index/${row.Folio}`)
         );

         await delay(500); // Esperar medio segundo nuevamente
         setPass(4);

         setMessage("Datos empleos cargo Comisión");
         setDatosEmpleos(
            masive
               ? DBLocal.empleoCargoComision.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
               : await GetAxios(`datoscargoscomision/index/${row.Folio}`)
         );

         setPass(5);

         setMessage("Experiencia Laboral");

         setExperienciaLaboral(
            masive
               ? DBLocal.dataExperiencialaboral.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
               : await GetAxios(`experiencialaboral/index/${row.Folio}`)
         );
         await delay(500); // Esperar medio segundo nuevamente
         if (page > 6) {
            setPass(6);
            setMessage("Datos de la pareja");
            // const resDatosPareja = await GetAxios(`datospareja/index/${row.Folio}`);
            // setDatosPareja(resDatosPareja);
            setDatosPareja(
               masive ? DBLocal.datosPareja.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`datospareja/index/${row.Folio}`)
            );
            // declaracion.datosPareja = resDatosPareja;
            await delay(500); // Esperar medio segundo nuevamente

            setPass(7);

            setMessage("Datos de los dependientes economicos");
            setDatosDependienteEconomicos(
               masive
                  ? DBLocal.dataDependientes.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
                  : await GetAxios(`dependienteseconomicos/index/${row.Folio}`)
            );
            // setDatosDependienteEconomicos(resDependientesEconomicos);
            // declaracion.datosDependienteEconomicos = resDependientesEconomicos;
            await delay(500); // Esperar medio segundo nuevamente
         }

         setPass(page > 6 ? 8 : 6);
         setMessage("ingresos netos");
         setIngresosNetos(masive ? DBLocal.ingresosNetos.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`ingresos/index/${row.Folio}`));
         // const resIngresos = await GetAxios(`ingresos/index/${row.Folio}`);
         // setIngresosNetos(resIngresos);
         // declaracion.ingresosNetos = resIngresos;
         await delay(500); // Esperar medio segundo nuevamente

         if (page == 15) {
            setPass(9);
            setMessage("servidor publico");
            setServidorPublico(
               masive ? DBLocal.servidorPublico.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`servidorpublico/index/${row.Folio}`)
            );
            // const resServidorPublico = await GetAxios(`servidorpublico/index/${row.Folio}`);
            // setServidorPublico(resServidorPublico);
            await delay(500); // Esperar medio segundo nuevamente
         }
         if (page > 6) {
            setMessage("bienes inmuebles");
            setPass(page == 15 ? 10 : page > 6 ? 9 : 7);
            setBienesInmuebles(
               masive ? DBLocal.dataBienesInmuebles.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`bienesinmuebles/index/${row.Folio}`)
            );
            // const resBienesInmuebles = await GetAxios(`bienesinmuebles/index/${row.Folio}`);
            // setBienesInmuebles(resBienesInmuebles);
            // declaracion.bienesInmuebles = resBienesInmuebles;
            // setBienesInmuebles(await GetAxios(`bienesinmuebles/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 11 : page > 6 ? 10 : 8);
            setMessage("vehiculos");
            setTpVehiculos(
               masive ? DBLocal.dataTpVehiculos.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`vehiculos/index/${row.Folio}`)
            );
            // const resVehiculos = await GetAxios(`vehiculos/index/${row.Folio}`);
            // setTpVehiculos(resVehiculos);
            // declaracion.tpVehiculos = resVehiculos;
            // setTpVehiculos(await GetAxios(`vehiculos/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 12 : page > 6 ? 11 : 9);
            setMessage("bienes muebles");
            setBienesMuebles(
               masive ? DBLocal.dataBienesMuebles.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`bienesmuebles/index/${row.Folio}`)
            );
            // const resBienesMuebles = await GetAxios(`bienesmuebles/index/${row.Folio}`);
            // setBienesMuebles(resBienesMuebles);
            // declaracion.bienesMuebles = resBienesMuebles;
            // setBienesMuebles(await GetAxios(`bienesmuebles/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 13 : page > 6 ? 12 : 10);
            setMessage("inversiones cuentas valores");
            setCuentaValores(
               masive
                  ? DBLocal.dataCuentasValores.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
                  : await GetAxios(`inversionescuentas/index/${row.Folio}`)
            );
            // const resCuentasValores = await GetAxios(`inversionescuentas/index/${row.Folio}`);
            // setCuentaValores(resCuentasValores);
            // declaracion.cuentaValores = resCuentasValores;
            // setCuentaValores(await GetAxios(`inversionescuentas/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 14 : page > 6 ? 13 : 11);
            setMessage("adeudos");
            setAdeudos(
               masive ? DBLocal.dataAdeudos.filter((item) => item.Id_SituacionPatrimonial === row.Folio) : await GetAxios(`adeudospasivos/index/${row.Folio}`)
            );
            // const resAdeudos = await GetAxios(`adeudospasivos/index/${row.Folio}`);
            // setAdeudos(resAdeudos);
            // declaracion.adeudos = resAdeudos;
            // setAdeudos(await GetAxios(`adeudospasivos/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 15 : page > 6 ? 14 : 12);
            const resPrestamosComodatos = await GetAxios(`prestamoscomodatos/index/${row.Folio}`);
            setMessage("prestamos comodatos");
            setPrestamosComodatos(
               masive
                  ? DBLocal.dataPrestamosComodatos.filter((item) => item.Id_SituacionPatrimonial === row.Folio)
                  : await GetAxios(`prestamoscomodatos/index/${row.Folio}`)
            );
            // setPrestamosComodatos(resPrestamosComodatos);
            // declaracion.prestamosComodatos = resPrestamosComodatos;
            // setPrestamosComodatos(await GetAxios(`prestamoscomodatos/index/${row.Folio}`));
            await delay(500);
            // if (masive) {
            //    declaraciones.push(declaracion);
            //    setDeclaraciones(declaraciones);
            // }
            // pushear a declaraciones
         }
      } catch (error) {
         console.error("Error al obtener datos:", error);
      } finally {
         !masive && OpenPdf();
      }
   };
   // const handelPdfDates = async (data) => {
   //    // setName(row.name);
   //    // console.log(row.Declaracion, row.Tipo_declaracion);
   //    const declaracionMapping = {
   //       Simplificada: {
   //          Inicial: 4,
   //          Modificación: 5,
   //          Conclusión: 6
   //       },
   //       Completa: {
   //          Inicial: 1,
   //          Modificación: 2,
   //          Conclusión: 3
   //       }
   //    };

   //    if (row.Declaracion in declaracionMapping) {
   //       const tipoDeclaracion = row.Tipo_declaracion.trim(); // Trimming para eliminar espacios en blanco adicionales

   //       if (tipoDeclaracion in declaracionMapping[row.Declaracion]) {
   //          setSelectedDeclaracion(declaracionMapping[row.Declaracion][tipoDeclaracion]);
   //       }
   //    }
   //    const page = row.Declaracion == "Simplificada" ? 6 : row.Declaracion == "Completa" && row.Tipo_declaracion != "Modificación" ? 14 : 15;
   //    setPages(page);
   //    setOpen(true);
   //    setModal(true);
   //    setLoadingMessage(true);

   //    // Función auxiliar para simular una pausa de medio segundo
   //    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

   //    try {
   //       setMessage("Datos generales");
   //       setPass(1);
   //       setDatosGenerales(await GetAxios(`datosgenerales/index/${row.Folio}`));

   //       await delay(500); // Esperar medio segundo (500 milisegundos)
   //       setPass(2);

   //       setMessage("Domicilio declarante");
   //       setDomiciliioDeclarante(await GetAxios(`domiciliodeclarante/index/${row.Folio}`));

   //       await delay(500); // Esperar medio segundo nuevamente
   //       setPass(3);

   //       setMessage("Datos curriculares");
   //       setDatosCurriculares(await GetAxios(`datoscurriculares/index/${row.Folio}`));
   //       await delay(500); // Esperar medio segundo nuevamente
   //       setPass(4);

   //       setMessage("Datos empleos cargo Comisión");
   //       setDatosEmpleos(await GetAxios(`datoscargoscomision/index/${row.Folio}`));

   //       setPass(5);
   //       setMessage("Experiencia Laboral");
   //       setExperienciaLaboral(await GetAxios(`experiencialaboral/index/${row.Folio}`));
   //       await delay(500); // Esperar medio segundo nuevamente
   //       if (page > 6) {
   //          setPass(6);
   //          setMessage("Datos de la pareja");
   //          setDatosPareja(await GetAxios(`datospareja/index/${row.Folio}`));
   //          await delay(500); // Esperar medio segundo nuevamente

   //          setPass(7);
   //          setMessage("Datos de los dependientes economicos");
   //          setDatosDependienteEconomicos(await GetAxios(`dependienteseconomicos/index/${row.Folio}`));
   //          await delay(500); // Esperar medio segundo nuevamente
   //       }

   //       setPass(page > 6 ? 8 : 6);
   //       setMessage("ingresos netos");
   //       setIngresosNetos(await GetAxios(`ingresos/index/${row.Folio}`));
   //       await delay(500); // Esperar medio segundo nuevamente

   //       if (page == 15) {
   //          setPass(9);
   //          setMessage("servidor publico");
   //          setServidorPublico(await GetAxios(`servidorpublico/index/${row.Folio}`));
   //          await delay(500); // Esperar medio segundo nuevamente
   //       }
   //       if (page > 6) {
   //          setMessage("bienes inmuebles");
   //          setPass(page == 15 ? 10 : page > 6 ? 9 : 7);
   //          setBienesInmuebles(await GetAxios(`bienesinmuebles/index/${row.Folio}`));
   //          await delay(500); // Esperar medio segundo nuevamente

   //          setPass(page == 15 ? 11 : page > 6 ? 10 : 8);
   //          setMessage("vehiculos");
   //          setTpVehiculos(await GetAxios(`vehiculos/index/${row.Folio}`));
   //          await delay(500); // Esperar medio segundo nuevamente

   //          setPass(page == 15 ? 12 : page > 6 ? 11 : 9);
   //          setMessage("bienes muebles");
   //          setBienesMuebles(await GetAxios(`bienesmuebles/index/${row.Folio}`));
   //          await delay(500);

   //          setPass(page == 15 ? 13 : page > 6 ? 12 : 10);
   //          setMessage("inversiones cuentas valores");
   //          setCuentaValores(await GetAxios(`inversionescuentas/index/${row.Folio}`));
   //          await delay(500);

   //          setPass(page == 15 ? 14 : page > 6 ? 13 : 11);
   //          setMessage("adeudos");
   //          setAdeudos(await GetAxios(`adeudospasivos/index/${row.Folio}`));
   //          await delay(500);

   //          setPass(page == 15 ? 15 : page > 6 ? 14 : 12);
   //          setMessage("prestamos comodatos");
   //          setPrestamosComodatos(await GetAxios(`prestamoscomodatos/index/${row.Folio}`));
   //          await delay(500);
   //       }
   //    } catch (error) {
   //       console.error("Error al obtener datos:", error);
   //    } finally {
   //       // OpenPdf();
   //    }
   // };
   useEffect(() => {}, [selectedDeclaracion, name, prestamosComodatos, testerDates, masive]);
   const OpenPdf = () => {
      setModal(false);
      setMessage("");
      setPass(0);
      setLoadingMessage(false);
   };
   const idRole = parseInt(localStorage.getItem("Id_Role"), 10);
   const isRoleOne = idRole === 1 || idRole === 10;

   // Construcción condicional del array de botones
   const moreButtons = [
      isRoleOne && {
         tooltip: "Imprimir",
         color: "#27AE60",
         icon: Print,
         toltip: "Imprimir",
         handleButton: handlePdfPrint,
         conditions: ["Tstatus == 'Terminada'"]
      },
      {
         tooltip: "Imprimir testada",
         color: "black",
         icon: PrintTest,
         toltip: "Imprimir testada",
         handleButton: handlePdfTester,
         conditions: ["Tstatus == 'Terminada'"]
      },
      isRoleOne && {
         tooltip: "Acuse",
         color: "#F39C12",
         icon: ReceiptOutlinedIcon,
         toltip: "Acuse",
         handleButton: handleAcuse,
         conditions: ["Tstatus == 'Terminada'"]
      }
   ].filter(Boolean);
   const handleDateRangeSelected = (dates) => {
      if (dates[0] !== null && dates[1] !== null) {
         setTesterDates(true);
         const startDate = dates[0];
         const endDate = dates[1];
         const filteredFolios = data
            .filter((d) => {
               const fechaRegistroTerminada = new Date(d.FechaRegistroTerminada);
               return fechaRegistroTerminada >= startDate && fechaRegistroTerminada <= endDate;
            })
            .map((d) => d);
         filteredFolios.map((f) => {
            if (Object.keys(f).length > 1) {
               handelPdfDates(f);
            }
         });
      }
   };
   const cleanFileName = (text) => {
      let mayusc = "";
      if (text === undefined || text === null) return text;

      // Primero reemplazamos los acentos y normalizamos la cadena,
      // pero evitamos afectar la 'ñ' y la 'Ñ'
      mayusc = text
         .replace(/[áäàâã]/gi, "a") // Reemplaza todas las variaciones de "a"
         .replace(/[éëèê]/gi, "e") // Reemplaza todas las variaciones de "e"
         .replace(/[íïìî]/gi, "i") // Reemplaza todas las variaciones de "i"
         .replace(/[óöòôõ]/gi, "o") // Reemplaza todas las variaciones de "o"
         .replace(/[úüùû]/gi, "u") // Reemplaza todas las variaciones de "u"
         .replace(/[^a-zA-Z0-9Ññ]/g, "") // Remueve caracteres especiales y espacios
         .replace(/\s+/g, ""); // Remueve cualquier espacio extra

      return mayusc.toUpperCase(); // Convierte todo a mayúsculas
   };

   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedDate2, setSelectedDate2] = useState(null);
   const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
   };
   const handleDateChange2 = (e) => {
      setSelectedDate2(e.target.value);
   };

   return (
      <>
         <Box
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            sx={{
               overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
               border: "2px solid #007bff",
               borderRadius: "10px",
               margin: "1rem",
               padding: "1rem",

               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <Card sx={{ maxWidth: "100%", margin: "auto" }}>
               <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
                  {/* <select name="" id="">
                     <option selected value="2024">2024</option>
                  </select>
                  <select name="" id="">
                     <option selected value="Abril - Junio">Abril - Junio</option>
                  </select> */}
                  <div>
                     <label htmlFor="dateInput">Selecciona la fecha inicio:</label>
                     <input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} />
                  </div>
                  <div>
                     <label htmlFor="dateInput">Selecciona la fecha fin</label>
                     <input type="date" id="dateInput" value={selectedDate2} onChange={handleDateChange2} />
                  </div>
                  <Button
                     sx={{
                        backgroundColor: "#3e3e3e",
                        color: "#fefefe",
                        borderRadius: "8px",
                        paddingInline: 10,
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bolder",
                        fontSize: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        transition: "background-color 0.3s ease"
                     }}
                     onClick={handleClickButtonMasive}
                  >
                     descarga masiva
                  </Button>

                  {/* <div className="date-range-selector">
                     <DatePicker
                        selected={dates[0]}
                        // onChange={(update) => setDates(update)}
                        startDate={dates[0]}
                        endDate={dates[1]}
                        selectsRange
                        open={open}
                        onClickOutside={() => setOpen(false)}
                        onCalendarOpen={() => setOpen(true)}
                        onCalendarClose={() => setOpen(false)}
                        dateFormat="dd/MM/yyyy"
                        className="date-picker-input"
                        popperPlacement="bottom-start"
                        placeholderText="Selecciona un rango de fechas"
                        onChange={(update) => {
                           setDates(update);
                           if (update.length === 2) {
                              // Both dates have been selected, call your method here
                              handleDateRangeSelected(update);
                           }
                        }}
                        locale={es} // Configura el locale en español
                     />
                  </div> */}
                  <DataTable
                     options={["CHARTS", "EXCEL", "COLORS"]}
                     // , "PDF",
                     moreButtons={moreButtons}
                     dataHidden={["Gender", "FechaRegistroTerminada"]}
                     // captionButtons={[
                     //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                     // ]}
                     Trbacground={[
                        { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Tstatus == 'Terminada'"], text: "Declaraciones completas terminadas" },
                        { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Tstatus == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
                        { color: "#F2F2CC", conditions: ["Tstatus == 'En proceso'"], text: "Declaraciones sin finalizar" }
                     ]}
                     buttonsMenu={false}
                     loading={loading}
                     filterGlobal={true}
                     filter={true}
                     headers={[
                        "Folio",
                        "Nombre",
                        "Apellido Paterno",
                        "Apellido Materno",
                        "Modalidad de la declaración",
                        "Tipo de declaración",
                        "Estatus",
                        "Fecha registro"
                        // "Fecha finalizada"
                     ]}
                     data={data}
                     // por hacer  getUrl ={}
                     // refreshRequest ={}
                     //
                     pagination={[5, 10, 25, 50, 100]}
                     //  conditionExistEditButton={["Status !='Terminada'"]}
                     speakRow
                     // conditionExistDeleteButton={["Status !='Terminada'"]}
                     // options={true}
                  />
               </Box>
            </Card>

            <PdfDeclaracion title={"ACUSE"} open={acuse} setOpen={setAcuse} formTitle={"ACUSE"}>
               <Acuse data={datosGenerales} adscripcion={adscripcion} row={myRow} declaracion={tpDeclaracion} />
            </PdfDeclaracion>

            {loadingMessage != null ? (
               !loadingMessage && peticionesLoading ? (
                  !masive ? (
                     <PdfDeclaracion
                        fileName={cleanFileName(myRow?.Folio) + cleanFileName(myRow?.ApPaterno) + cleanFileName(myRow?.ApMaterno) + cleanFileName(myRow?.Nombre)}
                        title={"DECLARACION"}
                        open={open}
                        setOpen={setOpen}
                        formTitle={"OFICIO DE VALES"}
                        watermark={"Declaracion"}
                     >
                        <PagePdf title={"DATOS GENERALES"} data={datosGenerales}>
                           <DatosGenerales
                              data={datosGenerales}
                              estadocivil={estadocivil}
                              regimenes={regimenes}
                              paises={paises}
                              nacionalidades={nacionalidades}
                              testada={tester}
                           />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <PagePdf title={"DOMICILIO DEL DECLARANTE"}>
                           <DomiDeclarante data={domiciliioDeclarante} municipios={municipios} entidades={entidades} paises={paises} testada={tester} />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <PagePdf title={"DATOS CURRICULARES DEL DECLARANTE"}>
                           <DatosCurriculares
                              data={datosCurriculares}
                              nivelEstudios={nivelEstudios}
                              estatus={estatus}
                              documentosObtenidos={documentosObtenidos}
                              testada={tester}
                           />
                        </PagePdf>
                        <PagePdf title={"DATOS DEL EMPLEO CARGO O COMISIÓN"}>
                           <DatosEmpleoCargo
                              testada={tester}
                              data={datosEmpleos}
                              nivelOrdenGobierno={nivelOrdenGobierno}
                              ambitoPublico={ambitoPublico}
                              municipios={municipios}
                              entidades={entidades}
                              paises={paises}
                           />
                        </PagePdf>
                        <PagePdf title={"EXPERIENCIA LABORAL"}>
                           <ExperienciaLaboral data={experienciaLaboral} ambitopublico={ambitoPublico} testada={tester} />
                        </PagePdf>
                        <Ngif condition={selectedDeclaracion < 4}>
                           <PagePdf title={"DATOS DE LA PAREJA"}>
                              <DatosPareja data={datosPareja} relacion={relacion} testada={tester} />
                              <Notas
                                 testada={tester}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                           <Ngif condition={datosDependienteEconomicos.length > 0}>
                              {datosDependienteEconomicos.map((item, index) => (
                                 <PagePdf key={item.Id_DatosDependienteEconomico} title={"DATOS DEL DEPENDIENTE ECONOMICO"}>
                                    <DependientesEconomicos data={[item]} relacion={relacion} testada={tester} />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={datosDependienteEconomicos.length === 0}>
                              <PagePdf title={"DATOS DEL DEPENDIENTE ECONOMICO       (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>
                        </Ngif>

                        <PagePdf title={"INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS"}>
                           <IngresosNetos
                              data={ingresosNetos}
                              tipo_declaracion={selectedDeclaracion}
                              bienenAjenacion={bienenAjenacion}
                              testada={tester}
                              instrumentos={instrumentos}
                           />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <Ngif condition={selectedDeclaracion == 2}>
                           <PagePdf title={"¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR? NO"}>
                              <ServidorPublico data={servidorPublico} instrumentos={instrumentos} bienenAjenacion={bienenAjenacion} testada={tester} />
                           </PagePdf>
                        </Ngif>
                        <Ngif condition={selectedDeclaracion < 4}>
                           <Ngif condition={bienesInmuebles.length > 0}>
                              {bienesInmuebles.map((item, index) => (
                                 <PagePdf key={index} title={"BIENES INMUEBLES"}>
                                    <BienesInmuebles
                                       data={[item]}
                                       inmuebles={inmuebles}
                                       titular={titular}
                                       testada={tester}
                                       adquisicion={adquisicion}
                                       pago={pago}
                                       monedas={monedas}
                                       relacion={relacion}
                                       motivobaja={motivobaja}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={bienesInmuebles.length === 0}>
                              <PagePdf title={"BIENES INMUEBLES      (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={tpVehiculos.length > 0}>
                              {tpVehiculos.map((item, index) => (
                                 <PagePdf key={index} title={"VEHÍCULOS"}>
                                    <Vehiculos
                                       data={[item]}
                                       testada={tester}
                                       relacion={relacion}
                                       titular={titularVehiculos}
                                       vehiculos={vehiculos}
                                       adquisicion={adquisicion}
                                       pago={pago}
                                       monedas={monedas}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={tpVehiculos.length === 0}>
                              <PagePdf title={"VEHÍCULOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={bienesMuebles.length > 0}>
                              {bienesMuebles.map((item, index) => (
                                 <PagePdf key={index} title={"BIENES MUEBLES"}>
                                    <BienesMuebles
                                       name={name}
                                       data={[item]}
                                       testada={tester}
                                       adquisicion={adquisicion}
                                       bienes={tiposbienesmuebles}
                                       monedas={monedas}
                                       motivosBajas={motivobaja}
                                       pago={pago}
                                       relacion={relacion}
                                       titular={titular}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={bienesMuebles.length === 0}>
                              <PagePdf title={"BIENES MUEBLES (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={cuentaValores.length > 0}>
                              {cuentaValores.map((item, index) => (
                                 <PagePdf key={index} title={"INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS"}>
                                    <CuentasValores
                                       data={[item]}
                                       testada={tester}
                                       inversiones={tipoinversion}
                                       titular={titular}
                                       monedas={monedas}
                                       subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={cuentaValores.length === 0}>
                              <PagePdf title={"INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={cuentaValores.length > 0}>
                              {cuentaValores.map((item, index) => (
                                 <PagePdf key={index} title={"ADEUDOS PASIVOS"}>
                                    <AdeudosPasivos
                                       data={[item]}
                                       titular={titular}
                                       monedas={monedas}
                                       adeudos={adeudos}
                                       testada={tester}
                                       // inversiones={tipoinversion}
                                       // titular={titular}
                                       // monedas={monedas}
                                       // subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={cuentaValores.length === 0}>
                              <PagePdf title={"ADEUDOS PASIVOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={prestamosComodatos.length > 0}>
                              {prestamosComodatos.map((item, index) => (
                                 <PagePdf key={index} title={"PRESTAMO O COMODATO POR TERCEROS"}>
                                    <PrestamoComodato
                                       data={[item]}
                                       municipios={municipios}
                                       entidades={entidades}
                                       paises={paises}
                                       relacion={relacion}
                                       inmuebles={inmuebles}
                                       vehiculos={vehiculos}
                                       testada={false}
                                       // inversiones={tipoinversion}
                                       // titular={titular}
                                       // monedas={monedas}
                                       // subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={prestamosComodatos.length === 0}>
                              <PagePdf title={"PRESTAMO O COMODATO POR TERCEROS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>
                        </Ngif>

                        <AvisoPrivacidad />
                        <DeclarationDocument row={myRow} />
                        {/* <For array={datosDependienteEconomicos} pdf>
                    {(item, index) => (
                    )}
                 </For> */}
                     </PdfDeclaracion>
                  ) : (
                     <></>
                  )
               ) : (
                  <ModalComponent
                     message={message}
                     messageExtra={selectedDate && selectedDate2 && messageExtra}
                     modal={modal}
                     setModal={setModal}
                     pass={pass}
                     page={pages}
                  ></ModalComponent>
               )
            ) : (
               ""
            )}
            <Ngif condition={peticionesLoading}>
               <PDFDownloadLink
                  document={
                     <Document>
                        <PagePdf title={"DATOS GENERALES"} data={datosGenerales}>
                           <DatosGenerales
                              data={datosGenerales}
                              estadocivil={estadocivil}
                              regimenes={regimenes}
                              paises={paises}
                              nacionalidades={nacionalidades}
                              testada={tester}
                           />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <PagePdf title={"DOMICILIO DEL DECLARANTE"}>
                           <DomiDeclarante data={domiciliioDeclarante} municipios={municipios} entidades={entidades} paises={paises} testada={tester} />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <PagePdf title={"DATOS CURRICULARES DEL DECLARANTE"}>
                           <DatosCurriculares
                              data={datosCurriculares}
                              nivelEstudios={nivelEstudios}
                              estatus={estatus}
                              documentosObtenidos={documentosObtenidos}
                              testada={tester}
                           />
                        </PagePdf>
                        <PagePdf title={"DATOS DEL EMPLEO CARGO O COMISIÓN"}>
                           <DatosEmpleoCargo
                              testada={tester}
                              data={datosEmpleos}
                              nivelOrdenGobierno={nivelOrdenGobierno}
                              ambitoPublico={ambitoPublico}
                              municipios={municipios}
                              entidades={entidades}
                              paises={paises}
                           />
                        </PagePdf>
                        <PagePdf title={"EXPERIENCIA LABORAL"}>
                           <ExperienciaLaboral data={experienciaLaboral} ambitopublico={ambitoPublico} testada={tester} />
                        </PagePdf>
                        <Ngif condition={selectedDeclaracion < 4}>
                           <PagePdf title={"DATOS DE LA PAREJA"}>
                              <DatosPareja data={datosPareja} relacion={relacion} testada={tester} />
                              <Notas
                                 testada={tester}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                           <Ngif condition={datosDependienteEconomicos.length > 0}>
                              {datosDependienteEconomicos.map((item, index) => (
                                 <PagePdf key={item.Id_DatosDependienteEconomico} title={"DATOS DEL DEPENDIENTE ECONOMICO"}>
                                    <DependientesEconomicos data={[item]} relacion={relacion} testada={tester} />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={datosDependienteEconomicos.length === 0}>
                              <PagePdf title={"DATOS DEL DEPENDIENTE ECONOMICO       (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>
                        </Ngif>

                        <PagePdf title={"INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS"}>
                           <IngresosNetos
                              data={ingresosNetos}
                              tipo_declaracion={selectedDeclaracion}
                              bienenAjenacion={bienenAjenacion}
                              testada={tester}
                              instrumentos={instrumentos}
                           />
                           <Notas
                              testada={tester}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <Ngif condition={selectedDeclaracion == 2}>
                           <PagePdf title={"¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR? NO"}>
                              <ServidorPublico data={servidorPublico} instrumentos={instrumentos} bienenAjenacion={bienenAjenacion} testada={tester} />
                           </PagePdf>
                        </Ngif>
                        <Ngif condition={selectedDeclaracion < 4}>
                           <Ngif condition={bienesInmuebles.length > 0}>
                              {bienesInmuebles.map((item, index) => (
                                 <PagePdf key={index} title={"BIENES INMUEBLES"}>
                                    <BienesInmuebles
                                       data={[item]}
                                       inmuebles={inmuebles}
                                       titular={titular}
                                       testada={tester}
                                       adquisicion={adquisicion}
                                       pago={pago}
                                       monedas={monedas}
                                       relacion={relacion}
                                       motivobaja={motivobaja}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={bienesInmuebles.length === 0}>
                              <PagePdf title={"BIENES INMUEBLES      (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={tpVehiculos.length > 0}>
                              {tpVehiculos.map((item, index) => (
                                 <PagePdf key={index} title={"VEHÍCULOS"}>
                                    <Vehiculos
                                       data={[item]}
                                       testada={tester}
                                       relacion={relacion}
                                       titular={titularVehiculos}
                                       vehiculos={vehiculos}
                                       adquisicion={adquisicion}
                                       pago={pago}
                                       monedas={monedas}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={tpVehiculos.length === 0}>
                              <PagePdf title={"VEHÍCULOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={bienesMuebles.length > 0}>
                              {bienesMuebles.map((item, index) => (
                                 <PagePdf key={index} title={"BIENES MUEBLES"}>
                                    <BienesMuebles
                                       name={name}
                                       data={[item]}
                                       testada={tester}
                                       adquisicion={adquisicion}
                                       bienes={tiposbienesmuebles}
                                       monedas={monedas}
                                       motivosBajas={motivobaja}
                                       pago={pago}
                                       relacion={relacion}
                                       titular={titular}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={bienesMuebles.length === 0}>
                              <PagePdf title={"BIENES MUEBLES (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={cuentaValores.length > 0}>
                              {cuentaValores.map((item, index) => (
                                 <PagePdf key={index} title={"INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS"}>
                                    <CuentasValores
                                       data={[item]}
                                       testada={tester}
                                       inversiones={tipoinversion}
                                       titular={titular}
                                       monedas={monedas}
                                       subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={cuentaValores.length === 0}>
                              <PagePdf title={"INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={cuentaValores.length > 0}>
                              {cuentaValores.map((item, index) => (
                                 <PagePdf key={index} title={"ADEUDOS PASIVOS"}>
                                    <AdeudosPasivos
                                       data={[item]}
                                       titular={titular}
                                       monedas={monedas}
                                       adeudos={adeudos}
                                       testada={tester}
                                       // inversiones={tipoinversion}
                                       // titular={titular}
                                       // monedas={monedas}
                                       // subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={cuentaValores.length === 0}>
                              <PagePdf title={"ADEUDOS PASIVOS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>

                           <Ngif condition={prestamosComodatos.length > 0}>
                              {prestamosComodatos.map((item, index) => (
                                 <PagePdf key={index} title={"PRESTAMO O COMODATO POR TERCEROS"}>
                                    <PrestamoComodato
                                       data={[item]}
                                       municipios={municipios}
                                       entidades={entidades}
                                       paises={paises}
                                       relacion={relacion}
                                       inmuebles={inmuebles}
                                       vehiculos={vehiculos}
                                       testada={false}
                                       // inversiones={tipoinversion}
                                       // titular={titular}
                                       // monedas={monedas}
                                       // subInversiones={subInversiones}
                                    />
                                    <Notas
                                       testada={tester}
                                       message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                    />
                                 </PagePdf>
                              ))}
                           </Ngif>
                           <Ngif condition={prestamosComodatos.length === 0}>
                              <PagePdf title={"PRESTAMO O COMODATO POR TERCEROS (NINGUNO)"}>
                                 <Notas
                                    testada={tester}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           </Ngif>
                        </Ngif>
                        <AvisoPrivacidad />
                        <DeclarationDocument row={myRow} />
                        {/* <For array={datosDependienteEconomicos} pdf>
                    {(item, index) => (
                    )}
                 </For> */}
                     </Document>
                  }
                  fileName={`${cleanFileName(myRow?.Folio) + cleanFileName(myRow?.ApPaterno) + cleanFileName(myRow?.ApMaterno) + cleanFileName(myRow?.Nombre)}`}
                  style={{ textDecoration: "none", marginTop: "10px" }}
               >
                  <a
                     id="btnDownloadRef"
                     style={{
                        width: 0,
                        height: 0
                     }}
                     hidden
                  ></a>
               </PDFDownloadLink>
            </Ngif>
         </Box>
      </>
   );
};

const ModalComponent = ({ modal, setModal, message, pass, page, messageExtra }) => {
   useEffect(() => {}, [message, messageExtra]);
   return (
      <Modal close={false} openModal={modal} setOpenModal={setModal}>
         <Box p={2} textAlign="center">
            <Typography variant="subtitle1" color="initial">
               {messageExtra}
            </Typography>
            <Typography mt={2} variant="h4" color="initial">
               Cargando información...
            </Typography>
            <Typography mt={1} mb={2} variant="h5" color="initial">
               {message}
            </Typography>
            <Loading /> {/* Indicador de carga circular */}
            <Typography mt={6} variant="h6" color="initial">
               {pass} de {page}
            </Typography>
         </Box>
      </Modal>
   );
};

export default Checador;
