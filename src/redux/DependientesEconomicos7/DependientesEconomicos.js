import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";

const initialState = {
    Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
    Nombre:"",
    PrimerApellido:"",
    SegundoApellido:"",
    FechaNacimiento:"",
    RfcDependiente:"",
    Homoclave:"",
    Curp:"",
    Id_RelacionDeclarante:"",
    HabitaDomicilioDeclarante:1,
    EsCiudadanoExtranjero:0,
    NumeroExterior:"",
    Calle:"",
    EsEnMexico:1,
    Id_LugarDondeReside:1,

    CodigoPostal:"",
    ColoniaLocalidad:"",
    Id_EntidadFederativa:0,
    Id_MunicipioAlcaldia:0,
    Id_Pais:0,
    EstadoProvincia:"",
    NumeroExterior: 0,
    Id_ActividadLaboral:1,
    NombreEmpresaSociedadAsociacion:"",
    RfcEmpresa:"",
    EmpleoCargoComision:"",
    Id_Sector:0,
    FechaIngreso:"",
    EsProveedorContratistaGobierno: 0,
    Id_MonedaSalarioMensualNeto:0,
    Id_NivelOrdenGobierno:"",
    Id_AmbitoPublico:0,
    NombreEntePublico:"",
    ValorSalarioMensualNeto:0,
    AreaAdscripcion:"",
    FuncionPrincipal:"",
    Aclaraciones:"",
}
const validationSchema ={
    Nombre: Yup.string().required("El nombre es requerido"),
    PrimerApellido: Yup.string().required("El primer apellido es requerido"),
    FechaNacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
    RfcDependiente: Yup.string()
    .required("El rfc es requerido")
    .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/, "El rfc no cumple el formato")
    .length(13, "El rfc debe contar con 13 caracteres"),
 Homoclave: Yup.string().required("La Homoclave es requerida").length(3, "La Homoclave debe tener exactamente 3 caracteres"),
    Curp: Yup.string()
    .required("El CURP es requerido")
    .matches(
       /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
       "El CURP no cumple el formato válido"
    )
    .length(18, "El CURP debe tener exactamente 18 caracteres"),
    EsCiudadanoExtranjero:Yup.number("Es requerido  si es Ciudano Extranjero").required("Es requerido  si es Ciudano Extranjero"),
    HabitaDomicilioDeclarante:Yup.number("Es requerido  si habita en el domicilio del declarante").required("Es requerido  si habita en el domicilio del declarante"),
    Id_RelacionDeclarante:Yup.number("La relacion con el declarante es requerida").min(1,"La relacion con el declarante es requerida").required("La relacion con el declarante es requerida"),
    // EsCiudadanoExtranjero:Yup.number("Es requerido  si es Ciudano Extranjero").required("Es requerido  si es Ciudano Extranjero"),
    // EsDependienteEconomico:Yup.number("Es requerido  si es dependiente economicó").required("Es requerido  si es dependiente economicó"),
    // HabitaDomicilioDeclarante:Yup.number("Es requerido  si habita en el domicilio del declarante").required("Es requerido  si habita en el domicilio del declarante"),
    // NombreEmpresaSociedadAsociacion:Yup.string().required("El nombre de la empresa o asociación es requerida"),
    // RfcEmpresa: Yup.string()
    // .required("El RFC es requerido")
    // .matches(/^.{10}$/, "El RFC debe tener exactamente 10 caracteres"),
    // Id_Sector:Yup.number().min(1,"El sector es requerido").required("El sector es requerido"),
    // ValorSalarioMensualNeto:Yup.number().integer("No debe llevar centavos").required("El salario mensual neto es requerido").min(1,"El salario mensual neto es requerido"),
    // EsProveedorContratistaGobierno:Yup.number("Es requerido").required("Es requerido"),
    // EmpleoCargoComision:Yup.string().required("El empleo cargo comisión es requerido"),
    // FechaIngreso:Yup.date("El formato es invalido").required("Se requiere la fecha"),
    // Id_MonedaSalarioMensualNeto:Yup.number().min(1,"La moneda mensual es requerida").required("La moneda mensual es requerida"),
}
const data ={
    initialState:initialState,
    validationSchema:validationSchema
}
export const DependientesEconomicos7 = createSlice({
    name:"DependientesEconomicos",
    initialState:data,
    reducers:{

    }
})
export default DependientesEconomicos7.reducer