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
            name={""}
            label={"II.1 Por actividad industrial, comercial y/o empresarial"}
            placeholder={`"II.1 Por actividad industrial, comercial y/o empresarial (Después de impuestos)`}
         />
         <Text name="" label="Nombre o Razón Social" />
         <Text name="" label="Tipo de Negocio" />
         <Numeric
            col={12}
            name={""}
            label={"II.2 Por actividad financiera (Rendimientos o ganancias)"}
            placeholder={`II.2 Por actividad financiera (Rendimientos o ganancias) Después de impuestos`}
         />
         {/* <AutoComplete handleGetValue={handleGetValue} options={instrumentos} name="" label={"Tipo de instrumento que generó el rendimiento o ganancia"} col={12} /> */}
         <Ngif condition={other}>
            <Text />
         </Ngif>
         <Numeric
            col={12}
            name={""}
            label={"II.3 Por servicios profesionales, consejos, consultorías, y/o asesorías"}
            placeholder={`II.3 Por servicios profesionales, consejos, consultorías, y/o asesorías`}
         />
         <Text name="" label="Tipo de servicio prestado" />
         <Numeric col={12} name={""} label={"II.4 Por enajenacion de bienes"} placeholder={`II.4 Por enajenacion de bienes`} />
         {/* <AutoComplete options={bienenAjenacion} name="" label={"Tipo de bien enajenado"} col={12} /> */}
         <Numeric
            col={12}
            name={""}
            label={"II.5 Otros ingresos no considerados a los anteriores"}
            placeholder={`II.5 Otros ingresos no considerados a los anteriores`}
         />
         <Text name="" label="Especificar tipo de ingreso" placeholder={"Arrendamiento, regalía, sorteos, concursos, donaciones, seguros de vida, etc."} />
      </>
   );
};
