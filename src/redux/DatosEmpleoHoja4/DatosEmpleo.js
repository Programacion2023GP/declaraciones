import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   Id_NivelOrdenGobierno: 0,
   Id_AmbitoPublico: 0,
   NombreEntePublico: "",
   EsEnMexico: 1,
   AreaAdscripcion: "",
   EmpleoCargoComision: "",
   NivelEmpleoCargoComision: "",
   NivelEmpleoCargoComisionText: "",
   ContratadoPorHonorarios: 0,
   FuncionPrincipal: "",
   FechaTomaConclusionPosesion: "",
   ExtensionTelefonoOficina: "",
   TelefonoOficina: "",
   Calle: "",
   CodigoPostal: "",
   NumeroExterior: "",
   NumeroInterior: "",
   ColoniaLocalidad: "",
   Id_Pais: 0,
   Id_MunicipioAlcaldia: 0,
   Id_EntidadFederativa: 0,
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   Aclaraciones: "",
   EstadoProvincia: "",
   OtroEntePublico: ""
};
const validationSchema = {
   Id_NivelOrdenGobierno: Yup.number().min(1, "El nivel de orden y de gobierno es requerido").required("El nivel de orden y de gobierno es requerido"),
   Id_AmbitoPublico: Yup.number().min(1, "El ambito público es requerido").required("El ambito público es requerido"),
   NombreEntePublico: Yup.string("El Nombre del ente público es requerido")
      .required("El Nombre del ente público es requerido"),
   AreaAdscripcion: Yup.string("El Áerea de adscripción del ente público es requerido")
      .min(1, "El Áerea de adscripción del ente público es requerido")
      .required("El Áerea de adscripción del ente público es requerido"),
   EmpleoCargoComision: Yup.string("El Empleo cargo comisión es requerido")
      .min(1, "El Empleo cargo comisión es requerido")
      .required("El Empleo cargo comisión es requerido"),
   NivelEmpleoCargoComision: Yup.string().min(1, "El nivel empleo cargo comisión es requerido").required("El nivel empleo cargo comisión es requerido"),
   // NivelEmpleoCargoComisionText: !activeEspecificarEmpleo ? Yup.string().required("El nivel empleo cargo comisión es requerido ") : "",
   FuncionPrincipal: Yup.string().required("La función principal es requerida"),
   FechaTomaConclusionPosesion: Yup.date("No cumple el formato valido de fecha").required("La fecha es requerida"),
   TelefonoOficina: Yup.number("Tienen que ser numeros").required("El telefono de oficina es requerido"),
   EsEnMexico: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   NumeroExterior: Yup.string("Debe ser texto").required("El numero exterior es requerido"),

   Calle: Yup.string().required("La calle es requerida"),
   // NumeroInterior: Yup.number().required("El numero interior es requerido"),
   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
   ColoniaLocalidad: Yup.string().min(1, "La colonia localidad es requerida").required("La colonia localidad es requerida"),

   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
   // Id_EntidadFederativa: !mexico
   //    ? Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria")
   //    : "",
   // Id_MunicipioAlcaldia: !mexico
   //    ? Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
   //    : "",
   // Id_Pais: mexico ? Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio") : "",
   // EstadoProvincia: mexico ? Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres") : ""
};
const regimenPublico = {
   NivelEmpleoCargoComisionText: Yup.string().required("El nivel empleo cargo comisión es requerido ")
};
const mexico = {
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const noMexico = {
   Id_Pais: Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio"),
   EstadoProvincia: Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres")
};
const OtroEntePublico = {
   OtroEntePublico: Yup.string("El otro ente público es requerido").required("El otro ente público es requerido")
};
const data = {
   initialState,
   validationSchema
};
export const DatosEmpleosHoja4 = createSlice({
   name: "DatosEmpleos",
   initialState: data,
   reducers: {
      addDatosEmpleo: (state, action) => {
         state.initialState = action.payload;
      },
      configValidationsEmpleo: (state, action) => {
         switch (action.payload.tipo) {
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
            case "RegimenPublico":
               Object.assign(state.validationSchema, regimenPublico);

               break;
            case "NoRegimenPublico":
               delete state.validationSchema["NivelEmpleoCargoComisionText"];
               break;
            case "OtroEntePublico":
               Object.assign(state.validationSchema, OtroEntePublico);
               break;
            case "NoOtroEntePublico":
               delete state.validationSchema["OtroEntePublico"];
               break;
         }
      }
   }
});
export const { addDatosEmpleo, configValidationsEmpleo } = DatosEmpleosHoja4.actions;
export default DatosEmpleosHoja4.reducer;
