import { useParams } from "react-router-dom";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { labelSumaIyII, labelTotal } from "../../funciones/ingresosEservidor/labels";
import { useEffect } from "react";
import { configValidationsDependientesEconomicos } from "../../../../redux/IngresosNetosHoja8/IngresosNetosHoja8";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { configValidationServidorPublico } from "../../../../redux/ServidorPublicoHoja9/ServidorPublicoHoja9";

export const Totales = ({}) => {
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const formik = useFormikContext();
   const dispatch = useDispatch();
   const total = () => {
      return (
         formik.values.RemuneracionMensualAnualConclusionCargoPublico +
         formik.values.AICE_RemuneracionTotal +
         formik.values.AF_RemuneracionTotal +
         formik.values.SP_RemuneracionTotal +
         formik.values.EB_RemuneracionTotal +
         formik.values.OINC_RemuneracionTotal
      );
   };
   const event = () => {
      const Tot = total();
      dispatch(configValidationServidorPublico({ tipo: "Totales", total: parseInt(Tot) }));
      formik.setFieldValue("IngresoMensualAnualConclusionNeto", Tot);
      dispatch(configValidationServidorPublico({ tipo: "TotalesGeneral", total: parseInt(Tot) + parseInt(formik.values.IngresoNetoParejaDependiente) }));
      formik.setFieldValue("TotalIngresosNetos", parseInt(Tot) + parseInt(formik.values.IngresoNetoParejaDependiente));
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
         <Text type={'number'} disabled={true} name="IngresoMensualConclusionNeto" label={labelSumaIyII(declaracion)} placeholder={labelSumaIyII(declaracion)} />
         <Text type={'number'} disabled={true} name="TotalIngresosNetos" label={labelTotal(declaracion)} placeholder={labelTotal(declaracion)} />

         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
      </>
   );
};
