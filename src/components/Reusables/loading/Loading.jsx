import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Loading = ({}) => {
   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%" // Ajusta la altura del contenedor para que ocupe toda la altura de la pantalla
         }}
      >
         <svg width={25} height={25}>
            <defs>
               <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e01cd5" />
                  <stop offset="100%" stopColor="#1CB5E0" />
               </linearGradient>
            </defs>
         </svg>
         <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
      </Box>
   );
};
export default Loading;
