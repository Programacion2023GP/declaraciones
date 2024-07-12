import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Backdrop from "@mui/material/Backdrop";
import "./loading.css";
const Loading = ({}) => {
   return (
      <Box
         sx={{
            position: "relative", // Cambia a posición relativa para que los elementos absolutos se posicionen correctamente

            display: "flex",
            alignItems: "center",
            justifyContent: "center"
         }}
      >
         {/* <div className="svg-container" style={{ position: "absolute",  top: "calc(50% + 30px)", left: "50%", transform: "translate(-50%, -50%)" }}>
            <svg width="600" height="100" viewBox="0 0 600 100">
               <text x="50%" y="50%" textAnchor="middle" fontSize="48" className="text-loading">
                  Gomez Palacio ...
               </text>
            </svg>
         </div> */}
         <div style={{ position: "absolute", top: "calc(50% + 10px)", left: "50%", transform: "translateX(-50%)" }}>
            <CircularProgress sx={{ color: "url(#my_gradient)" }} />
         </div>
         <svg width={0} height={0}>
            <defs>
               <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e01cd5" />
                  <stop offset="100%" stopColor="#1CB5E0" />
               </linearGradient>
            </defs>
         </svg>
      </Box>
   );
};

export default Loading;
