import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   Id_Titular: 0,
   Id_TipoAdeudo: 0,
   NumeroCuentaContrato: "",
   FechaAdquisicion: "",
   Monto: "",
   Id_Monto: 0,
   SaldoInsolutoSituacionActual: 0,
   Id_SaldoInsolutoSituacionActual: 0,
   T_Id_TipoPersona: 0,
   T_NombreRazonSocial: "",
   T_Rfc: "",
   OC_Id_TipoPersona: 0,
   OC_NombreRazonSocial: "",
   OC_Rfc: "",
   EsEnMexico: 1,
   Aclaraciones: "",
   EspecifiqueOtro: ""
};
const copropiedad = {
   T_Rfc: Yup.string()
      .required("El RFC es requerido")
      .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
      .min(10, "El RFC debe tener al menos 10 caracteres")
      .max(13, "El RFC no puede tener más de 13 caracteres"),
   T_NombreRazonSocial: Yup.string("El formato es texto").required("El nombre del tercero o terceros es requerido"),
   T_Id_TipoPersona: Yup.number("El formato es numerico").min(1, "El tipo de persona es requerida").required("El tipo de persona es requerida")
};
const validationSchema = {
   Id_Titular: Yup.number("El formato es numerico").min(1, "El titular es requerido").required("El titular es requerido"),
   Id_TipoAdeudo: Yup.number("El formato es numerico").min(1, "El tipo de adeudo es requerido").required("El tipo de adeudo es requerido"),
   NumeroCuentaContrato: Yup.number("El formato es numerico").min(1, "El numero de cuenta es requerido").required("El numero de cuenta es requerido"),
   FechaAdquisicion: Yup.date("el formato de fecha es incorrecto").required("La fecha de adquisición es requerida"),
   Monto: Yup.number("El monto es requerido").required("El monto es requerido"),
   Id_SaldoInsolutoSituacionActual: Yup.number("El formato es numerico").min(1, "El tipo de moneda es requerida").required("El tipo de moneda es requerida"),
   OC_Rfc: Yup.string()
   .required("El RFC es requerido")
   .matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{0,3}$/, "El RFC no cumple el formato")
   .min(10, "El RFC debe tener al menos 10 caracteres")
   .max(13, "El RFC no puede tener más de 13 caracteres"),
   OC_NombreRazonSocial: Yup.string("El formato es texto").required("El nombre es requerido"),
   OC_Id_TipoPersona: Yup.number("El formato es numerico").min(1, "El tipo de persona es requerida").required("El tipo de persona es requerida")
};
const EspecifiqueOtro = {
   EspecifiqueOtro: Yup.string("el formato es texto").required("Especifique otro tipo de adeudo")
};

const data = {
   initialState,
   validationSchema,
   datas: []
};

export const AdeudosPasivosHoja14 = createSlice({
   name: "AdeudosPasivos",
   initialState: data,
   reducers: {
      addAdeudosPasivos: (state, action) => {
         state.datas.push(action.payload);
      },
      addCopropiedadAdeudos: (state, action) => {
         Object.assign(state.validationSchema, copropiedad);
      },
      removeCopropiedadAdeudos: (state, action) => {
         delete state.validationSchema["T_Rfc"];
         delete state.validationSchema["T_NombreRazonSocial"];
         delete state.validationSchema["T_Id_TipoPersona"];
      },
      addEpecifiqueOtroAdeudosPasivos: (state, action) => {
         Object.assign(state.validationSchema, EspecifiqueOtro);
      },
      removeEpecifiqueOtroAdeudosPasivos: (state, action) => {
         delete state.validationSchema["EspecifiqueOtro"];
      }
   }
});
export const { addAdeudosPasivos, addCopropiedadAdeudos, removeCopropiedadAdeudos, addEpecifiqueOtroAdeudosPasivos, removeEpecifiqueOtroAdeudosPasivos } =
   AdeudosPasivosHoja14.actions;
export default AdeudosPasivosHoja14.reducer;
615165;
