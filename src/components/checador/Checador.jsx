import { useEffect, useState } from "react";
import DataTable, { Modal } from "../Reusables/table/DataTable";
import { Box, Card, Grid, Typography } from "@mui/material";
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
      setData(await GetAxios(`apartados/all`));
      setLoading(false);
   };
   const handlePdfTester = async (row) => {
      setTexter(true);
      handelPdf(row);
   };
   const handlePdfPrint = async (row) => {
      setTexter(false);
      handelPdf(row);
   };
   const handleAcuse = async (row) => {
      setDatosGenerales(await GetAxios(`datosgenerales/acuse/${row.Folio}`));
      setTtpDeclaracion(row.Tipo_declaracion);
      setAcuse(true);
   };

   const handelPdf = async (row) => {
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
         setDatosGenerales(await GetAxios(`datosgenerales/index/${row.Folio}`));

         await delay(500); // Esperar medio segundo (500 milisegundos)
         setPass(2);

         setMessage("Domicilio declarante");
         setDomiciliioDeclarante(await GetAxios(`domiciliodeclarante/index/${row.Folio}`));

         await delay(500); // Esperar medio segundo nuevamente
         setPass(3);

         setMessage("Datos curriculares");
         setDatosCurriculares(await GetAxios(`datoscurriculares/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente
         setPass(4);

         setMessage("Datos empleos cargo Comisión");
         setDatosEmpleos(await GetAxios(`datoscargoscomision/index/${row.Folio}`));

         setPass(5);
         setMessage("Experiencia Laboral");
         setExperienciaLaboral(await GetAxios(`experiencialaboral/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente
         if (page > 6) {
            setPass(6);
            setMessage("Datos de la pareja");
            setDatosPareja(await GetAxios(`datospareja/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(7);
            setMessage("Datos de los dependientes economicos");
            setDatosDependienteEconomicos(await GetAxios(`dependienteseconomicos/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente
         }

         setPass(page > 6 ? 8 : 6);
         setMessage("ingresos netos");
         setIngresosNetos(await GetAxios(`ingresos/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente

         if (page == 15) {
            setPass(9);
            setMessage("servidor publico");
            setServidorPublico(await GetAxios(`servidorpublico/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente
         }
         if (page > 6) {
            setMessage("bienes inmuebles");
            setPass(page == 15 ? 10 : page > 6 ? 9 : 7);
            setBienesInmuebles(await GetAxios(`bienesinmuebles/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 11 : page > 6 ? 10 : 8);
            setMessage("vehiculos");
            setTpVehiculos(await GetAxios(`vehiculos/index/${row.Folio}`));
            await delay(500); // Esperar medio segundo nuevamente

            setPass(page == 15 ? 12 : page > 6 ? 11 : 9);
            setMessage("bienes muebles");
            setBienesMuebles(await GetAxios(`bienesmuebles/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 13 : page > 6 ? 12 : 10);
            setMessage("inversiones cuentas valores");
            setCuentaValores(await GetAxios(`inversionescuentas/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 14 : page > 6 ? 13 : 11);
            setMessage("adeudos");
            setAdeudos(await GetAxios(`adeudospasivos/index/${row.Folio}`));
            await delay(500);

            setPass(page == 15 ? 15 : page > 6 ? 14 : 12);
            setMessage("prestamos comodatos");
            setPrestamosComodatos(await GetAxios(`prestamoscomodatos/index/${row.Folio}`));
            await delay(500);
         }
      } catch (error) {
         console.error("Error al obtener datos:", error);
      } finally {
         OpenPdf();
      }
   };
   useEffect(() => {
      console.log("prestamosComodatos", prestamosComodatos);
   }, [selectedDeclaracion, name, prestamosComodatos]);
   const OpenPdf = () => {
      setModal(false);
      setMessage("");
      setPass(0);
      setLoadingMessage(false);
   };
   const idRole = parseInt(localStorage.getItem('Id_Role'), 10);
   const isRoleOne = idRole === 1;
 
   // Construcción condicional del array de botones
   const moreButtons = [
     isRoleOne && {
       tooltip: 'Imprimir',
       color: '#27AE60',
       icon: Print,
       toltip: "Imprimir",
       handleButton: handlePdfPrint,
       conditions: ["Tstatus == 'Terminada'"]
     },
     {
       tooltip: 'Imprimir testada',
       color: 'black',
       icon: PrintTest,
       toltip: "Imprimir testada",
       handleButton: handlePdfTester,
       conditions: ["Tstatus == 'Terminada'"]
     },
     isRoleOne && {
       tooltip: 'Acuse',
       color: '#F39C12',
       icon: ReceiptOutlinedIcon,
       toltip: "Acuse",
       handleButton: handleAcuse,
       conditions: ["Tstatus == 'Terminada'"]
     }
   ].filter(Boolean);
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
                  <DataTable
                     options={["CHARTS", "EXCEL", "COLORS"]}
                     // , "PDF",
                     moreButtons={moreButtons}
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
                     headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Modalidad de la declaración", "Tipo de declaración", "Estatus", "Fecha"]}
                     data={data}
                     // por hacer  getUrl ={}
                     // refreshRequest ={}
                     //
                     pagination={[8, 20, 40, 60, 100]}
                     //  conditionExistEditButton={["Status !='Terminada'"]}
                     speakRow
                     // conditionExistDeleteButton={["Status !='Terminada'"]}
                     // options={true}
                  />
               </Box>
            </Card>

            <PdfDeclaracion title={"ACUSE"} open={acuse} setOpen={setAcuse} formTitle={"ACUSE"}>
               <Acuse data={datosGenerales} declaracion={tpDeclaracion} />
            </PdfDeclaracion>

            {loadingMessage != null ? (
               !loadingMessage && peticionesLoading ? (
                  <PdfDeclaracion title={"DECLARACION"} open={open} setOpen={setOpen} formTitle={"OFICIO DE VALES"} watermark={"Declaracion"}>
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
                     {/* <For array={datosDependienteEconomicos} pdf>
                        {(item, index) => (
                        )}
                     </For> */}
                  </PdfDeclaracion>
               ) : (
                  <ModalComponent message={message} modal={modal} setModal={setModal} pass={pass} page={pages}></ModalComponent>
               )
            ) : (
               ""
            )}
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