import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
    Id_TipoInmueble:0,
    Id_Titular:0,
}
const validationSchema ={
    Id_TipoInmueble:Yup.number().min(1,"El tipo de inmueble es requerido").required("El tipo de inmueble es requerido"),
    Id_Titular:Yup.number().min(1,"El titular es requerido").required("El titular es requerido"),
}
const data ={
    initialState,validationSchema
}
 export const BienesInmueblesHoja10 = createSlice({
    name:"BienesInmuebles",
    initialState:data,
    reducers:{
    
    }
})
export  const {} = BienesInmueblesHoja10.actions
export default BienesInmueblesHoja10.reducer