import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
    Id_TipoVehiculo: 0,
    Id_Titular:0,
    Marca:"",
    Modelo:"",
    Anio:"",
    EspecifiqueVehiculo:"",
    NumeroSerieRegistro:"",
    EsEnMexico:1,
    Id_FormaAdquisicion:0,
    Id_FormaPago:0,
    ValorAdquisicion:0,
    Id_MonedaValorAdquisicion:0,
    FechaAdquisicion:"",
    Id_MotivoBaja:0,
    Aclaraciones:"",
    Id_Relacion:0,
    T_Id_TipoPersona:0,
    T_NombreRazonSocial:"",
    T_Rfc:"",
}
const validationSchema={
    Id_TipoVehiculo:Yup.number("El formato numerico es obligatorio").min(1,"El tipo de vehiculo es requerido").required("El tipo de vehiculo es requerido"),
    Id_Titular:Yup.number("El formato numerico es obligatorio").required("El titular es requerido"),
    Marca:Yup.string("el formato es texto").required("La marca es requerida"),
    Modelo:Yup.string("el formato es texto").required("El modelo es requerido"),
    Anio:Yup.number("selecciona un año").required("El año es requerido"),
    NumeroSerieRegistro:Yup.string("el formato es texto").required("El numero de serie o registro es requerido"),
    EsEnMexico:Yup.number("El formato numerico es obligatorio").required("El Donde se encuentra ubicado es requerido"),
    Id_FormaAdquisicion:Yup.number("El formato numerico es obligatorio").min(1,"La forma de adquisición es requerida").required("La forma de adquisición es requerida"),
    Id_FormaPago:Yup.number("El formato numerico es obligatorio").min(1,"La forma de pago es requerida").required("La forma de pago es requerida"),
    ValorAdquisicion:Yup.number("El formato numerico es obligatorio").min(1,"El valor de la adquisicion es requerido").required("El valor de la adquisicion es requerido"),
    Id_MonedaValorAdquisicion:Yup.number("El formato numerico es obligatorio").min(1,"El tipo de moneda es requerida").required("El tipo de moneda es requerida"),
    FechaAdquisicion:Yup.date("El formato es numerico").required("La fecha de adquisición es requerida"),
    // Id_MotivoBaja:Yup.number("El formato numerico es obligatorio").min(1,"El motivo de baja es requerida").required("El motivo de baja es requerida"),
}
const OtroVehiculo ={
    EspecifiqueVehiculo:Yup.string("el formato es texto").required("Especifique otro vehiculo es requerido"),
}
const Tercero={
    Id_Relacion:Yup.number("El formato numerico es obligatorio").min(1,"La relación es requerida").required("La relación es requerida"),
    T_Id_TipoPersona:Yup.number("El formato numerico es obligatorio").required("El titular es requerido"),
    T_NombreRazonSocial:Yup.string("El formato es texto").required("El Nombre de tercero o terceros es requerido"),
    T_Rfc:Yup.string("El formato es texto").required("El Nombre de tercero o terceros es requerido"),
}
const Titular ={
    TR_Id_TipoPersona:Yup.number("El formato numerico es obligatorio").required("El titular es requerido"),
    TR_NombreRazonSocial:Yup.string("El formato es texto").required("El Nombre o razon social del transmitor es requerida"),
    TR_Rfc:Yup.string("El formato es texto").required("El Nombre de tercero o terceros es requerido"),
}
 const data ={
        initialState,validationSchema,datas:[]
}

export const VehiculosHoja11 = createSlice({
    name:"Vehiculos",
    initialState:data,
    reducers:{
      addVehiculo:(state,action)=>{
        state.datas.push(action.payload)
      },
      configValidatorsVehiculos:(state,action)=>{
        switch(action.payload.tipo){
            case "OtroVehiculo":
                Object.assign(state.validationSchema,OtroVehiculo)
            break;
            case "NoOtroVehiculo":
                delete state.validationSchema['EspecifiqueVehiculo'];
            break;
            case "TerceroTitular":
                state.validationSchema = eliminarPropiedades(action.payload.validaciones,{...Titular})
         
            Object.assign(state.validationSchema,Tercero)

            break;
            case "TransmisorTitular":
                state.validationSchema = eliminarPropiedades(action.payload.validaciones,{...Tercero})

                Object.assign(state.validationSchema,Titular)

            break;
            case "DeclaranteTitular":
                state.validationSchema = eliminarPropiedades(action.payload.validaciones,{...Tercero,...Titular})

            break;
        }
      }

    },
})
const eliminarPropiedades = (objeto1, objeto2) => {
    if (Object.isFrozen(objeto1)) {
        objeto1 = { ...objeto1 };
    }
    for (let key in objeto2) {
        if (objeto1.hasOwnProperty(key)) {
            delete objeto1[key];
        }
    }
    return objeto1;
};
export  const {addVehiculo,configValidatorsVehiculos} = VehiculosHoja11.actions
export default VehiculosHoja11.reducer  