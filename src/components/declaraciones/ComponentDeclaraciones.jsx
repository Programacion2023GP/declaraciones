import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { DatosGenerales } from "./datosgenerales/DatosGenerales";
import { DomicilioDeclarante } from "./domiciliodeclarante/DomicilioDeclarante";
import { DatosCurriculares } from "./datoscurriculares/DatosCurriculares";
import { DatosEmpleo } from "./datosempleo/DatosEmpleo";
import { ExperienciaLaboral } from "./experiencialaboral/ExperienciaLaboral";
import { Titles } from "./funciones/titles";
import { useParams } from "react-router-dom";
import { DebugerContext } from "../../context/DebuggerContext";
import { DatosParejas } from "./datospareja/DatosPareja";
import { DependientesEconomicos } from "./dependienteseconomicos/DependientesEconomicos";
import { IngresosNetos } from "./ingresosnetos/IngresosNetos";

// Importa aquí los componentes correspondientes a cada paso

const ComponentDeclaraciones = () => {
   const { clearDebug } = React.useContext(DebugerContext);

   const { declaracion } = useParams();

   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(7);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   // Define aquí la lista de pasos con sus títulos y componentes correspondientes
   const steps = [
      { label: `Datos generales`, component: <DatosGenerales next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Domicilio Declarante`, component: <DomicilioDeclarante next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Datos Curriculares del Declarante`, component: <DatosCurriculares next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Datos del empleo, cargo o comisión que inicia`, component: <DatosEmpleo next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      {
         label: `Experiencia laboral (últimos cinco empleos)`,
         component: <ExperienciaLaboral next={handleNext} previous={handleBack} title={Titles(declaracion)} debugerClear={clearDebug} />
      },
      {
         label: "Datos de la pareja",
         component: <DatosParejas next={handleNext} previous={handleBack} title={Titles(declaracion)} debugerClear={clearDebug} />
      },
      {
         label: "Datos del dependiente económicos",
         component: <DependientesEconomicos next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      },
      {
         label: "Ingresos netos",
         subtitule: "Del declarante, pareja y/o dependientes economicos",
         component: <IngresosNetos next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      }
   ];

   // Función para obtener el título del paso actual
   const getStepTitle = () => {
      return steps[activeStep].label;
   };
   const getStepSubtitule = () => {
      return steps[activeStep].subtitule;
   };
   return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
         <React.Fragment>
            {/* Contenido del MobileStepper */}
            <div style={{ border: "2px solid #007bff", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
               {/* Título del paso con estilos mejorados */}
               <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}>
                  {getStepTitle()}
               </Typography>
               <br />
               <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}>
                  {getStepSubtitule()}
               </Typography>

               {/* MobileStepper para navegar entre los pasos */}
               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  {steps.map((step, index) => (
                     <div
                        key={index}
                        style={{
                           width: "10px",
                           height: "10px",
                           borderRadius: "50%",
                           backgroundColor: index === activeStep ? "#007bff" : "#ccc",
                           margin: "0 5px",
                           cursor: "pointer"
                        }}
                     />
                  ))}
               </div>
               <Typography variant="subtitle1" align="center" gutterBottom style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}>
                  Paso {activeStep + 1} de {steps.length}
               </Typography>
               {/* Componente correspondiente al paso actual */}
               {steps[activeStep].component}
            </div>
         </React.Fragment>
      </div>
   );
};
export default ComponentDeclaraciones;

