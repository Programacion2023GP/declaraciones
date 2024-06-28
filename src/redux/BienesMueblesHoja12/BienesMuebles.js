import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
    Id_Titular:0,
    Id_TipoBien:0,
    TR_Id_TipoPersona:0,
    DescripcionGeneralBien:"",
    TR_NombreRazonSocial:"",
    TR_Rfc:"",
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
    Copropiedad:0,
    Id_FormaAdquisicion:0,
    Id_FormaPago:0,
    ValorAdquisicion:"",
    Id_MonedaValorAdquisicion:0,
    FechaAdquisicion:"",
    Aclaraciones:"",
    EspecifiqueOtroTipo:"",
}
const validationSchema ={
    TR_NombreRazonSocial: Yup.string().required("La razon social es requerida"),
    TR_Rfc: Yup.string()
       .required("El rfc es requerido")
       .matches(/^[A-ZÑ&]{3,4}\d{6}?$/, "El rfc no cumple el formato")
       .length(10, "El rfc debe contar con 10 caracteres"),
    Id_Titular:Yup.number("El formato es incorrecto es numerico").min(1,"El titular es requerido").required("El titular es requerido"),
    Id_TipoBien:Yup.number("El formato es incorrecto es numerico").min(1,"El tipo de bien es requerido").required("El tipo de bien es requerido"),
    DescripcionGeneralBien:Yup.string("El formato es incorrecto").required("La descripción del bien es requerida"),
    Copropiedad:Yup.number("El formato es incorrecto es numerico").required("La copropiedad es requerida"),
    Id_FormaAdquisicion:Yup.number("El formato es incorrecto es numerico").min(1,"La forma de adquisición es requerida").required("La forma de adquisición es requerida"),
    Id_FormaPago:Yup.number("El formato es incorrecto es numerico").min(1,"La forma de pago es requerida").required("La forma de pago es requerida"),
    ValorAdquisicion:Yup.number("El formato es incorrecto es numerico").min(0,"El valor de adquisición es requerida").required("El valor de adquisición es requerida"),
    Id_MonedaValorAdquisicion:Yup.number("El formato es incorrecto es numerico").min(1,"La moneda es requerida").required("La moneda es requerida"),
    FechaAdquisicion:Yup.date("El formato es incorrecto").required("La fecha es requerida")
}
const NombreRazon ={

    T_NombreRazonSocial:Yup.string("El formato texto es requerido").required("El Nombre de terceros es requerido"),
    T_Id_TipoPersona:Yup.number("El formato es incorrecto es numerico").required("El tipo de persona es requerido"),

    T_Rfc: Yup.string()
    .required("El rfc es requerido")
    .matches(/^[A-ZÑ&]{3,4}\d{6}?$/, "El rfc no cumple el formato")
    .length(10, "El rfc debe contar con 10 caracteres"),
}
const EspecifiqueOtroTipo ={
    EspecifiqueOtroTipo:Yup.string("El formato es incorrecto").required("Es necesario especificar otro tipo"),
}
const data ={
    initialState,validationSchema,datas:[]
}
export const BienesMueblesHoja12 = createSlice({
    name:"BienesMuebles",
    initialState:data,
    reducers:{
    addBienesMuebles:(state,action)=>{
        state.datas.push(action.payload)
    },
    addValidacionesBienesMuebles:(state,action)=>{
        switch (action.payload.tipo) {
            case "OtroTipo":
                Object.assign(state.validationSchema,EspecifiqueOtroTipo)
                break;
            case "NoOtroTipo":
                    delete state.validationSchema['EspecifiqueOtroTipo']
                break;
            case "NombreRazon":
                Object.assign(state.validationSchema,NombreRazon)
                break;
                case "NoNombreRazon":
                delete state.validationSchema['TR_Rfc']
                delete state.validationSchema['TR_NombreRazonSocial']
                delete state.validationSchema['TR_Id_TipoPersona']
                break;
            default:
                break;
        }
    }
    }
})
export  const {addDatosCurriculares,addValidacionesBienesMuebles} = BienesMueblesHoja12.actions
export default BienesMueblesHoja12.reducer