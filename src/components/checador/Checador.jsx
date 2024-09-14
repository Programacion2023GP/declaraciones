import { useEffect, useRef, useState } from "react";
import DataTable, { Modal } from "../Reusables/table/DataTable";
import { Box, Card, Grid, Typography, Button, IconButton } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Axios, GetAxios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";
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
         setPeticionesLoading(true);
      }
   };
   const [declaraciones, setDeclaraciones] = useState([]);
   const [masive, setMasive] = useState(false);
   // const btnDownloadRef = useRef(null);
   const btnDownloadRef = document.getElementById("btnDownloadRef");

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
   useEffect(() => {}, [adscripcion]);
   const handlePdfTester = async (row) => {
      setMasive(false);
      setTexter(true);
      handelPdf(row);
   };
   const handlePdfPrint = async (row) => {
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

   const handelPdf = async (row) => {
      const declaracion = {
         datosGenerales: null,
         domicilioDeclarante: null,
         datosCurriculares: null,
         datosEmpleos: null,
         experienciaLaboral: null,
         datosPareja: null,
         datosDependienteEconomicos: null,
         ingresosNetos: null,
         servidorPublico: null,
         bienesInmuebles: null,
         tpVehiculos: null,
         bienesMuebles: null,
         cuentaValores: null,
         adeudos: null,
         prestamosComodatos: null
      };
      const declaraciones = [];
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
         const resDatosGenerales = await GetAxios(`datosgenerales/index/${row.Folio}`);
         declaracion.datosGenerales = resDatosGenerales;
         setDatosGenerales(resDatosGenerales);
         // if (masive) {
         //    const resDatosGenerales = await GetAxios(`datosgenerales/index/masive/${folios}`);
         // } else setDatosGenerales(await GetAxios(`datosgenerales/index/${row.Folio}`));

         await delay(500); // Esperar medio segundo (500 milisegundos)
         setPass(2);
         const resDomicilioDeclarante = await GetAxios(`domiciliodeclarante/index/${row.Folio}`);
         setDomiciliioDeclarante(resDomicilioDeclarante);
         declaracion.domicilioDeclarante = resDatosGenerales;

         setMessage("Domicilio declarante");
         // setDomiciliioDeclarante(await GetAxios(`domiciliodeclarante/index/${row.Folio}`));

         await delay(500); // Esperar medio segundo nuevamente
         setPass(3);

         setMessage("Datos curriculares");
         const resDatosCurriculares = await GetAxios(`datoscurriculares/index/${row.Folio}`);
         setDomiciliioDeclarante(resDomicilioDeclarante);
         declaracion.datosCurriculares = resDatosCurriculares;
         // setDatosCurriculares(await GetAxios(`datoscurriculares/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente
         setPass(4);

         setMessage("Datos empleos cargo Comisión");
         const resDatosEmpleos = await GetAxios(`datoscargoscomision/index/${row.Folio}`);
         setDatosEmpleos(resDatosEmpleos);
         declaracion.datosEmpleos = resDatosEmpleos;

         setPass(5);

         setMessage("Experiencia Laboral");
         const resExperienciaLaboral = await GetAxios(`experiencialaboral/index/${row.Folio}`);
         setExperienciaLaboral(resExperienciaLaboral);
         declaracion.experienciaLaboral = resExperienciaLaboral;
         // setExperienciaLaboral(await GetAxios(`experiencialaboral/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente
         if (page > 6) {
            setPass(6);
            setMessage("Datos de la pareja");
            const resDatosPareja = await GetAxios(`datospareja/index/${row.Folio}`);
            setDatosPareja(resDatosPareja);
            declaracion.datosPareja = resDatosPareja;
            await delay(500); // Esperar medio segundo nuevamente

            setPass(7);
            const resDependientesEconomicos = await GetAxios(`dependienteseconomicos/index/${row.Folio}`);

            setMessage("Datos de los dependientes economicos");
            setDatosDependienteEconomicos(resDependientesEconomicos);
            declaracion.datosDependienteEconomicos = resDependientesEconomicos;
            await delay(500); // Esperar medio segundo nuevamente
         }

         setPass(page > 6 ? 8 : 6);
         setMessage("ingresos netos");
         const resIngresos = await GetAxios(`ingresos/index/${row.Folio}`);

         setIngresosNetos(resIngresos);
         declaracion.ingresosNetos = resIngresos;
         await delay(500); // Esperar medio segundo nuevamente

         if (page == 15) {
            setPass(9);
            setMessage("servidor publico");
            const resServidorPublico = await GetAxios(`servidorpublico/index/${row.Folio}`);
            setServidorPublico(resServidorPublico);
            await delay(500); // Esperar medio segundo nuevamente
         }
         if (page > 6) {
            setMessage("bienes inmuebles");
            setPass(page == 15 ? 10 : page > 6 ? 9 : 7);
            const resBienesInmuebles = await GetAxios(`bienesinmuebles/index/${row.Folio}`);
            setBienesInmuebles(resBienesInmuebles);
            declaracion.bienesInmuebles = resBienesInmuebles;
            // setBienesInmuebles(await GetAxios(`bienesinmuebles/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 11 : page > 6 ? 10 : 8);
            setMessage("vehiculos");
            const resVehiculos = await GetAxios(`vehiculos/index/${row.Folio}`);
            setTpVehiculos(resVehiculos);
            declaracion.tpVehiculos = resVehiculos;
            // setTpVehiculos(await GetAxios(`vehiculos/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 12 : page > 6 ? 11 : 9);
            setMessage("bienes muebles");
            const resBienesMuebles = await GetAxios(`bienesmuebles/index/${row.Folio}`);
            setBienesMuebles(resBienesMuebles);
            declaracion.bienesMuebles = resBienesMuebles;
            // setBienesMuebles(await GetAxios(`bienesmuebles/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 13 : page > 6 ? 12 : 10);
            setMessage("inversiones cuentas valores");
            const resCuentasValores = await GetAxios(`inversionescuentas/index/${row.Folio}`);
            setCuentaValores(resCuentasValores);
            declaracion.cuentaValores = resCuentasValores;
            // setCuentaValores(await GetAxios(`inversionescuentas/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 14 : page > 6 ? 13 : 11);
            setMessage("adeudos");
            const resAdeudos = await GetAxios(`adeudospasivos/index/${row.Folio}`);
            setAdeudos(resAdeudos);
            declaracion.adeudos = resAdeudos;
            // setAdeudos(await GetAxios(`adeudospasivos/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 15 : page > 6 ? 14 : 12);
            const resPrestamosComodatos = await GetAxios(`prestamoscomodatos/index/${row.Folio}`);
            setMessage("prestamos comodatos");
            setPrestamosComodatos(resPrestamosComodatos);
            declaracion.prestamosComodatos = resPrestamosComodatos;
            // setPrestamosComodatos(await GetAxios(`prestamoscomodatos/index/${row.Folio}`));
            await delay(500);
            if (masive) {
               declaraciones.push(declaracion);
               setDeclaraciones(declaraciones);
            }
            // pushear a declaraciones
         }
      } catch (error) {
         console.error("Error al obtener datos:", error);
      } finally {
         OpenPdf();
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
   useEffect(() => {}, [selectedDeclaracion, name, prestamosComodatos, testerDates]);
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
      if (text === undefined || text === null) return text;

      return text
         .normalize("NFD") // Normaliza los acentos
         .replace(/[\u0300-\u036f]/g, "") // Remueve los acentos
         .replace(/[^a-zA-Z0-9]/g, "") // Remueve caracteres especiales y espacios
         .replace(/\s+/g, ""); // Remueve cualquier espacio extra por si queda alguno
   };
   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedDate2, setSelectedDate2] = useState(null);
   const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
   };
   const handleDateChange2 = (e) => {
      setSelectedDate2(e.target.value);
   };
   const handleClickButtonMasive = async () => {
      setMasive(true);
      const folios = [];
      const dataFiltrados = data.slice(0, 10).filter((item) => {
         // console.log(item);
         const fecaInicio = new Date("05/09/2024");
         const fecaFin = new Date("12/09/2024");
         const fechaREgistro = new Date(item.FechaRegistroFormateada);
         if (fecaInicio <= fechaREgistro && fecaFin >= fechaREgistro) folios.push(item.Folio);
      });
      console.log("🚀 ~ dataFiltrados ~ dataFiltrados:", dataFiltrados);

      const foliosStirng = folios.join();
      console.log("🚀 ~ handleClickButtonMasive ~ foliosStirng:", foliosStirng);

      await handelPdf(data[0]);
      // btnDownloadRef = document.getElementById("btnDownloadRef");
      console.log("🚀 ~ handleClickButtonMasive ~ btnDownloadRef:", btnDownloadRef);
      btnDownloadRef.click();
      // setMasive(false);
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
                     <label htmlFor="dateInput">Selecciona una fecha:</label>
                     <input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} />
                     <p>Fecha seleccionada 1: {selectedDate}</p>
                  </div>
                  <div>
                     <label htmlFor="dateInput">Selecciona una fecha:</label>
                     <input type="date" id="dateInput" value={selectedDate2} onChange={handleDateChange2} />
                     <p>Fecha seleccionada 2: {selectedDate2}</p>
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
                  <ModalComponent message={message} modal={modal} setModal={setModal} pass={pass} page={pages}></ModalComponent>
               )
            ) : (
               ""
            )}
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
               fileName={"archivo.pdf"}
               style={{ textDecoration: "none", marginTop: "10px" }}
            >
               <button
                  id="btnDownloadRef"
                  style={{
                     backgroundColor: "#efefefe",
                     color: "3e3e3e",
                     borderRadius: "8px",
                     paddingInline: 10,
                     border: "none",
                     cursor: "pointer",
                     fontWeight: "bolder",
                     fontSize: "12px",
                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                     transition: "background-color 0.3s ease",
                     marginTop: -10
                  }}
               >
                  Descargar PDF
               </button>
            </PDFDownloadLink>
         </Box>
      </>
   );
};

const ModalComponent = ({ modal, setModal, message, pass, page }) => {
   useEffect(() => {}, [message]);
   return (
      <Modal close={false} openModal={modal} setOpenModal={setModal}>
         <Box p={2} textAlign="center">
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
