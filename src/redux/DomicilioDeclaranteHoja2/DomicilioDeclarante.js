import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   EsEnMexico: 1,
   Calle: "",
   NumeroExterior: 0,
   NumeroInterior: "",
   CodigoPostal: "",
   ColoniaLocalidad: "",
   Id_Pais: 0,
   Id_EntidadFederativa: 0,
   Id_MunicipioAlcaldia: 0,

   Aclaraciones: "",
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   EstadoProvincia: ""
};
const validationSchema = {
   EsEnMexico: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   NumeroExterior: Yup.number("Debe ser numerico").required("El numero exterior es requerido").min(1, "El numero exterior debe ser mayor a 0"),
   Calle: Yup.string().required("La calle es requerida"),
   // NumeroInterior: Yup.number().required("El numero interior es requerido"),
   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
   ColoniaLocalidad: Yup.string().min(1, "La colonia localidad es requerida").required("La colonia localidad es requerida")
};
const mexico = {
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const noMexico = {
   Id_Pais: Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio"),
   EstadoProvincia: Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres")
};
const data = {
   initialState,
   validationSchema
};
export const DomicilioDeclaranteHoja2 = createSlice({
   name: "DomicilioDeclarante",
   initialState: data,
   reducers: {
      addDatosDomicilioDeclarante: (state, action) => {
         state.initialState = action.payload;
      },
      validationDomicilioDeclarante: (state, action) => {
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
export const { addDatosDomicilioDeclarante, validationDomicilioDeclarante } = DomicilioDeclaranteHoja2.actions;

export default DomicilioDeclaranteHoja2.reducer;
