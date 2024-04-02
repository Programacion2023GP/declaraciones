import { configureStore } from "@reduxjs/toolkit";
import { DatosParejaHoja6 } from "./DatosParejaHoja6/DatosPareja";
 const store = configureStore({
    reducer:{
        DatosPareja :DatosParejaHoja6.reducer
    },
})
export default store;