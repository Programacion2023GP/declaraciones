import { useEffect, useState } from "react";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { GetAxios } from "../../../../services/services";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";
import { configValidationServidorPublico } from "../../../../redux/ServidorPublicoHoja9/ServidorPublicoHoja9";

export const SPublicoII = ({}) => {
   const [other, setOther] = useState(false);
   const [instrumentos, SetInstrumentos] = useState([]);
   const [bienenAjenacion, setBieneAjenacion] = useState([]);
   const dispatch = useDispatch();
   const formik = useFormikContext();
   const handleGetValue = (name, value) => {
      dispatch(configValidationServidorPublico({ tipo: value == 7 ? "EspecifiqueTipo" : "OtroTipo" }));
      setOther(value == 7 ? true : false);
   };
   const [AICE_RemuneracionTotal, setAice] = useState(0);
   const [AF_RemuneracionTotal, setAf] = useState(0);
   const [SP_RemuneracionTotal, setSp] = useState(0);
   const [EB_RemuneracionTotal, setER] = useState(0);
   const [OINC_RemuneracionTotal, setOi] = useState(0);

   const handleingresosNetos = (name, value) => {
      switch (name) {
         case "AICE_RemuneracionTotal":
            setAice(value);
            break;
         case "AF_RemuneracionTotal":
            setAf(value);
            break;
         case "SP_RemuneracionTotal":
            setSp(value);
            break;
         case "EB_RemuneracionTotal":
            setER(value);
            break;
         case "OINC_RemuneracionTotal":
            setOi(value);
            break;
      }
   };
   const total = () => {
      return (
         formik.values.RemuneracionNetaCargoPublico +
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
      formik.setFieldValue("IngresoMensualConclusionNeto", Tot);

      formik.setFieldValue(
         "TotalIngresosNetos",
         parseInt(formik.values.IngresoNetoParejaDependiente) > 0 ? parseInt(Tot) + parseInt(formik.values.IngresoNetoParejaDependiente) : parseInt(Tot)
      );
   };
   useEffect(() => {
      event();
      const init = async () => {
         SetInstrumentos(await GetAxios("/tipoinstrumento/show"));
         setBieneAjenacion(await GetAxios("/bienenajenacion/show"));
      };
      init();
   }, [AICE_RemuneracionTotal, AF_RemuneracionTotal, SP_RemuneracionTotal, EB_RemuneracionTotal, OINC_RemuneracionTotal]);
   return (
      <>
         <Numeric
            col={12}
            name={"AICE_RemuneracionTotal"}
            label={"II.1 Por actividad industrial, comercial y/o empresarial"}
            placeholder={`"II.1 Por actividad industrial, comercial y/o empresarial (Después de impuestos)`}
            handleGetValue={handleingresosNetos}
         />
         <Text name="AICE_NombreRazonSocial" label="Nombre o Razón Social" />
         <Text name="AICE_TipoNegocio" label="Tipo de Negocio" />
         <Numeric
            col={12}
            name={"AF_RemuneracionTotal"}
            label={"II.2 Por actividad financiera (Rendimientos o ganancias)"}
            placeholder={`II.2 Por actividad financiera (Rendimientos o ganancias) Después de impuestos`}
            handleGetValue={handleingresosNetos}
         />
         <AutoComplete
            handleGetValue={handleGetValue}
            options={instrumentos}
            name="AF_Id_TipoInstrumento"
            label={"Tipo de instrumento que generó el rendimiento o ganancia"}
            col={12}
         />
         <Ngif condition={other}>
            <Text name="AF_EspecifiqueOtroTipo" label={"Especifique otro tipo"} />
         </Ngif>
         <Numeric
            col={12}
            name={"SP_RemuneracionTotal"}
            label={"II.3 Por servicios profesionales, consejos, consultorías, y/o asesorías"}
            placeholder={`II.3 Por servicios profesionales, consejos, consultorías, y/o asesorías`}
            handleGetValue={handleingresosNetos}
         />
         <Text name="SP_TipoServicioPrestado" label="Tipo de servicio prestado" />
         <Numeric
            col={12}
            name={"EB_RemuneracionTotal"}
            label={"II.4 Por enajenacion de bienes"}
            placeholder={`II.4 Por enajenacion de bienes`}
            handleGetValue={handleingresosNetos}
         />
         <AutoComplete options={bienenAjenacion} name="EB_Id_TipoBienEnajenado" label={"Tipo de bien enajenado"} col={12} />
         <Numeric
            col={12}
            name={"OINC_RemuneracionTotal"}
            label={"II.5 Otros ingresos no considerados a los anteriores"}
            placeholder={`II.5 Otros ingresos no considerados a los anteriores`}
            handleGetValue={handleingresosNetos}
         />

         <Text
            name="OINC_EspecificarTipoIngreso"
            label="Especificar tipo de ingreso"
            placeholder={"Arrendamiento, regalía, sorteos, concursos, donaciones, seguros de vida, etc."}
         />
      </>
   );
};
