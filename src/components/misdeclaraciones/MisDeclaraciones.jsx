import { useCallback, useEffect, useMemo, useState } from "react";
import { Axios, GetAxios } from "../../services/services";
import CustomTable from "../Reusables/table/customtable";
import { Button, IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import Print from "@mui/icons-material/LocalPrintshopRounded";
import { Acuse } from "../checador/hojas/acuse/Acuse";
import Spinner from "../loading/Loading";

import { Document, pdf } from "@react-pdf/renderer";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";
import PrintTest from "@mui/icons-material/LocalPrintshopTwoTone";
import Checador from "../checador/Checador";
import { Edit } from "@mui/icons-material";

import { BiSolidTrashAlt } from "react-icons/bi";



// Asumiendo que Axios y ComponenteDeclaraciones están importados aquí o en el archivo principal

// Folios por petición al consultar la data de los PDFs, para no saturar la consulta "IN" del backend
const FETCH_BATCH_SIZE = 10;

// Divide un arreglo en bloques de "size" elementos.
const chunkArray = (array, size) => {
   const chunks = [];
   for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
   }
   return chunks;
};

// Da formato a un total de milisegundos como "X min Y s" (o "Y s" si es menos de un minuto)
const formatDuration = (ms) => {
   const totalSeconds = Math.max(0, Math.round(ms / 1000));
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;
   if (minutes === 0) return `${seconds} s`;
   return `${minutes} min ${seconds} s`;
};

const GeneratePDFsButton = ({ data, cleanFileName, trimestre, anio }) => {
   // 1. Filtrar datos excluyendo "En proceso"
   const downloadableData = useMemo(() => {
      return data.filter(row => {
         // Si no tiene Status o es null, lo incluimos (o puedes decidir excluirlo)
         if (!row.Status) return true;
         return row.Status.toLowerCase() !== "en proceso";
      });
   }, [data]);

   // 2. Estados (sin cambios)
   const [loading, setLoading] = useState(false);
   const [phase, setPhase] = useState(null);
   const [fetchProgress, setFetchProgress] = useState(0);
   const [generateProgress, setGenerateProgress] = useState(0);
   const [estimatedFetchMs, setEstimatedFetchMs] = useState(null);
   const [fetchElapsedMs, setFetchElapsedMs] = useState(0);

   // 3. Handler actualizado para usar downloadableData
   const handleGeneratePDFs = useCallback(async () => {
      // Validación con los datos ya filtrados
      if (!downloadableData.length) {
         return alert("No hay datos disponibles para generar PDFs (se excluyen los 'En proceso')");
      }

      setLoading(true);
      setPhase("fetching");
      setFetchProgress(0);
      setGenerateProgress(0);
      setEstimatedFetchMs(null);
      setFetchElapsedMs(0);

      try {
         // FASE 1: consultar datos en lotes
         const folios = downloadableData.map((row) => row.Folio);
         const batches = chunkArray(folios, FETCH_BATCH_SIZE);
         const pdfsData = {};
         const fetchStart = Date.now();

         for (let i = 0; i < batches.length; i++) {
            const batchStart = Date.now();
            const response = await Axios.post("pdfs/declaracion", { folios: batches[i] });
            Object.assign(pdfsData, response.data);
            const batchEnd = Date.now();

            if (i === 0) {
               const primerLoteMs = batchEnd - batchStart;
               setEstimatedFetchMs(primerLoteMs * batches.length);
            }

            setFetchElapsedMs(batchEnd - fetchStart);
            setFetchProgress(Math.round(((i + 1) / batches.length) * 100));
         }

         // FASE 2: generar PDFs y armar zip
         setPhase("generating");
         setGenerateProgress(0);

         const zip = new JSZip();

         for (let i = 0; i < downloadableData.length; i++) {
            const row = downloadableData[i];
            const pdfData = pdfsData[row.Folio];
            if (!pdfData) {
               console.warn(`No se encontró data para folio ${row.Folio}`);
               continue;
            }

            try {
               const doc = (
                  <Document>
                     <Checador
                        testada={true}
                        type={row?.Declaracion}
                        myRow={row}
                        pdfData={[pdfData]}
                        open={true}
                        setOpen={() => { }}
                     />
                  </Document>
               );

               const blob = await pdf(doc).toBlob();
               const cleanedName = `${cleanFileName(row?.Folio) + cleanFileName(row?.ApPaterno) + cleanFileName(row?.ApMaterno) + cleanFileName(row?.Nombre)}`;
               zip.file(`${cleanedName}.pdf`, blob);
            } catch (err) {
               console.error(`Error generando PDF para folio ${row.Folio}:`, err);
            }

            setGenerateProgress(Math.round(((i + 1) / downloadableData.length) * 100));
            await new Promise((resolve) => setTimeout(resolve, 20));
         }

         const zipBlob = await zip.generateAsync({ type: "blob" });
         saveAs(zipBlob, `Declaraciones_${anio}_trimestre_${trimestre}`);

      } catch (err) {
         console.error("Error generando PDFs:", err);
         alert("Ocurrió un error al generar los PDFs.");
      } finally {
         setLoading(false);
         setPhase(null);
         setFetchProgress(0);
         setGenerateProgress(0);
         setEstimatedFetchMs(null);
         setFetchElapsedMs(0);
      }
   }, [downloadableData, anio, trimestre, cleanFileName]); // dependencia actualizada

   // 4. Texto del botón (usa downloadableData.length)
   const buttonLabel = useMemo(() => {
      if (!loading) return `Descargar ${downloadableData.length} PDF's`;

      if (phase === "fetching") {
         if (estimatedFetchMs != null) {
            const restanteMs = estimatedFetchMs - fetchElapsedMs;
            return `Consultando datos... ${fetchProgress}% (aprox. ${formatDuration(restanteMs)} restantes)`;
         }
         return `Consultando datos... ${fetchProgress}%`;
      }

      if (phase === "generating") {
         return `Generando Zip... ${generateProgress}%`;
      }

      return "Preparando...";
   }, [loading, phase, fetchProgress, generateProgress, estimatedFetchMs, fetchElapsedMs, downloadableData.length]);

   // 5. Renderizado
   return (
      <>
         {![2, 3].includes(Number(localStorage.getItem("Id_Role"))) && (
            <Button
               variant="contained"
               color="primary"
               onClick={handleGeneratePDFs}
               disabled={loading || downloadableData.length === 0}
               startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Print />}
               style={{ minWidth: 260 }}
            >
               {buttonLabel}
            </Button>
         )}
      </>
   );
};

const MisDeclaraciones = ({ checador = false }) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState({ acuse: false, testada: false, declaracion: false });
   const [pdfData, setPdfData] = useState(null);
   const [loadingPdf, setLoadingPdf] = useState(false);
   const [row, setRow] = useState({});
   const [trimestre, setTrimestre] = useState("");
   const [anio, setAnio] = useState("");
   const [filteredData, setFilteredData] = useState([]);

   useEffect(() => {
      init();
   }, []);
   const cleanFileName = (text) => {
      if (!text) return text;
      return text
         .normalize("NFD")
         .replace(/[\u0300-\u036f]/g, "")
         .replace(/[^a-zA-Z0-9]/g, "")
         .toUpperCase();
   };
   useEffect(() => {
      // Asegurar que data sea un arreglo antes de intentar filtrar
      if (!data || !Array.isArray(data)) {
         setFilteredData([]); // o setFilteredData(data) si quieres mantener el valor original
         return;
      }

      let temp = [...data];

      if (trimestre && anio) {
         temp = temp.filter(d => {
            // Verificar que d existe y tiene las propiedades necesarias
            if (!d) return false;

            const ejercicioNum = Number(d.Ejercicio);
            const anioNum = Number(anio);
            const trimestreNum = Number(d.Trimestre);
            const trimestreFiltro = Number(trimestre);

            // Solo comparar si los números son válidos
            return !isNaN(ejercicioNum) && !isNaN(anioNum) &&
               !isNaN(trimestreNum) && !isNaN(trimestreFiltro) &&
               ejercicioNum === anioNum && trimestreNum === trimestreFiltro;
         });
      }

      setFilteredData(temp);
   }, [data, trimestre, anio]);

   const handleEditDeclaracion = (row) => {
      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      let number = Declara(Declaracion, Tipo_declaracion);

      let page = Hoja;
      if (Tipo_declaracion == 'Modificación' && Declaracion == 'Completa') {
         console.log("aqui es")
         page = Number(page) - 1;  // o parseInt(page, 10) - 1
      }

      window.location.hash = `dashboard/declaraciones/${number}/${parseInt(page)}`;
   };
   const Declara = (tipo_declaracion, declaracion) => {
      let number = 0;
      if (declaracion == "Inicial") {
         number = tipo_declaracion == "Simplificada" ? 4 : 1;
      } else if (declaracion == "Modificación") {
         number = tipo_declaracion == "Simplificada" ? 5 : 2;
      } else if (declaracion == "Conclusión") {
         number = tipo_declaracion == "Simplificada" ? 6 : 3;
      }
      return number;
   };
   const init = async () => {
      setLoading(true);
      const url = checador ? `apartados/all` : `apartados/show/${parseInt(localStorage.getItem("Id_User") ?? "")}`;
      const response = await GetAxios(url);
      if (localStorage.getItem("Id_Role") == "1") {
         setData(response);

         //   const items  =  response.map(it=>it.)
      }
      else {
         setData(response);

      }
      setLoading(false);
   };

   const handleAcuse = async (id) => {
      setLoadingPdf(true);
      setPdfData(await GetAxios(`pdfs/acuse/${id}`));
      setOpen({ acuse: true, declaracion: false, testada: false });
      setLoadingPdf(false);
   };

   const handlePdf = async (row) => {
      setLoadingPdf(true);
      setRow(row);
      const response = await Axios.get(`pdfs/declaracion/${row.Folio}`);
      setPdfData(response.data);
      setOpen({ acuse: false, declaracion: true, testada: false });
      setLoadingPdf(false);
   };

   const handleDelete = async (row) => {
      setLoadingPdf(true);
      const response = await Axios.post("apartados/delete", { Id_SituacionPatrimonial: row.Folio });
      const pdfsData = response.data;
      init()

      setLoadingPdf(false);
   };

   const handlePdfTestada = async (row) => {
      setLoadingPdf(true);
      setRow(row);
      const response = await Axios.get(`pdfs/declaracion/${row.Folio}`);
      setPdfData(response.data);
      setOpen({ acuse: false, declaracion: false, testada: true });
      setLoadingPdf(false);
   };
   return (
      <>
         {/* FILTROS */}
         {/* FILTROS */}
         {![2, 3].includes(Number(localStorage.getItem("Id_Role"))) && (

            <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
               <FormControl size="small" style={{ minWidth: 120 }}>
                  <InputLabel>Trimestre</InputLabel>
                  <Select value={trimestre} label="Trimestre" onChange={(e) => setTrimestre(e.target.value)}>
                     <MenuItem value="">Todos</MenuItem>
                     <MenuItem value={1}>1</MenuItem>
                     <MenuItem value={2}>2</MenuItem>
                     <MenuItem value={3}>3</MenuItem>
                     <MenuItem value={4}>4</MenuItem>
                  </Select>
               </FormControl>

               <FormControl size="small" style={{ minWidth: 120 }}>
                  <InputLabel>Año</InputLabel>
                  <Select value={anio} label="Año" onChange={(e) => setAnio(e.target.value)}>
                     <MenuItem value="">Todos</MenuItem>
                     {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                     ))}
                  </Select>
               </FormControl>

               <Button variant="outlined" color="secondary" onClick={() => { setTrimestre(""); setAnio(""); }}>
                  Reset
               </Button>
            </div>
         )}


         {/* TABLA */}
         <CustomTable
            headerActions={() => (
               <GeneratePDFsButton
                  cleanFileName={cleanFileName}
                  data={filteredData}
                  open={open}
                  row={row}
                  trimestre={trimestre}
                  anio={anio}
                  pdfData={pdfData}
                  setOpen={setOpen}
               />
            )}
            data={filteredData}
            paginate={[10, 25, 50]}
            loading={loading}
            columns={[
               { field: "Folio", headerName: "Folio" },
               { field: "NombreCompleto", headerName: "Nombre" },
               {
                  field: "Declaracion",
                  headerName: "Declaracion",
                  renderField: (v) => (
                     <span className="inline-block px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                        {v || "N/A"}
                     </span>
                  ),
               },
               {
                  field: "Tipo_declaracion",
                  headerName: "Tipo de declaracion",
                  renderField: (v) => {
                     let color = "bg-gray-100 text-gray-800";

                     if (v === "Inicial") color = "bg-green-100 text-green-800";
                     else if (v === "Modificación") color = "bg-yellow-100 text-yellow-800";
                     else if (v === "Conclusión") color = "bg-red-100 text-red-800";

                     return (
                        <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${color}`}>
                           {v || "N/A"}
                        </span>
                     );
                  },
               },
               { field: "Status", headerName: "Status" },

               { field: "FechaRegistroFormateada", headerName: "Fecha Registro" },
               { field: "FechaFechaTerminadaFormateada", headerName: "Fecha Terminada" },


               // ... aquí puedes mantener tus renderField para Status, Tipo_declaracion, etc.
            ]}
            actions={(row) => (
               <>
                  {[2, 3].includes(Number(localStorage.getItem("Id_Role"))) && row.Status != "Terminada" && (
                     <Tooltip title="Editar">
                        <IconButton className="hover:cursor-pointer" onClick={() => {
                           handleEditDeclaracion(row)
                        }} >
                           <Edit style={
                              {
                                 color: "orange"
                              }
                           } />
                        </IconButton>
                     </Tooltip>
                  )}
                  {row.Status === "Terminada" && (
                     <>
                        <Tooltip title="Acuse">
                           <IconButton onClick={() => handleAcuse(row.Folio)}>
                              <ReceiptOutlinedIcon style={{ color: "#F39C12" }} />
                           </IconButton>
                        </Tooltip>

                        <Tooltip title="PDF">
                           <IconButton onClick={() => handlePdf(row)}>
                              <Print style={{ color: "#27AE60" }} />
                           </IconButton>
                        </Tooltip>

                        {!([2, 3].includes(Number(localStorage.getItem("Id_Role")))) && (
                           <>
                              <Tooltip title="Testada">
                                 <IconButton onClick={() => handlePdfTestada(row)}>
                                    <PrintTest style={{ color: "gray" }} />
                                 </IconButton>
                              </Tooltip>
                           </>
                        )}
                     </>
                  )}
                  <Tooltip title="Eliminar">
                     <IconButton onClick={() => handleDelete(row)}>
                        <BiSolidTrashAlt style={{ color: "red" }} />
                     </IconButton>
                  </Tooltip>

               </>
            )}
         />

         {loadingPdf && <Spinner />}
         {(open.acuse) && pdfData && (
            <PdfDeclaracion

               fileName={
                  cleanFileName(row?.Id_SituacionPatrimonial) +
                  cleanFileName(row?.FullName)
               }
               title="ACUSE"
               open={true}
               setOpen={() => setOpen({ acuse: false, declaracion: false, testada: false })}
               formTitle="ACUSE"
            >
               <Acuse
                  data={pdfData}
               />

            </PdfDeclaracion>
         )}
         {(open.declaracion || open.testada) && pdfData && (
            <PdfDeclaracion

               fileName={
                  cleanFileName(row?.Id_SituacionPatrimonial) +
                  cleanFileName(row?.FullName)
               }
               title="DECLARACION"
               open={true}
               setOpen={() => setOpen({ acuse: false, declaracion: false, testada: false })}
               formTitle="DECLARACION"
            >
               <Checador
                  testada={open.testada}
                  type={row?.Declaracion}
                  open={true}
                  setOpen={() => setOpen({ acuse: false, declaracion: false, testada: false })}
                  myRow={row}
                  pdfData={pdfData}
               />

            </PdfDeclaracion>
         )}
      </>
   );
};

export default MisDeclaraciones;