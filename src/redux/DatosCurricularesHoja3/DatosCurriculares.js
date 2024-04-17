import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
    Id_Nivel: 0,
    NombreInstitucionEducativa: "",
    CarreraAreaConocimiento: "",
    Id_UbicacionInstitucionEducativa: 1,
    Id_Estatus: 0,
    Id_DocumentoObtenido: 0,
    FechaObtencion: "",
    Aclaraciones: "",
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial"))
}
const validationSchema ={
    Id_Nivel: Yup.number().min(1, "El nivel de estudios es requerido").required("El nivel de estudios es requerido"),
    NombreInstitucionEducativa: Yup.string().required("El Nombre de la instución educativa es requerida"),
    CarreraAreaConocimiento: Yup.string().required("El Aerea de conocimiento es requerida"),
    Id_UbicacionInstitucionEducativa: Yup.number().required("El lugar donde se ubica la institución educativa es requerido"),
    Id_DocumentoObtenido: Yup.number().min(1, "El documento obtenido es requerido").required("El documento obtenido es requerido"),
    Id_Estatus: Yup.number().min(1, "El Estatus de la institución es requerido").required("El Estatus de la institución es es requerido"),
    FechaObtencion: Yup.date("Formato de fecha invalida").required("La fecha de obtención es requerida") 
}
const data ={
    initialState,validationSchema
}
export const DatosCurricularesHoja3 = createSlice({
    name:"DatosCurriculares",
    initialState:data,
    reducers:{
    addDatosCurriculares:(state,action)=>{
        state.initialState = action.payload
    }
    }
})
export  const {addDatosCurriculares} = DatosCurricularesHoja3.actions
export default DatosCurricularesHoja3.reducer