import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";

const initialState = {
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   Nombre: "",
   PrimerApellido: "",
   SegundoApellido: "",
   FechaNacimiento: "",
   RfcDependiente: "",
   Curp: "",
   Id_ParentescoRelacion: "",
   HabitaDomicilioDeclarante: 0,
   EsCiudadanoExtranjero: 0,
   NumeroExterior: "",
   Calle: "",
   Id_LugarDondeReside: 1,
   CodigoPostal: "",
   CiudadLocalidad: "",
   Id_EntidadFederativa: 0,
   Id_MunicipioAlcaldia: 0,
   Id_Pais: 0,
   EstadoProvincia: "",
   NumeroExterior: 0,
   Id_ActividadLaboral: 1,
   NombreEmpresaSociedadAsociacion: "",
   RfcEmpresa: "",
   EmpleoCargoComision: "",
   Id_Sector: 0,
   FechaIngreso: "",
   EsProveedorContratistaGobierno: 0,
   Id_MonedaSalarioMensualNeto: 0,
   Id_NivelOrdenGobierno: "",
   Id_AmbitoPublico: 0,
   NombreEntePublico: "",
   ValorSalarioMensualNeto: 0,
   NumeroInterior: 0,
   AreaAdscripcion: "",
   FuncionPrincipal: "",
   Aclaraciones: ""
};
const validationSchema = {
   Nombre: Yup.string().required("El nombre es requerido"),
   PrimerApellido: Yup.string().required("El primer apellido es requerido"),
   FechaNacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
   RfcDependiente: Yup.string()
      .required("El RFC es requerido")
      .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
      .min(10, "El RFC debe tener al menos 10 caracteres")
      .max(13, "El RFC no puede tener más de 13 caracteres"),
   Curp: Yup.string()
      .required("El CURP es requerido")
      .matches(
         /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
         "El CURP no cumple el formato válido"
      )
      .length(18, "El CURP debe tener exactamente 18 caracteres"),
   EsCiudadanoExtranjero: Yup.number("Es requerido  si es Ciudano Extranjero").required("Es requerido  si es Ciudano Extranjero"),
   HabitaDomicilioDeclarante: Yup.number("Es requerido  si habita en el domicilio del declarante").required("Es requerido  si habita en el domicilio del declarante"),
   Id_ParentescoRelacion: Yup.number("La relacion con el declarante es requerida")
      .min(1, "La relacion con el declarante es requerida")
      .required("La relacion con el declarante es requerida"),
   EsCiudadanoExtranjero: Yup.number("Es requerido  si es Ciudano Extranjero").required("Es requerido  si es Ciudano Extranjero"),
   Id_LugarDondeReside: Yup.number("Es requerido  si es dependiente economicó").required("Es requerido  si es dependiente economicó"),
   NombreEmpresaSociedadAsociacion: Yup.string().required("El nombre de la empresa o asociación es requerida"),
   RfcEmpresa: Yup.string().required("El RFC es requerido").min(3, "El RFC de empresa debe tener al menos 3 caracteres"),
   Id_Sector: Yup.number().min(1, "El sector es requerido").required("El sector es requerido"),
   ValorSalarioMensualNeto: Yup.number("No debe llevar centavos")
      .integer("No debe llevar centavos")
      .required("El salario mensual neto es requerido")
      .min(1, "El salario mensual neto es requerido"),
   EsProveedorContratistaGobierno: Yup.number("Es requerido").required("Es requerido"),
   EmpleoCargoComision: Yup.string().required("El empleo cargo comisión es requerido"),
   FechaIngreso: Yup.date("El formato es invalido").required("Se requiere la fecha"),
   Id_MonedaSalarioMensualNeto: Yup.number().min(1, "La moneda mensual es requerida").required("La moneda mensual es requerida"),
   EsCiudadanoExtranjero: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   NumeroExterior: Yup.number("Debe ser numerico").required("El numero exterior es requerido").min(1, "El numero exterior debe ser mayor a 0"),
   Calle: Yup.string().required("La calle es requerida"),
   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
   CiudadLocalidad: Yup.string().required("La colonia localidad es requerida"),
   Id_ActividadLaboral: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion").min(1, "Es requerido que selecione una opcion")
};
const data = {
   initialState: initialState,
   validationSchema: validationSchema,
   datas: []
};
const PrivadouOtro = {
   NombreEmpresaSociedadAsociacion: Yup.string().required("El nombre de la empresa o asociación es requerida"),
   RfcEmpresa: Yup.string().required("El RFC es requerido").min(3, "El RFC de empresa debe tener al menos 3 caracteres"),
   Id_Sector: Yup.number().min(1, "El sector es requerido").required("El sector es requerido"),
   EsProveedorContratistaGobierno: Yup.number("Es requerido").required("Es requerido")
};
const Publico = {
   Id_NivelOrdenGobierno: Yup.number().min(1, "El nivel de gobierno es requerido").required("El nivel de gobierno es requerido"),
   Id_AmbitoPublico: Yup.number().min(1, "El ambito publico es requerido").required("El ambito publico es requerido"),
   NombreEntePublico: Yup.string().required("El nombre del ente publico es requerido"),
   AreaAdscripcion: Yup.string().required("El aerea del adscripción es requerida"),
   FuncionPrincipal: Yup.string().required("La función principal es requerida"),
   ValorSalarioMensualNeto: Yup.number()
      .integer("No debe llevar centavos")
      .required("El salario mensual neto es requerido")
      .min(1, "El salario mensual neto es requerido")
};
const PublicoPrivadouOtro = {
   EmpleoCargoComision: Yup.string().required("El empleo cargo comisión es requerido"),
   FechaIngreso: Yup.date("El formato es invalido").required("Se requiere la fecha"),
   Id_MonedaSalarioMensualNeto: Yup.number().min(1, "La moneda mensual es requerida").required("La moneda mensual es requerida"),
   ValorSalarioMensualNeto: Yup.number()
      .integer("No debe llevar centavos")
      .required("El salario mensual neto es requerido")
      .min(1, "El salario mensual neto es requerido")
};
const validationsDomicilio = {
   EsCiudadanoExtranjero: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   NumeroExterior: Yup.number("Debe ser numerico").required("El numero exterior es requerido").min(1, "El numero exterior debe ser mayor a 0"),
   Calle: Yup.string().required("La calle es requerida"),
   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
   CiudadLocalidad: Yup.string().required("La colonia localidad es requerida"),
   Id_ActividadLaboral: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion").min(1, "Es requerido que selecione una opcion")
};
const mexico = {
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const noMexico = {
   Id_Pais: Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio"),
   EstadoProvincia: Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres")
};
export const DependientesEconomicos7 = createSlice({
   name: "DependientesEconomicos",
   initialState: data,
   reducers: {
      addDatosDependiente: (state, action) => {
         state.validationSchema = validationSchema;
         state.initialState = state.initialState;
         state.datas.push(action.payload);
      },
      deleteDatosDependiente: (state, action) => {
         state.validationSchema = validationSchema;
         state.initialState = state.initialState;
         state.datas = state.datas.filter((item) => item.id !== action.payload.id);
      },
      clearData: (state) => {
         state.datas = [];
      },
      configValidationsDependiente: (state, action) => {
         switch (action.payload.tipo) {
            case "DomicilioDeclarante":
               Object.assign(state.validationSchema, validationsDomicilio);
               Object.assign(state.validationSchema, mexico);

               break;
            case "DomicilioDeclaranteNULL":
               delete state.validationSchema["EsCiudadanoExtranjero"];
               delete state.validationSchema["NumeroExterior"];
               delete state.validationSchema["Calle"];
               delete state.validationSchema["CodigoPostal"];
               delete state.validationSchema["CiudadLocalidad"];
               delete state.validationSchema["Id_Pais"];
               delete state.validationSchema["EstadoProvincia"];
               delete state.validationSchema["Id_EntidadFederativa"];
               delete state.validationSchema["Id_MunicipioAlcaldia"];
               break;
            case "Mexico":
               Object.assign(state.validationSchema, mexico);
               delete state.validationSchema["Id_Pais"];
               delete state.validationSchema["EstadoProvincia"];
               break;
            case "NoesMexico":
               Object.assign(state.validationSchema, noMexico);
               delete state.validationSchema["Id_EntidadFederativa"];
               delete state.validationSchema["Id_MunicipioAlcaldia"];

               break;
            case "Privado":
            case "Otro":
               state.validationSchema = eliminarPropiedades(action.payload.validaciones, Publico);
               Object.assign(state.validationSchema, PrivadouOtro);
               Object.assign(state.validationSchema, PublicoPrivadouOtro);
               break;

            case "Ninguno":
               state.validationSchema = eliminarPropiedades(action.payload.validaciones, { ...Publico, ...PrivadouOtro, ...PublicoPrivadouOtro });
               break;
            case "Publico":
               state.validationSchema = eliminarPropiedades(action.payload.validaciones, PrivadouOtro);
               Object.assign(state.validationSchema, Publico);
               Object.assign(state.validationSchema, PublicoPrivadouOtro);

               break;
         }
      }
   }
});
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
export const { addDatosDependiente, configValidationsDependiente, deleteDatosDependiente, clearData } = DependientesEconomicos7.actions;

export default DependientesEconomicos7.reducer;
