import { configureStore } from "@reduxjs/toolkit";
import { DatosParejaHoja6 } from "./DatosParejaHoja6/DatosPareja";
import { DependientesEconomicos7 } from "./DependientesEconomicos7/DependientesEconomicos";
import { IngresosNetosHoja8 } from "./IngresosNetosHoja8/IngresosNetosHoja8";
import { ServidorPublicoHoja9 } from "./ServidorPublicoHoja9/ServidorPublicoHoja9";
import { BienesInmueblesHoja10 } from "./BienesInmueblesHoja10/BienesInmueblesHoja10";
 const store = configureStore({
    reducer:{
        DatosPareja :DatosParejaHoja6.reducer,
        DependientesEconomicos:DependientesEconomicos7.reducer,
        IngresosNetos:IngresosNetosHoja8.reducer,
        ServidorPublico:ServidorPublicoHoja9.reducer,        
        BienesInmuebles:BienesInmueblesHoja10.reducer
    },
})
export default store;