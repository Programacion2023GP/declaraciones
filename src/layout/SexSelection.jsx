import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import GirlIcon from "@mui/icons-material/Girl";
import ManIcon from "@mui/icons-material/Man";
import { PostAxios } from "../services/services";
import Loading from "../components/Reusables/loading/Loading";

// Estilo para el contenedor de cada opción
const OptionContainer = styled(Box)(({ theme, selected, color }) => ({
   width: 150, // Tamaño aumentado
   height: 150, // Tamaño aumentado
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   cursor: "pointer",
   borderRadius: "50%",
   transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
   backgroundColor: selected ? color : "transparent", // Color cuando seleccionado
   transform: selected ? "scale(1.25)" : "scale(1)", // Escala cuando seleccionado
   boxShadow: selected ? `0 12px 24px ${color}` : "0 6px 12px rgba(0,0,0,0.2)", // Sombra cuando seleccionado
   "&:hover": {
      backgroundColor: selected ? color : `${color}80`, // Color de hover (80% opacidad)
      boxShadow: `0 12px 24px ${color}`, // Sombra en hover
      transform: "scale(1.2)" // Escala en hover
   },
   svg: {
      fontSize: 75, // Tamaño del ícono aumentado
      color: selected ? "#fff" : "#000", // Color del ícono cuando seleccionado
      transition: "color 0.3s ease"
   }
}));

// Estilo para el título
const Title = styled(Typography)(({ theme }) => ({
   fontSize: "2.5rem", // Tamaño de la fuente aumentado
   fontWeight: "bold", // Negrita
   color: theme.palette.primary.main, // Color principal del tema
   marginBottom: "20px", // Espaciado inferior aumentado
   textAlign: "center" // Centrado
}));

// Estilo para el botón
const SubmitButton = styled(Button)(({ theme }) => ({
   marginTop: "25px", // Espaciado superior aumentado
   padding: "12px 24px", // Padding aumentado
   fontSize: "1.2rem", // Tamaño de la fuente aumentado
   fontWeight: "bold",
   borderRadius: "8px",
   backgroundColor: theme.palette.primary.main,
   color: "#fff",
   "&:hover": {
      backgroundColor: theme.palette.primary.dark
   }
}));

const SexSelection = ({setReload}) => {
   const [selectedOption, setSelectedOption] = useState(null);
   const [loading, setLoading] = useState(false);
   const handleSubmit = async () => {
      setLoading(true);
      try {
         const response = await PostAxios("usuarios/gender", { Id_Person: parseInt(localStorage.getItem("Id_Person")), Gender: selectedOption });
         console.log(response);
         if (response.data.status_code === 200) {
            localStorage.setItem("Sexo", selectedOption);
            setReload(true);
         }
         // id < 1 && localStorage.setItem("id_SituacionPatrimonial", response.data.result);
         // Success(response.data.message);
         // next();
         // setSend(true);

         return response.data;
      } catch (error) {
         if (error.response?.data?.data?.message) {
            Error(error.response.data.message);
         } else {
            Error("Ocurrio un error");
         }
      }
      setLoading(false);

      // Lógica para manejar el envío
   };

   return (
      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
         <Title variant="h4">Selecciona tu sexo</Title>
         {loading && <Loading />}
         {!loading && (
            <Box display="flex" justifyContent="center" gap={5}>
               {" "}
               {/* Aumentar el espaciado entre opciones */}
               <OptionContainer
                  selected={selectedOption === "Femenino"}
                  onClick={() => setSelectedOption("Femenino")}
                  color="#FF69B4" // Rosa
               >
                  <GirlIcon />
               </OptionContainer>
               <OptionContainer
                  selected={selectedOption === "Masculino"}
                  onClick={() => setSelectedOption("Masculino")}
                  color="#4682B4" // Azul
               >
                  <ManIcon />
               </OptionContainer>
            </Box>
         )}
         <SubmitButton
            variant="contained"
            onClick={handleSubmit}
            disabled={!selectedOption} // Deshabilitar el botón si no hay opción seleccionada
         >
            Enviar
         </SubmitButton>
      </Box>
   );
};

export default SexSelection;
