import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
    Id_TipoVehiculo: 0,
   
}
const validationSchema={
    Id_TipoVehiculo:Yup.number("El formato numerico es obligatorio").min(1,"El tipo de vehiculo es requerido").required("El tipo de vehiculo es requerido")
    }
    const data ={
        initialState,validationSchema,datas:[]
    }
    const servidorPublico ={
      FueServidorPublicoAnioAnterior: Yup.number().required("Selecciona una opcion")
    }
    const RegimenMatrimonial ={
 Id_RegimenMatrimonial:Yup.number().required("El régimen matrimonial es obligatorio").min(1, "El régimen matrimonial es obligatorio")
}
export const VehiculosHoja11 = createSlice({
    name:"Vehiculos",
    initialState:data,
    reducers:{
      

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
export  const {} = VehiculosHoja11.actions
export default VehiculosHoja11.reducer