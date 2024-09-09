import { Alert, Box, Button, Card, CardContent, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Formik } from "formik";
import { Ngif } from "../conditionals/Ngif";
import { forwardRef, useEffect, useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { red } from "@mui/material/colors";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import "./FormikForm.scss";

export const FormikForm = forwardRef(
   (
      {
         className,
         initialValues,
         validationSchema,
         sizeTitle,
         submit,
         title,
         children,
         message,
         button,
         previousButton,
         handlePrevious,
         advertence,
         messageButton,
         maxWidth,
         maxHeight
      },
      ref
   ) => {
      const getErrorMessages = (errors, touched) => {
         const errorMessages = [];

         // Iterar sobre cada campo en los errores
         Object.keys(errors).forEach((field) => {
            // Verificar si el campo ha sido tocado por el usuario
            if (touched[field]) {
               errorMessages.push(errors[field]);
            }
         });

         return errorMessages;
      };
      useEffect(() => {}, []);
      return (
         <Card className={className} sx={{ maxWidth: maxWidth ? maxWidth : "90%", margin: "auto", padding: ".8rem" }}>
            <CardContent>
               <Typography variant={sizeTitle ? sizeTitle : "h5"} align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="subtitle2" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {message}
               </Typography>
               <Ngif condition={advertence}>
                  <Alert variant="filled" severity="info">
                     Notas
                     <br />
                     {advertence}
                  </Alert>
               </Ngif>
               <br />
               <Grid container spacing={1} style={{ margin: "auto", maxHeight: maxHeight ? maxHeight : "400px", overflow: "auto", padding: "0rem 2rem" }}>
                  <Formik innerRef={ref} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
                     {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues, submitForm }) => {
                        {
                        }
                        return (
                           <>
                              <Grid container component={"form"} onSubmit={handleSubmit}>
                                 <Grid xs={12}>
                                    <Voice message={getErrorMessages(errors, touched)} title={title} info="Ayuda sobre el formulario" totip="Leer errores" />
                                 </Grid>

                                 {children}

                                 <Ngif condition={previousButton && handlePrevious}>
                                    <Button sx={{ marginTop: "1rem", marginRight: "1ren" }} type="button" onClick={handlePrevious} variant="text" color="inherit">
                                       Regresar a la pagina anterior
                                    </Button>
                                 </Ngif>
                                 <Ngif condition={button}>
                                    <Box position={"relative"} width={"100%"} mb={"1rem"} padding={" 1.2rem"}>
                                       <Button
                                          sx={{
                                             marginLeft: "1rem",
                                             position: "absolute",
                                             
                                             top: -34,
                                             bottom: 38,
                                             right: 0
                                          }}
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                       >
                                          {messageButton ? messageButton : "Registrar y Continuar"}
                                       </Button>
                                    </Box>
                                 </Ngif>
                              </Grid>
                           </>
                        );
                     }}
                  </Formik>
               </Grid>
            </CardContent>
         </Card>
      );
   }
);
export const Voice = ({ message, title = "", info = "", flex = true, velocity = 1.25, setSpeaking, totip = "", line, setLine }) => {
   const [texts, setTexts] = useState([]);
   const [voices, setVoices] = useState([]);
   const [selectedVoice, setSelectedVoice] = useState(null);
   const [volume, setVolume] = useState(1);
   const [isSpeaking, setIsSpeaking] = useState(false); // Estado para rastrear si se está hablando

   useEffect(() => {
      if (message && Object.keys(message).length > 0) {
         setTexts([]);
         setTexts((prevTexts) => [...prevTexts, ...Object.values(message)]);
      } else {
         setTexts([`No tienes errores continua llenando el  ${title}`]);
      }
   }, [message]);
   useEffect(() => {}, [isSpeaking]);
   const handleReadAllAloud = async () => {
      if (setSpeaking) {
         setSpeaking(0);
      }
      setIsSpeaking(true); // Activar la animación de habla

      const readText = async (index) => {
         return new Promise((resolve, reject) => {
            if (index >= texts.length) {
               if (setSpeaking) {
                  setSpeaking(null);
               }

               setIsSpeaking(false); // Cuando se completa la última lectura
               resolve();
               return;
            }

            const text = texts[index];
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.volume = volume;
            if (selectedVoice) {
               utterance.voice = selectedVoice;
               utterance.rate = velocity; // Establecer la velocidad de la voz
            }

            utterance.onstart = () => {
               // Establecer el estado de lectura actual
               if (setSpeaking && index % 2 === 1) {
                  setSpeaking((previndex) => previndex + 1);
               }

               // Monitorear si la síntesis de voz está activa
               const interval = setInterval(() => {
                  if (!window.speechSynthesis.speaking) {
                     clearInterval(interval);
                     resolve();
                  }
               }, 100); // Verificar cada 100ms si la síntesis de voz está hablando
            };
            utterance.onerror = (err) => {
               console.error("Error al hablar:", err);
               reject(err);
            };
            utterance.onend = () => {
               readText(index + 1).then(resolve); // Llamar recursivamente para la siguiente lectura
            };
            window.speechSynthesis.speak(utterance);
         });
      };

      await readText(0); // Comenzar la lectura desde el índice 0
   };

   // Función para cargar las voces disponibles
   const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Selecciona una voz por defecto
      if (availableVoices.length > 0) {
         setSelectedVoice(availableVoices[6]);
      }
   };

   // Cargar las voces cuando el componente se monte
   useEffect(() => {
      loadVoices();
      // Agregar un event listener para cargar las voces cuando estén disponibles
      window.speechSynthesis.onvoiceschanged = loadVoices;
   }, []);

   // En tu componente
   // Función para cambiar la voz seleccionada

   return (
      <Box display={flex ? "flex" : ""} alignItems="center" p={1} borderRadius={4}>
         {isSpeaking}
         <Tooltip title={totip} arrow placement="right">
            <IconButton
               className={isSpeaking ? "speaking" : ""}
               onClick={() => {
                  handleReadAllAloud();
                  if (setLine) {
                     setLine(line);
                  }
               }}
               aria-label="Leer errores"
               style={{
                  backgroundColor: red[500],
                  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)", // Ajusta el valor según el nivel de sombra deseado
                  transition: "background-color 0.3s, box-shadow 0.3s"
               }}
               onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = red[600]; // Cambia el color al pasar el cursor sobre el botón
                  e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.3)"; // Aumenta la sombra al pasar el cursor sobre el botón
               }}
               onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = red[500]; // Restaura el color cuando el cursor sale del botón
                  e.currentTarget.style.boxShadow = "0px 3px 10px rgba(0, 0, 0, 0.2)"; // Restaura la sombra cuando el cursor sale del botón
               }}
            >
               <VolumeUpIcon style={{ color: "white", fontSize: "2rem" }} />
            </IconButton>
         </Tooltip>
         <Box ml={2}>
            <Typography variant="subtitle2" color="textPrimary">
               {info}
            </Typography>
         </Box>
      </Box>
   );
};
