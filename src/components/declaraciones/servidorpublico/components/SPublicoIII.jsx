import { useEffect, useState } from "react";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { configValidationServidorPublico } from "../../../../redux/ServidorPublicoHoja9/ServidorPublicoHoja9";
import { labelPareja } from "../../funciones/ingresosEservidor/labels";
import { useParams } from "react-router-dom";
import { Text } from "../../../Reusables/input/Input";

export const SPublicoIII = ({}) => {
   const formik = useFormikContext();
   const dispatch = useDispatch();
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const [start, setStart] = useState(false);
   const handleGetValue = () => {
      setStart(!start);
   };
   const init = () => {
      const total =
         parseInt(formik.values.IngresoMensualAnualConclusionNeto) > 0
            ? parseInt(formik.values.IngresoMensualAnualConclusionNeto) + parseInt(formik.values.IngresoNetoParejaDependiente)
            : parseInt(formik.values.IngresoNetoParejaDependiente);
      formik.setFieldValue("TotalIngresosNetos", total);
      dispatch(configValidationServidorPublico({ tipo: "TotalesGeneral", total: total }));

   };
   useEffect(() => {
      init();
   }, [start]);

   return (
      <Text type={'number'}
         col={12}
         name={"IngresoNetoParejaDependiente"}
         color="green"
         label={labelPareja(declaracion)}
         placeholder={labelPareja(declaracion)}
         handleGetValue={handleGetValue}
      />
   );
};
