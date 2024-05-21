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
import { DatosParejas } from "./datospareja/DatosPareja";
import { DependientesEconomicos } from "./dependienteseconomicos/DependientesEconomicos";
import { IngresosNetos } from "./ingresosnetos/IngresosNetos";
import { ServidorPublico } from "./servidorpublico/ServidorPublico";
// import { Pruebas } from "./pruebas/Pruebas";
import { BienesInmuebles } from "./bienesinmuebles/BienesInmuebles";
import { Box } from "@mui/material";
import { TipoVehiculo } from "./tipodevehiculo/TipoVehiculo";
import { BienesMuebles } from "./bienesmuebles/BienesMuebles";
import { InversionesCuentasValores } from "./inversionescuentasvalores/InversionesCuentasValores";
import { AdeudosPasivos } from "./adeudospasivos/AdeudosPasivos";
import { PrestamosComodatos } from "./prestamos/PrestamosComodatos";
import { useDispatch } from "react-redux";
import { locationAuth } from "../../user/auth/auth";
import { foundLocalization } from "../../redux/DatosGeneralesHoja1/DatosGenerales";

// Importa aquí los componentes correspondientes a cada paso

const ComponentDeclaraciones = () => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const [send, setSend] = React.useState(false);
   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(0);
   const dispatch = useDispatch();
   React.useEffect(() => {
      dispatch(foundLocalization())
   }, [activeStep]);
   const handleExit = () => {
      dispatch(locationAuth());
      localStorage.removeItem("id_SituacionPatrimonial")
      window.location.hash = "/dashboard/misdeclaraciones";
   };
   const handleNext = () => {
      setTimeout(() => {
         setSend(false);
         setActiveStep((prevActiveStep) => {
            const nextStepIndex = prevActiveStep + 1;
            // Avanzar solo al siguiente paso visible
            return filteredSteps[nextStepIndex] ? nextStepIndex : prevActiveStep;
         });
      }, 500);
   };

   // Método para manejar el paso anterior
   const handleBack = () => {
      console.log(filteredSteps);

      setActiveStep((prevActiveStep) => {
         const previousStepIndex = prevActiveStep - 1;
         // Retroceder solo al paso anterior visible
         return filteredSteps[previousStepIndex] ? previousStepIndex : prevActiveStep;
      });
   };
   const steps = [
      {
         label: `Datos generales`,
         component: <DatosGenerales next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: `Domicilio Declarante`,
         component: <DomicilioDeclarante next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: `Datos Curriculares del Declarante`,
         component: <DatosCurriculares next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: `Datos del empleo, cargo o comisión que inicia`,
         component: <DatosEmpleo next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: `Experiencia laboral (últimos cinco empleos)`,
         component: <ExperienciaLaboral next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: "Datos de la pareja",
         component: <DatosParejas next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3]
      },
      {
         label: "Datos del dependiente económicos",
         component: <DependientesEconomicos next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3]
      },
      {
         label: "Ingresos netos",
         subtitule: "Del declarante, pareja y/o dependientes economicos",
         component: <IngresosNetos next={declaracion>0 && declaracion<=3?handleNext:handleExit} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6]
      },
      {
         label: "Servidor Publico",
         component: <ServidorPublico next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [2]
      },
      {
         label: "Bienes Inmuebles (Situación Actual)",
         component: <BienesInmuebles next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      },
      {
         label: "Vehículos (Situación actual)",
         component: <TipoVehiculo next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      },
      {
         label: "Bienes Muebles",
         component: <BienesMuebles next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      },
      {
         label: "Inversiones",
         subtitule: "Cuentas y otro tipo de valores / activos (Situación Actual)",
         component: <InversionesCuentasValores next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      },
      {
         label: "Adeudos / Pasivos (Situación Actual)",
         component: <AdeudosPasivos next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      },
      {
         label: "Préstamo o Comodato por Terceros (Situación actual)",
         component: <PrestamosComodatos next={handleExit} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3]
      }

      // {
      //    label: "Bienes Inmuebles (Situación Actual)",
      //    component: <></>
      // }
   ];
   const [filteredSteps, setFiltersStepers] = React.useState(steps.filter((step) => step.exist.includes(declaracion)));
   // Método para manejar el siguiente paso
   React.useEffect(() => {
      setFiltersStepers(steps.filter((step) => step.exist.includes(declaracion)));
   }, [declaracion]);


   // Define aquí la lista de pasos con sus títulos y componentes correspondientes


   // Función para obtener el título del paso actual
   const getStepTitle = () => {
      return filteredSteps[activeStep].label;
   };
   const getStepSubtitule = () => {
      return filteredSteps[activeStep].subtitule;
   };
   return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
         <>
            {/* Contenido del MobileStepper */}
            <div
               style={{
                  width: "90%",
                  overflowX: "hidden",
                  border: "2px solid #007bff",
                  borderRadius: "10px",
                  padding: "20px 0",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px"
               }}
            >
               {/* Título del paso con estilos mejorados */}
               <Typography
                  className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}
               >
                  {getStepTitle()}
               </Typography>
               <br />
               <Typography
                  className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
                  variant="h5"
                  align="center"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}
               >
                  {getStepSubtitule()}
               </Typography>

               {/* MobileStepper para navegar entre los pasos */}
               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  {steps.map((step, index) => {
                     return (
                        step.exist.includes(declaracion) && (
                           <div
                              key={index}
                              className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
                              style={{
                                 width: "10px",
                                 height: "10px",
                                 borderRadius: "50%",
                                 backgroundColor: index === activeStep ? "#007bff" : "#ccc",
                                 margin: "0 5px",
                                 cursor: "pointer"
                              }}
                           />
                        )
                     );
                  })}
               </div>
               <Typography variant="subtitle1" align="center" gutterBottom style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}>
                  {/* Paso {activeStep + 1} de {steps.length} */}
               </Typography>
               {/* Componente correspondiente al paso actual */}
               <Box className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}>{filteredSteps[activeStep].component}</Box>
             
         <button onClick={handleNext}>Continuar</button>   
            </div>
         </>
      </div>
);
};
export default ComponentDeclaraciones;
