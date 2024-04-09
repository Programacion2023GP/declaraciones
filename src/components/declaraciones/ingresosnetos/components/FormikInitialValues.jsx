import { Box, Divider, Typography } from "@mui/material";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import { IngresosII } from "./IngresosII";

export const FormikInitialValues = ({}) => {
   return (
      <>
         <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
            <Segmento text={" I Renumeracion anual"}>
               <Numeric
                  col={12}
                  name={"RemuneracionMensualAnualConclusionCargoPublico"}
                  label={"I. Remuneración anual neta del declarante por su cargo público"}
                  placeholder={`I. Remuneración anual neta del declarante por su cargo público (por concepto de sueldos,honorarios,compensaciones,bonos,aguinaldos y otras prestaciones) (cantidades netas después de impuestos).`}
               />
            </Segmento>
            <Segmento text={"Otros ingresos mensuales"}>
               <IngresosII />
            </Segmento>
            <Segmento text={"B. Ingresos anual neto de la pareja y o dependientes economicos"}>
               <Numeric
                  col={12}
                  name={""}
                  color="green"
                  label={"B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)."}
                  placeholder={`B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)`}
               />
            </Segmento>
         </Stack>
         <br />
         <hr />
         <Text disabled={true} name="total" label="II. Otros ingresos del declarante (Suma del II.1 al II.5)" />
         <Text disabled={true} name="total" label="C. Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes economicos (suma de los apartados A y B)." />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};

const Segmento = ({ children, text }) => {
   const color = blue[500];
   return (
      <>
         <Box sx={{ flex: 1 }}>
            <Typography textAlign="center" variant="inherit" sx={{ color: color, marginBottom: "8px" }}>
               {text}
            </Typography>
            <Divider orientation="horizontal" sx={{ height: 28, m: 0.5 }} variant="middle" flexItem />
            <br />
            {children}
         </Box>
         <Divider orientation="vertical" variant="middle" flexItem />
      </>
   );
};
