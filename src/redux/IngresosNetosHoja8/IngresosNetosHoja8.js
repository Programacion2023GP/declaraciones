import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
    RemuneracionMensualAnualConclusionCargoPublico:"",
    // OtrosIngresosMensualesAnualesConclusionTotal:"",//numericos
    AICE_RemuneracionTotal:"",//numericos
    AICE_Id_RemuneracionTotal:"",//numericos
    AICE_NombreRazonSocial:"",
    AICE_TipoNegocio:"",
    AF_RemuneracionTotal:"",//numericos
    AF_Id_RemuneracionTotal:"",//numericos
    AF_Id_TipoInstrumento:"",//numericos
    AF_EspecifiqueOtroTipo:"",
    SP_RemuneracionTotal:"",//numericos
    SP_Id_RemuneracionTotal:"",//numericos
    SP_TipoServicioPrestado:"",
    EB_RemuneracionTotal:"",//numericos
    EB_Id_RemuneracionTotal:"",//numericos
    EB_Id_TipoBienEnajenado:"",//numericos
    OINC_RemuneracionTotal:"",//numericos
    OINC_Id_RemuneracionTotal:"",//numericos
    OINC_EspecificarTipoIngreso:"",
    IngresoNetoParejaDependiente:"",
    IngresoMensualAnualConclusionNeto:0,
    TotalIngresosNetos:0,
    Aclaraciones:"",

}
const validationSchema ={
    RemuneracionMensualAnualConclusionCargoPublico: Yup.number("La renumeración es numerica").required("La renumeración es requerida"),
    AICE_NombreRazonSocial:Yup.string().required("El nombre de razon social es requerido"),
    AICE_TipoNegocio:Yup.string().required("El tipo de negocio es requerido"),
    AICE_RemuneracionTotal:Yup.string().required("actividad industrial, comercial y/o empresarial es requerida"),
    AF_RemuneracionTotal:Yup.number("La renumeración es numerica").required("La renumeración es requerida"),
    AF_Id_TipoInstrumento:Yup.number("El tipo de instrumento es requerido").required("El tipo de instrumento es requerido"),
    SP_RemuneracionTotal:Yup.string("La renumeración es requerida").required("La renumeración es requerida"),
    SP_TipoServicioPrestado:Yup.string("El tipo del servicio prestado es requerido").required("El tipo del servicio prestado es requerido"),    
    // OtrosIngresosMensualesAnualesConclusionTotal: Yup.number().required("El nombre es requerido"),
    EB_RemuneracionTotal:Yup.number("La renumeración es numerica").required("La renumeración es requerida"),
    EB_Id_TipoBienEnajenado:Yup.number("El tipo de bien es requerido").required("El tipo de bien es requerido"),
    OINC_RemuneracionTotal:Yup.number("La renumeración es numerica").required("La renumeración es requerida"),
    OINC_EspecificarTipoIngreso:Yup.string("La especificacion del tipo de ingreo es requerida").required("La especificacion del tipo de ingreo es requerida"),
    IngresoNetoParejaDependiente:Yup.number("Los ingresos netos de la pareja son requeridos").required("Los ingresos netos de la pareja son requeridos"),
    IngresoMensualAnualConclusionNeto:Yup.number("Otros Ingresos del declarante son requeridos").min(1,"Debe ser mayor a 0").required("Otros Ingresos del declarante son requeridos"),
    TotalIngresosNetos:Yup.number("Es requerido el total de ingresos").min(1,"Debe ser mayor a 0").required("Es requerido el total de ingresos")
}
const TipoInstrumentoOtro = {
    AF_EspecifiqueOtroTipo:Yup.string("Especifique otro tipo es requerido").required("Especifique otro tipo es requerido")
}
const data ={
    initialState:initialState,
    validationSchema:validationSchema,
}
export const IngresosNetosHoja8 = createSlice({
    name:"DependientesEconomicos",
    initialState:data,
    reducers:{
        addIngresosNetos:(state,action)=>{
            Object.assign(state.initialState, action.payload);
            state.initialState.Id_SituacionPatrimonial =parseInt(localStorage.getItem("id_SituacionPatrimonial"));
         },
        configValidationsDependientesEconomicos:(state,action)=>{
            switch (action.payload.tipo) {
                case "OtroTipo":
                    delete state.validationSchema['AF_EspecifiqueOtroTipo'];
                    
                    break;
                case "EspecifiqueTipo":
                        
                    Object.assign(state.validationSchema,TipoInstrumentoOtro)
                    
                    break;
                 case "Totales":
                 state.initialState.IngresoMensualAnualConclusionNeto = action.payload.total
                 state.initialState.TotalIngresosNetos = state.initialState.IngresoMensualAnualConclusionNeto
                 break;
                 case "TotalGeneral":
                    state.initialState.TotalIngresosNetos = total

                 break;

                   
            }
    }
}
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

export const {configValidationsDependientesEconomicos,addIngresosNetos} = IngresosNetosHoja8.actions
export default IngresosNetosHoja8.reducer