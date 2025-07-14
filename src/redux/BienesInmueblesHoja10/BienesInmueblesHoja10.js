import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   Id_TipoInmueble: 0,
   Id_Titular: 0,
   PorcentajePropiedad: 0,
   SuperficieTerreno: 0,
   Superficieconstruncion: 0,
   Id_Relacion: 0,
   Id_ValorConformeA: 0,
   OtroMotivoBaja: "",
   Id_FormaAdquisicion: 0,
   Id_FormaPago: 0,
   ValorAdquisicion: 0,
   Id_MonedaValorAdquisicion: 0,
   FechaAdquisicion: "",
   //#region tercero
   T_Id_TipoPersona: 1,
   T_NombreRazonSocial: "",
   T_Rfc: "",
   //#region transmisor
   TR_Id_TipoPersona: 1,
   TR_NombreRazonSocial: "",
   TR_Rfc: "",
   DatoIdentificacion: "",
   EsEnMexico: 0,
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
   EstadoProvincia: "",
   motivobaja: "",
   tercero: 0
};
const TerceroAgregado = {
   T_NombreRazonSocial: Yup.string().required("La razon social es requerida"),
   T_Rfc: Yup.string()
   .required("El RFC es requerido")
   .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
   .min(10, "El RFC debe tener al menos 10 caracteres")
   .max(13, "El RFC no puede tener más de 13 caracteres")
};
const validationSchema = {
   TR_NombreRazonSocial: Yup.string().required("La razon social es requerida"),
   TR_Rfc: Yup.string()
   .required("El RFC es requerido")
   .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
   .min(10, "El RFC debe tener al menos 10 caracteres")
   .max(13, "El RFC no puede tener más de 13 caracteres"),

   tercero: Yup.number("El formato es numerico").min(0, "Cuenta con tercero es requerido").required("Cuenta con tercero es requerido"),
   Id_TipoInmueble: Yup.number("El formato es numerico").min(1, "El tipo de inmueble es requerido").required("El tipo de inmueble es requerido"),
   Id_Titular: Yup.number("El formato es numerico").min(1, "El titular es requerido").required("El titular es requerido"),
   PorcentajePropiedad: Yup.number("El formato es numerico")
      .min(1, "El porcentaje de la propiedad es requerido")
      .required("El porcentaje de la propiedad es requerido"),
   SuperficieTerreno: Yup.number("El formato es numerico").min(1, "La superficie del terreno es requerida").required("La superficie del terreno es requerida"),
   Superficieconstruncion: Yup.number("El formato es numerico").required("La superficie de construcción es requerida"),
   Id_Relacion: Yup.number("El formato es numerico").min(1, "La relacion del transmitor es requerida").required("La relacion del transmitor es requerida"),
   T_Id_TipoPersona: Yup.number("El formato es numerico").min(1, "El tipo de persona es requerido").required("El tipo de persona es requerido"),
   Id_FormaAdquisicion: Yup.string().required("La forma de adqusicion es requerida"),
   Id_FormaPago: Yup.number("El formato es numerico").min(1, "La forma de pago es requerida").required("La forma de pago es requerida"),
   Id_MonedaValorAdquisicion: Yup.number("El formato es numerico").min(1, "El valor de la moneda es requerido").required("El valor de la moneda es requerido"),
   FechaAdquisicion: Yup.date("El formato es de fecha").required("La fecha es requerida"),
   DatoIdentificacion: Yup.string().required("El folio es requerido"),
   ValorAdquisicion: Yup.number("El formato es numerico").min(1, "El valor de adquisición es requerido").required("El valor de adquisición es requerido"),
   EsEnMexico: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   Calle: Yup.string().required("La calle es requerida"),
   NumeroExterior: Yup.string("Debe ser texto").required("El numero exterior es requerido"),

   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
      ColoniaLocalidad: Yup.string().min(1, "La colonia localidad es requerida").required("La colonia localidad es requerida")
,
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const mexico = {
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const noMexico = {
   Id_Pais: Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio"),
   EstadoProvincia: Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres")
};
const incluirMotivo = {
   Id_ValorConformeA: Yup.number("El formato es numerico").min(1, "El motivo de baja es requerido").required("El motivo de baja es requerido")
};
const otroMotivoBaja = {
   OtroMotivoBaja: Yup.string("El formato es texto").required("El motivo de baja es requerido")
};
const data = {
   initialState,
   validationSchema,
   datas: []
};

export const BienesInmueblesHoja10 = createSlice({
   name: "BienesInmuebles",
   initialState: data,
   reducers: {
      addBienesInmuebles: (state, action) => {
         state.datas.push(action.payload);
      },
      // editBienesInmuebles: (state, action) => {
      //     state.initialState = { ...action.payload };

      //  },

      restartBienesInmuebles: (state, action) => {
         state.initialState = initialState;
      },
      validationBienesInmuebles: (state, action) => {
         switch (action.payload.tipo) {
            case "restart":
               state.validationSchema = validationSchema;

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
            case "IncluirMotivo":
               Object.assign(state.validationSchema, incluirMotivo);

               break;
            case "NoIncluirOtroMotivo":
               delete state.validationSchema["OtroMotivoBaja"];
               delete state.validationSchema["OtroMotivoBaja"];

               break;
            case "OtroMotivoBaja":
               Object.assign(state.validationSchema, otroMotivoBaja);

               break;
            case "NoIncluirOtroMotivoBaja":
               delete state.validationSchema["OtroMotivoBaja"];

               break;
            case "Tercero":
               Object.assign(state.validationSchema, TerceroAgregado);

               break;
            case "NoIncluirTercero":
               delete state.validationSchema["T_NombreRazonSocial"];
               delete state.validationSchema["TR_Rfc"];

               break;
         }
      }
   }
});
export const { addBienesInmuebles, restartBienesInmuebles, validationBienesInmuebles, editBienesInmuebles } = BienesInmueblesHoja10.actions;
export default BienesInmueblesHoja10.reducer;
615165;
