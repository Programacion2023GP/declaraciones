import { useState } from "react";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { addCopropiedadAdeudos, addEpecifiqueOtroAdeudosPasivos, removeCopropiedadAdeudos, removeEpecifiqueOtroAdeudosPasivos } from "../../../../redux/AdeudosPasivoshoja14/AdeudosPasivosHoja14";
import { useDispatch } from "react-redux";

export const InitialValues = ({ titular, monedas,tipoAdeudos }) => {
   const dispatch = useDispatch();
   const [tercero, setTercero] = useState(false);
   const [adeudo,setAdeudo]= useState(false)
   const copropiedad = (name, value) => {
      setTercero(value == 6 ? true : false);
      dispatch(value == 6 ? addCopropiedadAdeudos() : removeCopropiedadAdeudos());
   };
   const tipoAdeudo =(name,value)=>{
      setAdeudo(value == 7 ? true : false)
      dispatch(value == 7 ? addEpecifiqueOtroAdeudosPasivos() : removeEpecifiqueOtroAdeudosPasivos());

   }

   return (
      <>
         <AutoComplete col={adeudo?6:4} name={"Id_Titular"} label={"Titular del Adeudo"} options={titular} handleGetValue={copropiedad} />
         <AutoComplete col={adeudo?6:4} name={"Id_TipoAdeudo"} label={"Tipo del Adeudo"} options={tipoAdeudos} handleGetValue={tipoAdeudo} />
         <Ngif condition={adeudo}>
            <Text col={12} name={"EspecifiqueOtro"} label={"Especifique el tipo de adeudo"}  />
         </Ngif>
         <Text col={adeudo?12:4} name={"NumeroCuentaContrato"} label={"Número de cuenta o contrato"} type={"number"} />
         <DatePickerComponentV2 name={"FechaAdquisicion"} label={"Fecha de adquisición del adeudo/pasivo"} format={"DD/MM/YYYY"} />
         <AutoComplete col={6} name={"Id_SaldoInsolutoSituacionActual"} label={"Tipo de Moneda"} options={monedas} />
         <Text col={6} name={"Monto"} label={"Monto original del adeudo pasivo"} type={"number"} />
         <Ngif condition={tercero}>
            <CustomRadio
               col={12}
               title={"Tercero"}
               name={"T_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona Física" },
                  { value: 2, label: "Persona Moral" }

                  // Agrega más opciones aquí según sea necesario
               ]}
            />
            <Text col={6} name={"T_NombreRazonSocial"} label={"Nombre del tercero o terceros"} />
            <Text col={6} name={"T_Rfc"} label={"RFC"} />
         </Ngif>
         <CustomRadio
            col={12}
            title={"Otorgante del Crédito"}
            name={"OC_Id_TipoPersona"}
            options={[
               { value: 1, label: "Persona Física" },
               { value: 2, label: "Persona Moral" }

               // Agrega más opciones aquí según sea necesario
            ]}
         />
     
         <Text col={6} name={"OC_NombreRazonSocial"} label={"Nombre/Institución o razón social"} />
         <Text col={6} name={"OC_Rfc"} label={"RFC"} />
         <CustomRadio
            col={12}
            name={"EsEnMexico"}
            title={"Donde se Localiza el Adeudo?"}
            options={[
               { value: 0, label: "En el extranjero" },
               { value: 1, label: "En México" }

               // Agrega más opciones aquí según sea necesario
            ]}
         />
         <Text col={12} color={"green"} name={"Aclaraciones"} rows={12} label={"Aclaraciones / Observaciones"} />
      </>
   );
};
