import { useEffect, useState } from "react";
import DataTable from "../Reusables/table/DataTable";
import { Box, Card } from "@mui/material";
import { Request } from "../Reusables/request/Request";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Axios, GetAxios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";
import { PagePdf, PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";
import { Ngif } from "../Reusables/conditionals/Ngif";
import { DatosGenerales } from "./hojas/DatosGenerales";
import { DomicilioDeclarante } from "./hojas/DomicilioDeclarante";

export const Checador = ({}) => {
   useEffect(() => {
      init();
   }, []);
   const { estadocivil,regimenes,paises,nacionalidades } = Request({ peticiones: ["estadocivil","regimenes","paises","nacionalidades"] });

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [datosGenerales, setDatosGenerales] = useState([]);
   const [domiciliioDeclarante, setDomiciliioDeclarante] = useState([]);

   const init = async () => {
      setLoading(true);
      setData(await GetAxios(`apartados/all`));
      setLoading(false);
   };
   const handelPdf = async (row) => {
      setOpen(true);
      setDatosGenerales(await GetAxios(`datosgenerales/index/${row.Folio}`));
      setDomiciliioDeclarante(await GetAxios(`domiciliodeclarante/index/${row.Folio}`));
   };
   useEffect(() => {
      console.log('====================================');
      console.log(domiciliioDeclarante);
      console.log('====================================');
   }, [datosGenerales, domiciliioDeclarante]);
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
                     moreButtons={[{ icon: VisibilityIcon, handleButton: handelPdf, color: "green", conditions: [] }]}
                     // captionButtons={[
                     //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                     // ]}
                     Trbacground={[
                        { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Status == 'Terminada'"], text: "Declaraciones completas terminadas" },
                        { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Status == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
                        { color: "#F2F2CC", conditions: ["Status == 'En proceso'"], text: "Declaraciones sin finalizar" }
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
                        "Status",
                        "Fecha",
                        "Modalidad de la declaración"
                     ]}
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

            <Ngif condition={datosGenerales.length > 0 && domiciliioDeclarante.length > 0}>
               <PdfDeclaracion title={"DECLARACION"} open={open} setOpen={setOpen} formTitle={"OFICIO DE VALES"} watermark={"Declaracion"}>
                  <PagePdf title={"DATOS GENERALES"} data={datosGenerales}>
                     <DatosGenerales data={datosGenerales} estadocivil={estadocivil} regimenes={regimenes} paises={paises} nacionalidades={nacionalidades} />
                  </PagePdf>
                  <PagePdf title={"DOMICILIO DEL DECLARANTE"}>
                     <DomicilioDeclarante data={domiciliioDeclarante} />
                  </PagePdf>
               </PdfDeclaracion>
            </Ngif>
         </Box>
      </>
   );
};
