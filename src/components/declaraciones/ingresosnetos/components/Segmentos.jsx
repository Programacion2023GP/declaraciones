import { red } from "@mui/material/colors";
import { Children, cloneElement, isValidElement, memo, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReactDOMServer from "react-dom/server";
import { useFormikContext } from "formik";
import { element } from "prop-types";

export const Segmento = ({ children, text, setError = false }) => {
   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   useEffect(() => {
    //   searchErrors();
   });
   const error = red[500];
   return (
      <>
         <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}>
                  <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                     {Children.map(children, (child, index) => {
                        return <Tab sx={{ color: setError && error }} label={child.props.label} value={index} />;
                     })}
                  </TabList>
               </Box>
               {Children.map(children, (child, index) => {
                  return <TabPanel value={index}>{child}</TabPanel>;
               })}
            </TabContext>
         </Box>
      </>
   );
};
export const tabSegmento = ({ label, children }) => {
   return { children };
};
const searchErrors = () => {
   const names = [{ 0: ["RemuneracionMensualAnualConclusionCargoPublico"] }, { 1: [] }, { 2: [] }, { 3: [] }];
   const formik = useFormikContext();

   names.forEach((item) => {
      Object.keys(formik.errors).forEach((element) => {
         console.log("holas", item, element);
         // if (item.includes(element)) {
         // }
      });
      // if (item.includes()) {

      // }
   });
};
