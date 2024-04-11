import { useEffect, useState } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { useFormikContext } from "formik";
import { configValidationsDependientesEconomicos } from "../../../../redux/IngresosNetosHoja8/IngresosNetosHoja8";
import { useDispatch } from "react-redux";

export const IngresosIII = ({}) => {
   const formik = useFormikContext();
   const dispatch = useDispatch();

   const [start, setStart] = useState(false);
   const handleGetValue = () => {
      setStart(!start);
   };
   const init = () => {
      const total =
         parseInt(formik.values.IngresoMensualAnualConclusionNeto) > 0
            ? parseInt(formik.values.IngresoMensualAnualConclusionNeto) + parseInt(formik.values.IngresoNetoParejaDependiente)
            : parseInt(formik.values.IngresoNetoParejaDependiente);
      formik.setFieldValue("TotalIngresosNetos",total);
      dispatch(configValidationsDependientesEconomicos({ tipo: "TotalesGeneral", total: total }));
   };
   useEffect(() => {
      init();
   }, [start]);

   return (
      <Numeric
         col={12}
         name={"IngresoNetoParejaDependiente"}
         color="green"
         label={"B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)."}
         placeholder={`B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos)`}
         handleGetValue={handleGetValue}
      />
   );
};
