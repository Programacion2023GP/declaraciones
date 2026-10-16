import { useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { Avatar, Box, Button, Fab, IconButton, List, ListItemButton, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type Tutorial = {
  guide: Guide[];
};

export type Guide = {
  afterOpenTutorial?: () => void;
  afterActions?: () => void;
  question: string;
  referenceStart: string; // selector CSS
  response: string;
  action?: () => void;
  steps?: Omit<Guide,'question'>[];
};

const CustomTutorial = ({ guide }: Tutorial) => {
  const [open, setOpen] = useState(false);
  const [startGuide, setStartGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<DOMRect | null>(null);

  // localizar elemento a resaltar

  useEffect(() => {
  if (!startGuide) return; // ⚠️ salir si el tutorial terminó

  const stepToShow =
    currentSubStep !== null
      ? guide[currentStep].steps?.[currentSubStep]
      : guide[currentStep];

  if (!stepToShow) return;

  stepToShow.afterActions?.();

  const waitForElement = (selector: string, timeout = 3000): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (el) {
          clearInterval(interval);
          resolve(el);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        resolve(null);
      }, timeout);
    });
  };

  waitForElement(stepToShow.referenceStart).then((el) => {
    if (!startGuide) return; // ⚠️ comprobar de nuevo
    if (el) setHighlight(el.getBoundingClientRect());
  });
}, [startGuide, currentStep, currentSubStep, guide]);


  const nextStep = () => {
    const step = guide[currentStep];

    // Acción del paso actual
    if (currentSubStep !== null) {
      step.steps?.[currentSubStep]?.action?.();
    } else {
      step.action?.();
    }

    // Manejo de pasos internos
    if (step.steps && step.steps.length > 0) {
      if (currentSubStep === null) {
        setCurrentSubStep(0);
        return;
      }
      if (currentSubStep < step.steps.length - 1) {
        setCurrentSubStep((s) => s! + 1);
        return;
      } else {
        setCurrentSubStep(null);
      setStartGuide(false);
      setOpen(false);

      }
    }

    // Avanzar en el tutorial principal
    if (currentStep < guide.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // Finalizar
      setStartGuide(false);
      setOpen(false);
      setCurrentStep(0);
      setCurrentSubStep(null);
    }
  };

  const stepToShow =
    currentSubStep !== null
      ? guide[currentStep].steps?.[currentSubStep]
      : guide[currentStep];

    return (
    <>
      {!startGuide ? (
        <Box sx={{ position: "fixed", bottom: 24, right: 24 }}>
          {!open ? (
            <Fab
              color="primary"
              onClick={() => setOpen(true)}
              sx={{ boxShadow: 4 }}
            >
              <HelpOutlineIcon/>
            </Fab>
          ) : (
            <Paper
              elevation={6}
              sx={{ width: 300, p: 2, borderRadius: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" color="primary">
                  Empezar tutorial
                </Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <List>
                {guide.map((q, i) => (
                  <ListItemButton
                    key={i}
                    onClick={() => {
                      q.afterOpenTutorial?.();
                      setStartGuide(true);
                      setCurrentStep(i);
                      setCurrentSubStep(null);
                    }}
                  >
                    <Typography variant="body2">{q.question}</Typography>
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      ) : (
        createPortal(
          <>
            {/* Overlay oscuro */}
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.6)",
                zIndex: 1200,
              }}
            />

            {/* Resaltado */}
            {highlight && (
              <Box
                sx={{
                  position: "fixed",
                  border: "3px solid",
                  borderColor: "primary.main",
                  borderRadius: 2,
                  zIndex: 1201,
                  transition: "all 0.3s",
                  top: highlight.top - 6,
                  left: highlight.left - 6,
                  width: highlight.width + 12,
                  height: highlight.height + 12,
                }}
              />
            )}

            {/* Personaje + bocadillo */}
            {highlight && stepToShow && (
              <Box
                sx={{
                  position: "fixed",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 1300,
                  top: highlight.bottom + 20,
                  left: highlight.left,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {/* Avatar */}
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    sx={{ width: 56, height: 56, boxShadow: 3 }}
                  />

                  {/* Bocadillo */}
                  <Paper
                    elevation={4}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      width: 260,
                      position: "relative",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {stepToShow.response}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={nextStep}
                      >
                        {currentStep === guide.length - 1 &&
                        currentSubStep ===
                          (guide[currentStep].steps?.length ?? 1) - 1
                          ? "Finalizar"
                          : "Siguiente"}
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            )}
          </>,
          document.body
        )
      )}
    </>
  );
};

export default CustomTutorial;
