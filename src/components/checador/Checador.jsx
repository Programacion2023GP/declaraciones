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

export const Checador = ({}) => {
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
      vehiculos
   } = Request({
      peticiones: [
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
         "vehiculos"
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

   const [message, setMessage] = useState();
   const [loadingMessage, setLoadingMessage] = useState(null);
   const [modal, setModal] = useState(false);
   const [pass, setPass] = useState(false);
   const [peticionesLoading, setPeticionesLoading] = useState(false);
   const [selectedDeclaracion, setSelectedDeclaracion] = useState(0);
   const [pages, setPages] = useState(0);

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
         vehiculos
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
      vehiculos
   ]);
   const init = async () => {
      setLoading(true);
      setData(await GetAxios(`apartados/all`));
      setLoading(false);
   };
   const handelPdf = async (row) => {
      console.log(row.Declaracion, row.Tipo_declaracion);
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
         setMessage("bienes inmuebles");

         setPass(page == 15 ? 10 : page > 6 ? 8 : 6);
         setBienesInmuebles(await GetAxios(`bienesinmuebles/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente

         setPass(page == 15 ? 11 : page > 6 ? 9 : 7);
         setMessage("vehiculos");
         setTpVehiculos(await GetAxios(`vehiculos/index/${row.Folio}`));
         await delay(500); // Esperar medio segundo nuevamente
      } catch (error) {
         console.error("Error al obtener datos:", error);
      } finally {
         OpenPdf();
      }
   };
   useEffect(() => {
      console.log("tpVehiculos", tpVehiculos);
   }, [selectedDeclaracion, tpVehiculos]);
   const OpenPdf = () => {
      setModal(false);
      setMessage("");
      setPass(0);
      setLoadingMessage(false);
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
                  <DataTable
                     options={["CHARTS", "EXCEL", "COLORS"]}
                     // , "PDF",
                     moreButtons={[{ icon: VisibilityIcon, handleButton: handelPdf, color: "green", conditions: ["Tstatus == 'Terminada'"] }]}
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
                           testada={true}
                        />
                        <Notas
                           testada={true}
                           message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                        />
                     </PagePdf>
                     <PagePdf title={"DOMICILIO DEL DECLARANTE"}>
                        <DomiDeclarante data={domiciliioDeclarante} municipios={municipios} entidades={entidades} paises={paises} testada={true} />
                        <Notas
                           testada={true}
                           message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                        />
                     </PagePdf>
                     <PagePdf title={"DATOS CURRICULARES DEL DECLARANTE"}>
                        <DatosCurriculares
                           data={datosCurriculares}
                           nivelEstudios={nivelEstudios}
                           estatus={estatus}
                           documentosObtenidos={documentosObtenidos}
                           testada={true}
                        />
                     </PagePdf>
                     <PagePdf title={"DATOS DEL EMPLEO CARGO O COMISIÓN"}>
                        <DatosEmpleoCargo
                           testada={true}
                           data={datosEmpleos}
                           nivelOrdenGobierno={nivelOrdenGobierno}
                           ambitoPublico={ambitoPublico}
                           municipios={municipios}
                           entidades={entidades}
                           paises={paises}
                        />
                     </PagePdf>
                     <PagePdf title={"EXPERIENCIA LABORAL"}>
                        <ExperienciaLaboral data={experienciaLaboral} ambitopublico={ambitoPublico} testada={true} />
                     </PagePdf>
                     <Ngif condition={selectedDeclaracion < 4}>
                        <PagePdf title={"DATOS DE LA PAREJA"}>
                           <DatosPareja data={datosPareja} relacion={relacion} testada={true} />
                           <Notas
                              testada={true}
                              message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                           />
                        </PagePdf>
                        <Ngif condition={datosDependienteEconomicos.length > 0}>
                           {datosDependienteEconomicos.map((item, index) => (
                              <PagePdf key={item.Id_DatosDependienteEconomico} title={"DATOS DEL DEPENDIENTE ECONOMICO"}>
                                 <DependientesEconomicos data={[item]} relacion={relacion} testada={true} />
                                 <Notas
                                    testada={true}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           ))}
                        </Ngif>
                        <Ngif condition={datosDependienteEconomicos.length === 0}>
                           <PagePdf title={"DATOS DEL DEPENDIENTE ECONOMICO       (NINGUNO)"}>
                              <Notas
                                 testada={true}
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
                           testada={true}
                           instrumentos={instrumentos}
                        />
                        <Notas
                           testada={true}
                           message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                        />
                     </PagePdf>
                     <Ngif condition={selectedDeclaracion == 2}>
                        <PagePdf title={"¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR? NO"}>
                           <ServidorPublico data={servidorPublico} instrumentos={instrumentos} bienenAjenacion={bienenAjenacion} testada={true} />
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
                                    testada={true}
                                    adquisicion={adquisicion}
                                    pago={pago}
                                    monedas={monedas}
                                    relacion={relacion}
                                    motivobaja={motivobaja}
                                 />
                                 <Notas
                                    testada={true}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           ))}
                        </Ngif>
                        <Ngif condition={bienesInmuebles.length === 0}>
                           <PagePdf title={"BIENES INMUEBLES      (NINGUNO)"}>
                              <Notas
                                 testada={true}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                        </Ngif>

                        <Ngif condition={tpVehiculos.length > 0}>
                           {tpVehiculos.map((item, index) => (
                              <PagePdf key={index} title={"VEHÍCULOS"}>
                                 <Vehiculos data={[item]} testada={false} relacion={relacion} titular={titularVehiculos} vehiculos={vehiculos} />
                                 <Notas
                                    testada={true}
                                    message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                                 />
                              </PagePdf>
                           ))}
                        </Ngif>
                        <Ngif condition={tpVehiculos.length === 0}>
                           <PagePdf title={"VEHÍCULOS (NINGUNO)"}>
                              <Notas
                                 testada={true}
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
            <Typography mt={2} variant="h6" color="initial">
               {pass} de {page}
            </Typography>
         </Box>
      </Modal>
   );
};
