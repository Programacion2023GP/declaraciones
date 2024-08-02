import { Box, Card } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";

 const Incumplimiento = ({}) => {
    return (
        <>
             <Card sx={{ maxWidth: "95%", margin: "auto" }}>
               <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
                  <DataTable
                     options={["CHARTS", "EXCEL", "COLORS"]}
                     // , "PDF",
                    //  moreButtons={moreButtons}
                     // captionButtons={[
                     //    {text:"mas",handleButton:()=>{alert("dd")},icon:VisibilityIcon}
                     // ]}
                     Trbacground={[
                        { color: "#D6EDC9", conditions: ["Declaracion =='Completa' && Tstatus == 'Terminada'"], text: "Declaraciones completas terminadas" },
                        { color: "#EAF4E1", conditions: ["Declaracion =='Simplificada' && Tstatus == 'Terminada'"], text: "Declaraciones simplificadas terminadas" },
                        { color: "#F2F2CC", conditions: ["Tstatus == 'En proceso'"], text: "Declaraciones sin finalizar" }
                     ]}
                     buttonsMenu={false}
                    //  loading={loading}
                     filterGlobal={true}
                     filter={true}
                     headers={["#Empleado", "Curp","Nombre", "Apellido Paterno", "Apellido Materno", "Puesto", "Cargo", "Aerea de adscripción", "Fecha ingreso","Fecha termino declaración", "Estado"]}
                    //  data={data}
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
        </>
    );
};
export default Incumplimiento;