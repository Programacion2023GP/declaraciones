import { Box, Card, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { useEffect, useRef, useState } from "react";
import { GetAxios } from "../../../services/services";

const Trasparencia = ({}) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [ejercio, setEjercio] = useState(new Date().getFullYear());
   const [trimestre, setTrimestre] = useState("Enero - Marzo");
   const parent = useRef(null);

   const init = async (anio, trimestre) => {
      setData([]);
      setLoading(true);
      const data = await GetAxios(`reportes/trasparencia${anio ? "/" + anio : ""}${trimestre ? "/" + trimestre : ""}`);
      let mayusc = [];
      data.map((item) => {
         let json = {};
         json = { ...item };
         json.Hipervinculo = "https://transparencia.gomezpalacio.gob.mx/wp-content/uploads/declaraciones/" + json.Hipervinculo.toUpperCase() + ".pdf";
         mayusc.push(json);
      });

      setData(mayusc);
      setLoading(false);
   };
   useEffect(() => {
      init(new Date().getFullYear(), 1);
   }, []);
   const obtenerAnios = () => {
      const fechaActual = new Date();
      const anioActual = fechaActual.getFullYear();
      const anios = [];

      for (let i = 0; i <= 8; i++) {
         anios.push(anioActual - i);
      }

      return anios;
   };
   const searchFilters = () => {
      switch (trimestre) {
         case "Enero - Marzo":
            init(ejercio, 1);
            break;
         case "Abril - Junio":
            init(ejercio, 2);

            break;
         case "Julio - Septiembre":
            init(ejercio, 3);

            break;
         case "Octubre - Diciembre":
            init(ejercio, 4);

            break;
      }
   };
   const Filters = ({ data = [], title = "", setFilter, filter }) => {
      useEffect(() => {}, [data, title]);

      const handleChange = (event) => {
         setFilter(event.target.value);
      };

      return (
         <>
            <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
               <InputLabel id="demo-select-small-label">{title}</InputLabel>
               <Select fullWidth labelId="demo-select-small-label" id="demo-select-small" value={filter} label={title} onChange={handleChange}>
                  <MenuItem value="">
                     <em>Selecciona una opción</em>
                  </MenuItem>
                  {data.map((item, index) => (
                     <MenuItem key={index} value={item}>
                        {item}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </>
      );
   };
   return (
      <Card ref={parent} sx={{ maxWidth: "90%", overflowY: "auto", maxHeight: "80vh", margin: "0 auto", boxShadow: 3, padding: 2 }}>
         <Box sx={{ minWidth: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <DataTable
               parent={parent}
               fileName={trimestre}
               options={["CHARTS", "EXCEL"]}
               captionFilters={
                  <>
                     <Filters data={obtenerAnios()} title="Ejercicio" setFilter={setEjercio} filter={ejercio} />
                     <Filters
                        data={["Enero - Marzo", "Abril - Junio", "Julio - Septiembre", "Octubre - Diciembre"]}
                        title="Trimestre"
                        setFilter={setTrimestre}
                        filter={trimestre}
                     />
                     <Button size="small" variant="outlined" color="primary" onClick={searchFilters}>
                        buscar
                     </Button>
                  </>
               }
               //   Trbacground={[
               //      { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Tstatus == 'Terminada'"], text: "Declaraciones completas terminadas" },
               //      { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Tstatus == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
               //      { color: "#F2F2CC", conditions: ["Tstatus == 'En proceso'"], text: "Declaraciones sin finalizar" }
               //   ]}
               buttonsMenu={false}
               loading={loading}
               filterGlobal={true}
               filter={true}
               dataHidden={["Trimestre"]}
               headers={[
                  "Ejercicio",
                  "Fecha de inicio del periodo que se informa",
                  "Fecha de término del periodo que se informa",
                  "ESTE CRITERIO APLICA A PARTIR DEL 01/04/2023 -> Tipo de integrante del sujeto obligado (catálogo)",
                  "Clave o nivel del puesto",
                  "Denominación del puesto (Redactados con perspectiva de género)",
                  "Denominación del cargo",
                  "Área de adscripción",
                  "Nombre(s) del(la) servidor(a) público(a)",
                  "Primer apellido del(la) servidor(a) público(a)",
                  "Segundo apellido del(la) servidor(a) público(a)",
                  "ESTE CRITERIO APLICA A PARTIR DEL 01/04/2023 -> Sexo (catálogo)",
                  "Modalidad de la Declaración Patrimonial (catálogo)",
                  "Hipervínculo a la versión pública Declaración de Situación Patrimonial",
                  "Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualizan la información",
                  "Fecha de actualización",
                  "Nota"
               ]}
               link={[13]}
               data={data}
               // por hacer  getUrl ={}
               // refreshRequest ={}
               //
               pagination={[5, 10, 50, 75, 100]}
               excelLayout={[
                  { row: 1, write: [{ letter: "A", write: "49080" }] },
                  {
                     row: 2,
                     color: "000000",
                     finish: "I",
                     textColor: "ffffff",
                     write: [
                        { letter: "A", write: "TíTULO", spacing: ["A", "B", "C"] },
                        { letter: "D", write: "NOMBRE CORTO", spacing: ["D", "E", "F"] },
                        { letter: "G", write: "DESCRIPCIÓN", spacing: ["G", "H", "I"] }
                     ]
                  },
                  {
                     row: 3,
                     color: "E1E1E1",
                     finish: "I",
                     write: [
                        { letter: "A", write: "Declaraciones de Situación Patrimonial de las personas servidoras públicas", spacing: ["A", "B", "C"] },
                        { letter: "D", write: "LTAIPED65XII", spacing: ["D", "E", "F"] },
                        {
                           letter: "G",
                           write: `Se publicará la versión pública de la declaración de situación patrimonial de los(as) servidores(as) públicos(as), integrantes, miembros del sujeto obligado y/o toda persona que desempeñe un empleo, cargo o comisión y/o ejerza actos de autoridad, y que tiene la obligación de presentar declaración de situación patrimonial en sus tres modalidades: inicio, modificación y de conclusión, de conformidad con la normatividad que resulte aplicable.`,
                           spacing: ["G", "H", "I"]
                        }
                     ]
                  },
                  {
                     row: 4,
                     height: 1.5,

                     write: [
                        {
                           letter: "A",
                           write: "1"
                        },
                        {
                           letter: "B",
                           write: "4"
                        },
                        {
                           letter: "C",
                           write: "4"
                        },
                        {
                           letter: "D",
                           write: "9"
                        },

                        {
                           letter: "E",
                           write: "1"
                        },
                        {
                           letter: "F",
                           write: "1"
                        },
                        {
                           letter: "G",
                           write: "1"
                        },
                        {
                           letter: "H",
                           write: "1"
                        },
                        {
                           letter: "I",
                           write: "1"
                        },
                        {
                           letter: "J",
                           write: "1"
                        },
                        {
                           letter: "K",
                           write: "1"
                        },
                        {
                           letter: "L",
                           write: "9"
                        },
                        {
                           letter: "M",
                           write: "9"
                        },
                        {
                           letter: "N",
                           write: "7"
                        },
                        {
                           letter: "O",
                           write: "2"
                        },
                        {
                           letter: "P",
                           write: "13"
                        },
                        {
                           letter: "Q",
                           write: "14"
                        }
                     ]
                  },
                  {
                     row: 5,
                     height: 1.5,

                     write: [
                        {
                           letter: "A",
                           write: "437961"
                        },
                        {
                           letter: "B",
                           write: "437967"
                        },
                        {
                           letter: "C",
                           write: "437968"
                        },
                        {
                           letter: "D",
                           write: "570565"
                        },
                        {
                           letter: "E",
                           write: "437973"
                        },

                        {
                           letter: "F",
                           write: "437971"
                        },
                        {
                           letter: "G",
                           write: "437958"
                        },
                        {
                           letter: "H",
                           write: "437974"
                        },
                        {
                           letter: "I",
                           write: "437972"
                        },
                        {
                           letter: "J",
                           write: "437959"
                        },
                        {
                           letter: "K",
                           write: "437960"
                        },
                        {
                           letter: "L",
                           write: "570566"
                        },
                        {
                           letter: "M",
                           write: "437964"
                        },
                        {
                           letter: "N",
                           write: "437963"
                        },
                        {
                           letter: "O",
                           write: "437969"
                        },
                        {
                           letter: "P",
                           write: "437966"
                        },
                        {
                           letter: "Q",
                           write: "437970"
                        }
                     ]
                  },
                  {
                     row: 6,
                     color: "000000",
                     textColor: "ffffff",

                     finish: "Q",
                     write: [
                        {
                           letter: "A",
                           write: `Tabla Campos`,
                           spacing: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"]
                        }
                     ]
                  } // Colorea la fila 3 (después de las vacías) hasta la columna F con color azul claro
               ]}
               excelLayoutDownRowsStart ={6}
               //  conditionExistEditButton={["Status !='Terminada'"]}
               // speakRow
               // conditionExistDeleteButton={["Status !='Terminada'"]}
               // options={true}
            />
         </Box>
      </Card>
   );
};
export default Trasparencia;
