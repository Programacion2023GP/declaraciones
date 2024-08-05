import { Box, Button, Card, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { useEffect, useState } from "react";
import { GetAxios } from "../../../services/services";
// import { MenuItem } from "react-pro-sidebar";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Ngif } from "../../Reusables/conditionals/Ngif";

const Incumplimiento = ({}) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [fecha, setFecha] = useState("");
   const [plazo, setPlazo] = useState("Inicial");
   const handleChange = (newValue) => {
      setValue(newValue);
   };
   dayjs.locale("es");

   const init = async (plazo, fecha) => {
      setData([]);
      setLoading(true);
      setData(await GetAxios(`reportes/incumplimientos${plazo ? "/" + plazo : ""}${fecha ? "/" + fecha : ""}`));
      setLoading(false);
   };
   useEffect(() => {
      init(1);
   }, []);
   const searchFilters = () => {
      switch (plazo) {
         case "Inicial":
            init(1, fecha);
            break;
         case "Modificación":
            init(2, fecha);
            break;
         case "Conclusión":
            init(3, fecha);
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
      <>
         <Card sx={{ maxWidth: "95%", margin: "auto" }}>
            <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
               <DataTable
                  options={["CHARTS", "EXCEL"]}
                  // , "PDF",
                  //  moreButtons={moreButtons}
                  // captionButtons={[
                  //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                  // ]}
                  captionFilters={
                     <>
                        <Filters data={["Inicial", "Modificación", "Conclusión"]} title="plazo" setFilter={setPlazo} filter={plazo} />
                        <Ngif condition={plazo != "Inicial"}>
                           <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                              <DatePicker
                                 label={"Selecciona una fecha"}
                                 format={"DD/MM/YYYY"}
                                 // fullWidth
                                 value={dayjs(fecha) || null}
                                 onChange={(date) => setFecha(dayjs(date).format("YYYY-MM-DD"))}
                                 // error={!!errors[name] && touched[name]}
                              />
                           </FormControl>
                        </Ngif>
                        <Button size="small" variant="outlined" color="primary" onClick={searchFilters}>
                           buscar
                        </Button>
                     </>
                  }
                  buttonsMenu={false}
                  //  loading={loading}
                  filterGlobal={true}
                  filter={true}
                  data={data}
                  loading={loading}
                  headers={[
                     "#Empleado",
                     "Curp",
                     "Nombre",
                     "Apellido Paterno",
                     "Apellido Materno",
                     "Puesto",
                     "Cargo",
                     "Aerea de adscripción",
                     "Fecha ingreso",
                     "Fecha inicio declaración",
                     "Fecha termino declaración",
                     "Estado",
                     "Declaración",
                     "Dias Transcurridos"
                  ]}
                  dataHidden={["Incumplimiento", "DenominacionPuesto"]}
                  //  data={data}
                  // por hacer  getUrl ={}
                  // refreshRequest ={}
                  //
                  pagination={[2, 5, 10, 50, 75, 100]}
                  //  conditionExistEditButton={["Status !='Terminada'"]}
                  speakRow
                  // conditionExistDeleteButton={["Status !='Terminada'"]}
                  // options={true}
               />
            </Box>
         </Card>
      </>
   );
};
export default Incumplimiento;
