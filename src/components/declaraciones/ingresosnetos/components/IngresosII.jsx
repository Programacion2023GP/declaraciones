import { useEffect, useState } from "react";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { GetAxios } from "../../../../services/services";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Ngif } from "../../../Reusables/conditionals/Ngif";

export const IngresosII = ({}) => {
   const [other, setOther] = useState(false);
   const [instrumentos, SetInstrumentos] = useState([]);
   const [bienenAjenacion, setBieneAjenacion] = useState([]);
   const handleGetValue = (name, value) => {
      setOther(value == 7 ? true : false);
   };
   useEffect(() => {
      const init = async () => {
         SetInstrumentos(await GetAxios("/tipoinstrumento/show"));
         setBieneAjenacion(await GetAxios("/bienenajenacion/show"));
      };
      init();
   }, []);
   return (
      <>
         <Numeric
            col={12}
            name={"AICE_RemuneracionTotal"}
            label={"II.1 Por actividad industrial, comercial y/o empresarial"}
            placeholder={`"II.1 Por actividad industrial, comercial y/o empresarial (Después de impuestos)`}
         />
         <Text name="AICE_NombreRazonSocial" label="Nombre o Razón Social" />
         <Text name="AICE_TipoNegocio" label="Tipo de Negocio" />
         <Numeric
            col={12}
            name={"AF_RemuneracionTotal"}
            label={"II.2 Por actividad financiera (Rendimientos o ganancias)"}
            placeholder={`II.2 Por actividad financiera (Rendimientos o ganancias) Después de impuestos`}
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
         />
         <Text name="SP_TipoServicioPrestado" label="Tipo de servicio prestado" />
         <Numeric col={12} name={"EB_RemuneracionTotal"} label={"II.4 Por enajenacion de bienes"} placeholder={`II.4 Por enajenacion de bienes`} />
         <AutoComplete options={bienenAjenacion} name="EB_Id_TipoBienEnajenado" label={"Tipo de bien enajenado"} col={12} />
         <Numeric
            col={12}
            name={"OINC_RemuneracionTotal"}
            label={"II.5 Otros ingresos no considerados a los anteriores"}
            placeholder={`II.5 Otros ingresos no considerados a los anteriores`}
         />

         <Text
            name="OINC_EspecificarTipoIngreso"
            label="Especificar tipo de ingreso"
            placeholder={"Arrendamiento, regalía, sorteos, concursos, donaciones, seguros de vida, etc."}
         />
      </>
   );
};
