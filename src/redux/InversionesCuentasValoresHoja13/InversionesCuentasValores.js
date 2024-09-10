import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   Id_TipoInversion: 0,
   Id_Titular: 0,
   Id_SubtipoInversion: 0,
   //Fondo de inversion

   T_Id_TipoPersona: 0,
   T_NombreRazonSocial: "", //Nombre de la persona T hace referencia al tercero sus datos
   T_Rfc: "",

   NumeroCuentaContrato: "",
   Id_Pais: 153,
   InstitucionRazonSocial: "",
   RfcInstitucion: "",
   SaldoSituacionActual: "",
   Id_SaldoSituacionActual: 0, //Tipo de moneda
   Aclaraciones: ""
};
const validationSchema = {
   Id_TipoInversion: Yup.number("El formato es numerico").min(1, "El tipo de inversion es requerida").required("El tipo de inversion es requerida"),
   Id_Titular: Yup.number("El formato es numerico").min(1, "El titular es requerido").required("El titular es requerido"),
   Id_SubtipoInversion: Yup.number("El formato es numerico")
      .min(1, "El especificar el tipo de inversión es requerido")
      .required("El especificar el tipo de inversión es requerido"),
   NumeroCuentaContrato: Yup.number("El formato es numerico").min(1, "El numero de cuenta es requerido").required("El numero de cuenta es requerido"),
   InstitucionRazonSocial: Yup.string("El formato es texto").required("La institución o razón social es requerida"),
   Id_Pais: Yup.number("El formato es numerico").required("El pais es requerido"),
   RfcInstitucion: Yup.string()
      .required("El RFC de la institución es requerido")
      .matches(/^[A-ZÑ&]{3}$/, "El RFC debe tener exactamente 3 caracteres y cumplir el formato")
      .length(3, "El RFC debe contar con exactamente 3 caracteres"),
   SaldoSituacionActual: Yup.number("El formato es numerico").required("El saldo de la situación actual es requerida"),
   Id_SaldoSituacionActual: Yup.number("El formato es numerico").min(1, "El tipo de moneda es requerido").required("El tipo de moneda es requerido")
};
const copropiedad = {
   T_Rfc: Yup.string()
      .required("El rfc es requerido")
      .matches(/^[A-ZÑ&]{3,4}\d{6}?$/, "El rfc no cumple el formato")
      .length(10, "El rfc debe contar con 10 caracteres"),
   T_NombreRazonSocial: Yup.string("El formato es texto").required("El nombre del tercero o terceros es requerido"),
   T_Id_TipoPersona: Yup.number("El formato es numerico").min(1, "El tipo de persona es requerida").required("El tipo de persona es requerida")
};
const data = {
   initialState,
   validationSchema,
   datas: []
};
export const InversionesCuentasValoresHoja13 = createSlice({
   name: "InversionesCuentasValores",
   initialState: data,
   reducers: {
      addInversionesCuentasValores: (state, action) => {
         state.datas.push(action.payload);
      },
      addCopropiedadInversiones: (state, action) => {
         Object.assign(state.validationSchema, copropiedad);
      },
      removeCopropiedadInversiones: (state, action) => {
         delete state.validationSchema["T_Rfc"];
         delete state.validationSchema["T_NombreRazonSocial"];
         delete state.validationSchema["T_Id_TipoPersona"];
      }
   }
});

export const { addInversionesCuentasValores, addCopropiedadInversiones, removeCopropiedadInversiones } = InversionesCuentasValoresHoja13.actions;

export default InversionesCuentasValoresHoja13.reducer;
