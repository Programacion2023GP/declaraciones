import CircularProgress from "@mui/material/CircularProgress";

const loaderStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999, // Asegura que esté encima de otros elementos
};

export const Loader = () => {
  return (
    <div style={loaderStyles}>
      <CircularProgress color="inherit" size={100} />
    </div>
  );
};
