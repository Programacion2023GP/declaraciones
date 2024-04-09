import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
    RemuneracionMensualAnualConclusionCargoPublico:"",
    OtrosIngresosMensualesAnualesConclusionTotal:0,
    AICE_RemuneracionTotal:0,
    AICE_Id_RemuneracionTotal:0,
    AICE_NombreRazonSocial:"",
    AICE_TipoNegocio:"",
    AF_RemuneracionTotal:0,
    AF_Id_RemuneracionTotal:0,
    AF_Id_TipoInstrumento:0,
    SP_RemuneracionTotal:0,
    SP_Id_RemuneracionTotal:0,
    SP_TipoServicioPrestado:"",
    EB_RemuneracionTotal:0,
    EB_Id_RemuneracionTotal:0,
    EB_Id_TipoBienEnajenado:0,
    OINC_RemuneracionTotal:0,
    OINC_Id_RemuneracionTotal:0,
    OINC_EspecificarTipoIngreso:"",
    IngresoMensualAnualConclusionNeto:"",
    IngresoNetoParejaDependiente:"",
    TotalIngresosNetos:"",
    Aclaraciones:"",

}
const validationSchema ={
    RemuneracionMensualAnualConclusionCargoPublico: Yup.number().required("El nombre es requerido"),
    OtrosIngresosMensualesAnualesConclusionTotal: Yup.number().required("El nombre es requerido")
}
const data ={
    initialState:initialState,
    validationSchema:validationSchema,
}
export const IngresosNetosHoja8 = createSlice({
    name:"DependientesEconomicos",
    initialState:data,
    reducers:{}
})
export const {} = IngresosNetosHoja8.actions

export default IngresosNetosHoja8.reducer