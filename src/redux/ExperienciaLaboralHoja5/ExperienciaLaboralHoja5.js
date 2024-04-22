import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";

const initialState ={

}
const validationSchema ={

}
const data ={
    initialState,
    validationSchema,
    datas:[]
}
export const ExperienciaLaboralHoja5 = createSlice({
    name:"ExperienciaLaboral",
    initialState:data,
    reducers:{
        addExperienciaLaboral:(state,action)=>{
            // state.validationSchema = validationSchema
            // state.initialState = state.initialState            
           state.datas.push(action.payload)
        }

    }
})
export  const {addExperienciaLaboral} = ExperienciaLaboralHoja5.actions
export default ExperienciaLaboralHoja5.reducer 