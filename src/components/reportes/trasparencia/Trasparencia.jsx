import { Box, Card, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { useEffect, useState } from "react";
import { GetAxios } from "../../../services/services";

const Trasparencia = ({}) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [ejercio, setEjercio] = useState(new Date().getFullYear());
   const [trimestre, setTrimestre] = useState("Enero - Marzo");
   const init = async (anio, trimestre) => {
      setData([])
      setLoading(true);
      setData(await GetAxios(`reportes/trasparencia${anio ? "/" + anio : ""}${trimestre ? "/" + trimestre : ""}`));
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
      useEffect(() => {
      }, [data, title]);

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
      <Card sx={{ maxWidth: "95%", margin: "auto" }}>
         <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
            <DataTable
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
                  "ESTE CRITERIO APLICA PARA EJERCICIOS ANTERIORES AL 01/07/2023 -> Tipo de integrante del sujeto obligado (catálogo)",
                  "ESTE CRITERIO APLICA A PARTIR DEL 01/07/2023 -> Tipo de integrante del sujeto obligado (catálogo)",
                  "Clave o nivel del puesto",
                  "Denominación del puesto (Redactados con perspectiva de género)",
                  "Denominación del cargo",
                  "Área de adscripción",
                  "Nombre(s) del(la) servidor(a) público(a)",
                  "Primer apellido del(la) servidor(a) público(a)",
                  "Segundo apellido del(la) servidor(a) público(a)",
                  "Modalidad de la Declaración Patrimonial (catálogo)",
                  "Hipervínculo a la versión pública Declaración de Situación Patrimonial",
                  "Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualizan la información",
                  "Nota"
               ]}
               link ={[13]}
               data={data}
               // por hacer  getUrl ={}
               // refreshRequest ={}
               //
               pagination={[2,5, 10, 50, 75, 100]}
               //  conditionExistEditButton={["Status !='Terminada'"]}
               speakRow
               // conditionExistDeleteButton={["Status !='Terminada'"]}
               // options={true}
            />
         </Box>
      </Card>
   );
};
export default Trasparencia;
