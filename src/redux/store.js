import { configureStore } from "@reduxjs/toolkit";
import { DatosParejaHoja6 } from "./DatosParejaHoja6/DatosPareja";
import { DependientesEconomicos7 } from "./DependientesEconomicos7/DependientesEconomicos";
import { IngresosNetosHoja8 } from "./IngresosNetosHoja8/IngresosNetosHoja8";
import { ServidorPublicoHoja9 } from "./ServidorPublicoHoja9/ServidorPublicoHoja9";
import { BienesInmueblesHoja10 } from "./BienesInmueblesHoja10/BienesInmueblesHoja10";
import { DatosGeneralesHoja1 } from "./DatosGeneralesHoja1/DatosGenerales";
import { DomicilioDeclaranteHoja2 } from "./DomicilioDeclaranteHoja2/DomicilioDeclarante";
import { DatosCurricularesHoja3 } from "./DatosCurricularesHoja3/DatosCurriculares";
import { DatosEmpleosHoja4 } from "./DatosEmpleoHoja4/DatosEmpleo";
import { ExperienciaLaboralHoja5 } from "./ExperienciaLaboralHoja5/ExperienciaLaboralHoja5";
import { loggerMiddleware } from "./Middlewares/middlewares";
import { VehiculosHoja11 } from "./VehiculosHoja11/VehiculosHoja11";
import { BienesMueblesHoja12 } from "./BienesMueblesHoja12/BienesMuebles";
import { InversionesCuentasValoresHoja13 } from "./InversionesCuentasValoresHoja13/InversionesCuentasValores";
import { AdeudosPasivosHoja14 } from "./AdeudosPasivoshoja14/AdeudosPasivosHoja14";
import { PrestamoComodatoHoja15 } from "./PrestamoComodatoHoja15/PrestamoComodatoHoja15";
 const store = configureStore({
    reducer:{
        
        DatosGenerales:DatosGeneralesHoja1.reducer,
        DomicilioDeclarante:DomicilioDeclaranteHoja2.reducer,
        DatosCurriculares:DatosCurricularesHoja3.reducer,
        DatosEmpleo:DatosEmpleosHoja4.reducer,
        ExperenciaLaboral:ExperienciaLaboralHoja5.reducer,
        DatosPareja :DatosParejaHoja6.reducer,
        DependientesEconomicos:DependientesEconomicos7.reducer,
        IngresosNetos:IngresosNetosHoja8.reducer,
        ServidorPublico:ServidorPublicoHoja9.reducer,        
        BienesInmuebles:BienesInmueblesHoja10.reducer,
        Vehiculos:VehiculosHoja11.reducer,
        BienesMuebles:BienesMueblesHoja12.reducer,
        InversionesCuentasValores:InversionesCuentasValoresHoja13.reducer,
        AdeudosPasivos:AdeudosPasivosHoja14.reducer,
        PrestamoComodato:PrestamoComodatoHoja15.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})
export default store;
/*
TODO getDefaultMiddleware: Esta es una función proporcionada por Redux Toolkit que 
TODO devuelve una matriz de middlewares predeterminados que se aplican a la tienda Redux. 
TODO Estos middlewares incluyen manejo de acciones asíncronas, inmutabilidad, serialización, entre otros.
TODO getDefaultMiddleware(): Aquí estamos llamando a la función getDefaultMiddleware para obtener esa matriz de middlewares predeterminados.
TODO .concat(loggerMiddleware): Utilizamos el método concat de JavaScript para concatenar nuestro middleware personalizado loggerMiddleware 
TODO a la matriz de middlewares predeterminados. Esto significa que estamos agregando nuestro middleware al final de la cadena de middlewares.

*/