import "./Error.scss";
import svg from "../../assets/404.svg";
import { Box, Button } from "@mui/material";

export const Error = ({}) => {
   return (
      <>
         <div className="cont-404">
            <img src={svg} alt="svg" />
            {/* <Button variant="text" color="default">
              
            </Button> */}
         </div>
      </>
   );
};
