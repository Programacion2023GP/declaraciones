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
import { Box, Grid } from "@mui/material";
import { TipoVehiculo } from "./tipodevehiculo/TipoVehiculo";
import { BienesMuebles } from "./bienesmuebles/BienesMuebles";
import { InversionesCuentasValores } from "./inversionescuentasvalores/InversionesCuentasValores";
import { AdeudosPasivos } from "./adeudospasivos/AdeudosPasivos";
import { PrestamosComodatos } from "./prestamos/PrestamosComodatos";
import { useDispatch } from "react-redux";
import { locationAuth } from "../../user/auth/auth";
import { foundLocalization } from "../../redux/DatosGeneralesHoja1/DatosGenerales";
import { GetAxios } from "../../services/services";
import { isNumber } from "highcharts";
import { Ngif } from "../Reusables/conditionals/Ngif";
import Loading from "../Reusables/loading/Loading";
import { Info } from "../../toasts/toast";
import { ParticipacionEmpresas } from "../interes/components/participacionempresas/ParticipacionEmpresas";
import { ParticipacionTomaDecisiones } from "../interes/components/participaciontomadecisiones/ParticipacionTomaDecisiones";
import { ApoyosBeneficiarios } from "../interes/components/apoyosbeneficiarios/ApoyosBeneficiarios";
import { Representacion } from "../interes/components/representacion/Representacion";
import { Clientes } from "../interes/components/clientes/Clientes";
import { BeneficiosPrivados } from "../interes/components/beneficiosprivados/BeneficiosPrivados";
import { Fideocomisos } from "../interes/components/fideocomisos/Fideocomisos";

// Importa aquí los componentes correspondientes a cada paso

const ComponentDeclaraciones = () => {
   const [dataPage, setDataPage] = React.useState([]);
   let { declaracion, hoja } = useParams();
   declaracion = parseInt(declaracion);
   hoja = parseInt(hoja);

   const [send, setSend] = React.useState(false);
   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(isNumber(hoja) ? hoja>14? hoja-14:hoja :0); // cambia de hoja
   const [pageAfterSituacion, setPageAfterSituacion] = React.useState(isNumber(hoja) ? hoja>14? hoja-14:hoja :0); // funciona con hojas solo para arriba no disminuye para traer la data de la ultima situacion ->
   const dispatch = useDispatch();

   const handleExit = () => {
      dispatch(locationAuth());
      localStorage.removeItem("id_SituacionPatrimonial");
      window.location.hash = "/dashboard/misdeclaraciones";
   };
   const handleNext = () => {
      setSend(false);
      setDataPage([]);
      setPageAfterSituacion((prevActiveStep) => {
         const nextStepIndex = prevActiveStep + 1;
         return filteredSteps[nextStepIndex] ? nextStepIndex : prevActiveStep;
      });
      setActiveStep((prevActiveStep) => {
         const nextStepIndex = prevActiveStep + 1;
         return filteredSteps[nextStepIndex] ? nextStepIndex : prevActiveStep;
      });
   };
   // const comparationData = (step) => {};
   // Método para manejar el paso anterior
   const handleBack = async () => {
      setDataPage([]);

      setActiveStep((prevActiveStep) => {
         const previousStepIndex = prevActiveStep - 1;
         // Retroceder solo al paso anterior visible
         return filteredSteps[previousStepIndex] ? previousStepIndex : prevActiveStep;
      });
      setPageAfterSituacion((prevActiveStep) => {
         const previousStepIndex = prevActiveStep - 1;
         // Retroceder solo al paso anterior visible
         return filteredSteps[previousStepIndex] ? previousStepIndex : prevActiveStep;
      });
   };
   const steps = [
      {
         label: `Datos generales`,
         component: <DatosGenerales data={dataPage} next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "datosgenerales"
      },
      {
         label: `Domicilio Declarante`,
         component: <DomicilioDeclarante next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "domiciliodeclarante"
      },
      {
         label: `Datos Curriculares del Declarante`,
         component: <DatosCurriculares next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "datoscurriculares"
      },
      {
         label: `Datos del empleo, cargo o comisión que inicia`,
         component: <DatosEmpleo next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "datoscargoscomision"
      },
      {
         label: `Experiencia laboral (últimos cinco empleos)`,
         component: <ExperienciaLaboral next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "experiencialaboral"
      },
      {
         label: "Datos de la pareja",
         component: <DatosParejas next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3],
         url: "datospareja"
      },
      {
         label: "Datos del dependiente económicos",
         component: <DependientesEconomicos next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3],
         url: "dependienteseconomicos"
      },
      {
         label: "Ingresos netos",
         subtitule: "Del declarante, pareja y/o dependientes economicos",
         component: <IngresosNetos next={declaracion > 0 && declaracion <= 3 ? handleNext : handleExit} previous={handleBack} title={Titles(declaracion)} />,
         exist: [1, 2, 3, 4, 5, 6],
         url: "ingresos"
      },
      {
         label: "Servidor Publico",
         component: <ServidorPublico next={handleNext} previous={handleBack} title={Titles(declaracion)} />,
         exist: [2],
         url: "servidorpublico"
      },
      {
         label: "Bienes Inmuebles (Situación Actual)",
         component: <BienesInmuebles next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "bienesinmuebles"
      },
      {
         label: "Vehículos (Situación actual)",
         component: <TipoVehiculo next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "vehiculos"
      },
      {
         label: "Bienes Muebles",
         component: <BienesMuebles next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "bienesmuebles"
      },
      {
         label: "Inversiones",
         subtitule: "Cuentas y otro tipo de valores / activos (Situación Actual)",
         component: <InversionesCuentasValores next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "inversionescuentas"
      },
      {
         label: "Adeudos / Pasivos (Situación Actual)",
         component: <AdeudosPasivos next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "adeudospasivos"
      },
      {
         label: "Préstamo o Comodato por Terceros (Situación actual)",
         component: <PrestamosComodatos next={declaracion != 2 ? handleNext : handleExit} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [1, 2, 3],
         url: "prestamoscomodatos"
      }
      // {
      //    label: "Participación en empresas, sociedades o asociaciones (Hasta los 2 últimos años)",
      //    component: (
      //       <ParticipacionEmpresas
      //          next={handleNext}
      //          previous={handleBack}
      //          title={`Participación en empresas, sociedades o asociaciones (Hasta los 2 últimos años)`}
      //          setSend={setSend}
      //       />
      //    ),
      //    exist: [2],
      //    url: "participacionempresas"
      // },
      // {
      //    label: "Participa en la toma de decisiones de alguna de estas instituciones? (Hasta los 2 últimos años)",
      //    component: <ParticipacionTomaDecisiones next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "tomadecisiones"
      // },
      // {
      //    label: "Apoyos o Beneficios Públicos (Hasta los 2 últimos años)",
      //    component: <ApoyosBeneficiarios next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "apoyos"
      // },
      // {
      //    label: "Representación (Hasta los 2 últimos años)",
      //    component: <Representacion next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "representaciones"
      // },
      // {
      //    label: "Clientes principales (Hasta los 2 últimos años)",
      //    component: <Clientes next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "clientesprincipales"
      // },
      // {
      //    label: "Beneficios Privados (Hasta los 2 últimos años)",
      //    component: <BeneficiosPrivados next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "beneficiosprivados"
      // },
      // {
      //    label: "Fideicomisos (Hasta los 2 últimos años)",
      //    component: <Fideocomisos next={handleExit} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
      //    exist: [2],
      //    url: "fideocomisos"
      // }
      // {
      //    label: "Bienes Inmuebles (Situación Actual)",
      //    component: <></>
      // }
   ];
   const declaracionIntereses = [
      {
         label: "Participación en empresas, sociedades o asociaciones (Hasta los 2 últimos años)",
         component: (
            <ParticipacionEmpresas
               next={handleNext}
               previous={handleBack}
               title={`Participación en empresas, sociedades o asociaciones (Hasta los 2 últimos años)`}
               setSend={setSend}
            />
         ),
         exist: [2],
         url: "participacionempresas"
      },
      {
         label: "Participa en la toma de decisiones de alguna de estas instituciones? (Hasta los 2 últimos años)",
         component: <ParticipacionTomaDecisiones next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "tomadecisiones"
      },
      {
         label: "Apoyos o Beneficios Públicos (Hasta los 2 últimos años)",
         component: <ApoyosBeneficiarios next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "apoyos"
      },
      {
         label: "Representación (Hasta los 2 últimos años)",
         component: <Representacion next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "representaciones"
      },
      {
         label: "Clientes principales (Hasta los 2 últimos años)",
         component: <Clientes next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "clientesprincipales"
      },
      {
         label: "Beneficios Privados (Hasta los 2 últimos años)",
         component: <BeneficiosPrivados next={handleNext} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "beneficiosprivados"
      },
      {
         label: "Fideicomisos (Hasta los 2 últimos años)",
         component: <Fideocomisos next={handleExit} previous={handleBack} title={Titles(declaracion)} setSend={setSend} />,
         exist: [2],
         url: "fideocomisos"
      }
   ];
   const [view, setView] = React.useState(false);
   const [filteredSteps, setFiltersStepers] = React.useState(() => {
      const filtered = steps.filter((step) => step.exist.includes(declaracion));
      return hoja > 14 && declaracion==2 ? declaracionIntereses : filtered;
   });

   const [update, setupdate] = React.useState(false);
   // Método para manejar el siguiente paso
   const [hojaFilter, setHojaFilter] = React.useState(null);
   React.useEffect(() => {
      dataAfterSituacionPatrimonial();
      // init();
      searchHoja();
      // setFiltersStepers(steps.filter((step) => step.exist.includes(declaracion)));
   }, [activeStep, declaracion]);
   React.useEffect(() => {
      // console.log('dd')
      // console.log("view", view);
   }, [update, view]);
   React.useEffect(() => {}, [dataPage]);
   // React.useEffect(() => {
   //    setLoading(true);
   // }, [loading, dataPage]);

   //?INFO AQUI COMPROBAMOS QUE EXISTA NUESTRA DECLARACION DE INTERES O PATRIMONIAL PARA POR UPDATE EN TRUE DE AQUI PROCEDEMOS A IR A INIT//
   const searchHoja = async () => {
      try {
         setView(false);

         setupdate(false);
         const response = await GetAxios(
            `apartados/hoja/${activeStep < 15 ? parseInt(localStorage.getItem("id_SituacionPatrimonial")) : parseInt(localStorage.getItem("id_Intereses"))}`
         );
         let foundHoja = parseInt(response[0].Hoja);
         if (activeStep > 14) {
            foundHoja = foundHoja + 14;
         }
         if (isNumber(foundHoja) && foundHoja >= activeStep + 1) {
            setHojaFilter(foundHoja - 1);
            setupdate(true);
         } else {
            setupdate(false);
         }
      } catch (error) {
         setupdate(false);
      } finally {
         await init();
      }
   };
   const dataAfterSituacionPatrimonial = async (situacionPatrimonial) => {};
   /* 
   ?CONTAMOS CON 3 VERIFICACIONES DE FALLAR DAN FALSA LA ACTUALIZACION

   */
   const init = async (page = null) => {
      try {
         // Obtener la situación patrimonial
         const propierty = activeStep < 15 ? "id_SituacionPatrimonial" : "id_Intereses";
         const propiertyDb =   activeStep < 15 ? "Id_SituacionPatrimonial" : "id_Intereses";
         const userId = parseInt(localStorage.getItem("Id_User"));
         let step = activeStep + 1 + (declaracion !== 2 && activeStep >= 8 ? 1 : 0);

         // Obtener y ajustar el valor de la propiedad
         let propertyValue = parseInt(localStorage.getItem(propierty));
         console.log(propertyValue);
         // Restar 14 si propierty es 'Id_Intereses'
         if (propierty === "id_Intereses") {
            step -= 15;
         }

         // Construir la URL
         const peticion = `situacionpatrimonial/index/${userId}/${step}/${!isNaN(propertyValue) ? propertyValue : 0}`;

         const situacionPatrimonial = await GetAxios(peticion);
         console.log('ulti',situacionPatrimonial,propierty);
         const url = filteredSteps[page == null ? activeStep : page].url;
         // console.log("url: " + filteredSteps[page == null ? activeStep : page].label)
         const datasArrays = [
            "experiencialaboral",
            "dependienteseconomicos",
            "bienesinmuebles",
            "vehiculos",
            "bienesmuebles",
            "inversionescuentas",
            "adeudospasivos",
            "prestamoscomodatos",
            "participacionempresas",
            "tomadecisiones",
            "apoyos",
            "representaciones",
            "clientesprincipales",
            "beneficiosprivados",
            "fideocomisos"
         ];
         //? SI ESTAMOS EN LA PAGINA ACTUAL APAGA EL ACTUALIZAR Y CARGA LA INFO DE TU ANTERIOR DECLARACION
         // Verificar si la página después de la situación es el paso activo
         if (pageAfterSituacion === activeStep) {
            console.log ("aquiiii",parseInt(situacionPatrimonial[propiertyDb]))
            if (parseInt(situacionPatrimonial[propiertyDb]) > 0) {
               console.log("2");

               const response = await GetAxios(
                  `${url}/index/${activeStep < 15 ? parseInt(situacionPatrimonial[propiertyDb]) : parseInt(localStorage.getItem("id_Intereses"))}`
               );
         
               setupdate(false);

               if (response.length > 0) {
                  console.log(response);
                  Info("Cargando informacion de tu anterior declaración");
                  setDataPage(datasArrays.includes(url) ? response : response[0]);
               } else {
                  setupdate(false);
                  console.log("Cargando");
               }
            }
         }
         // Verificar si la situación patrimonial no es válida
         if (parseInt(situacionPatrimonial[propierty]) == 0 || isNaN(parseInt(situacionPatrimonial[propierty]))) {
            const exist = await GetAxios(
               `apartados/exist/${!isNaN(parseInt(localStorage.getItem(propierty))) ? parseInt(localStorage.getItem(propierty)) : 0}/${activeStep + 1 - (activeStep > 14 ? 15 : 0)}`
            );

            if (exist) {
               const response = await GetAxios(
                  `${url}/index/${activeStep > 14 ? parseInt(localStorage.getItem("id_Intereses")) : parseInt(localStorage.getItem("id_SituacionPatrimonial"))}`
               );
               console.log(
                  `${url}/index/${activeStep > 14 ? parseInt(localStorage.getItem("id_Intereses")) : parseInt(localStorage.getItem("id_SituacionPatrimonial"))}`
               );
               setDataPage(datasArrays.includes(url) ? response : response[0]);
               if (response.length == 0) {
                  setupdate(false);
               }
            } else {
               setupdate(false);
            }
         }
      } catch (error) {
         console.error("Error en la inicialización:", error);
         // Manejar errores si es necesario
      } finally {
         setView(true);
      }
   };

   // Define aquí la lista de pasos con sus títulos y componentes correspondientes

   // Función para obtener el título del paso actual
   const getStepTitle = () => {

      return filteredSteps[activeStep]?.label;
   };
   const getStepSubtitule = () => {
      return filteredSteps[activeStep]?.subtitule;
   };
   React.useEffect(() => {
      dispatch(foundLocalization());
      if (activeStep == 9) {
         verifiedServidorPublico();
      }
   }, [activeStep]);
   const verifiedServidorPublico = async () => {
      const response = await GetAxios(`servidorpublico/index/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}`);
      console.log("acaaaa",response);
      if (response.length > 0) {
         Info("Se agrego la declaracion de intereses");
         setFiltersStepers((prev) => prev.concat(...declaracionIntereses));
      }
   };
   return (
      <Ngif condition={true}>
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
                     marginBottom: "20px",
                     minHeight: "20rem"
                  }}
               >
                  {/* Título del paso con estilos mejorados */}
                  <Typography
                     // className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
                     variant="h4"
                     align="center"
                     gutterBottom
                     style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}
                  >
                     {getStepTitle()}
                  </Typography>
                  <br />
                  <Typography
                     // className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
                     variant="h5"
                     align="center"
                     gutterBottom
                     style={{ fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }}
                  >
                     {getStepSubtitule()}
                  </Typography>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                     {filteredSteps.map((step, index) => {
                        return (
                           step.exist.includes(declaracion) && (
                              <div
                                 key={index}
                                 // className={send ? "animate__animated animate__backOutRight" : "animate__animated animate__backInLeft"}
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
                  <Ngif condition={view}>
                     <Grid>{React.cloneElement(filteredSteps[activeStep].component, { data: dataPage, loading: update })}</Grid>
                  </Ngif>
                  <Ngif condition={!view}>
                     <Loading />
                  </Ngif>
               </div>
            </>
         </div>
      </Ngif>
   );
};
export default ComponentDeclaraciones;
