import { configureStore } from "@reduxjs/toolkit";
import { DatosParejaHoja6 } from "./DatosParejaHoja6/DatosPareja";
import { DependientesEconomicos7 } from "./DependientesEconomicos7/DependientesEconomicos";
import { IngresosNetosHoja8 } from "./IngresosNetosHoja8/IngresosNetosHoja8";
 const store = configureStore({
    reducer:{
        DatosPareja :DatosParejaHoja6.reducer,
        DependientesEconomicos:DependientesEconomicos7.reducer,
        IngresosNetos:IngresosNetosHoja8.reducer
    },
})
export default store;