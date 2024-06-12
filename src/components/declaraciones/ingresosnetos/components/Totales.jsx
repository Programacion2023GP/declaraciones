import { useParams } from "react-router-dom";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { labelSumaIyII, labelTotal } from "../../funciones/ingresosEservidor/labels";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { configValidationsDependientesEconomicos } from "../../../../redux/IngresosNetosHoja8/IngresosNetosHoja8";

export const Totales = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const formik = useFormikContext();
   const dispatch = useDispatch();
   const total = () => {
      return (
         Number(formik.values.RemuneracionMensualAnualConclusionCargoPublico ?? 0) +
         Number(formik.values.AICE_RemuneracionTotal ?? 0) +
         Number(formik.values.AF_RemuneracionTotal ?? 0) +
         Number(formik.values.SP_RemuneracionTotal ?? 0) +
         Number(formik.values.EB_RemuneracionTotal ?? 0) +
         Number(formik.values.OINC_RemuneracionTotal ?? 0)
      );
   };

   const event = () => {
      const Tot = total();
      console.log("====================================");
      console.log(Tot);
      console.log("====================================");
      dispatch(configValidationsDependientesEconomicos({ tipo: "Totales", total: parseInt(Tot) }));
      formik.setFieldValue("IngresoMensualAnualConclusionNeto", Tot);
      dispatch(
         configValidationsDependientesEconomicos({
            tipo: "TotalesGeneral",
            total: parseInt(Tot) + !isNaN(parseInt(formik.values.IngresoNetoParejaDependiente)) ? parseInt(formik.values.IngresoNetoParejaDependiente) : 0
         })
      );
      formik.setFieldValue(
         "TotalIngresosNetos",
         parseInt(Tot) + parseInt(Tot) + (!isNaN(parseInt(formik.values.IngresoNetoParejaDependiente)) ? parseInt(formik.values.IngresoNetoParejaDependiente) : 0)
      );
   };
   useEffect(() => {
      event();

      // const total =
      //    parseInt(formik.values.IngresoMensualAnualConclusionNeto) > 0
      //       ? parseInt(formik.values.IngresoMensualAnualConclusionNeto) + parseInt(formik.values.IngresoNetoParejaDependiente)
      //       : parseInt(formik.values.IngresoNetoParejaDependiente);
      // formik.setFieldValue("TotalIngresosNetos", total);
      // dispatch(configValidationsDependientesEconomicos({ tipo: "TotalesGeneral", total: total }));
   }, []);
   return (
      <>
         <Text type={"number"} disabled={true} name="IngresoMensualAnualConclusionNeto" label={labelSumaIyII(declaracion)} />
         <Text type={"number"} disabled={true} name="TotalIngresosNetos" label={labelTotal(declaracion)} />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};
