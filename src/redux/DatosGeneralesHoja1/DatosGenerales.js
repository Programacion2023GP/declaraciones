import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState ={
      Nombre: "",
      PrimerApellido: "",
      SegundoApellido: "",
      CorreoPersonal: "",
      Curp: "",
      Rfc: "",
      Homoclave: "",
      CorreoInstitucional: "",
      TelefonoCasa: "",
      TelefonoCelularPersonal: "",
      Id_EstadoCivil: 0,
      Id_RegimenMatrimonial: 0,
      Id_PaisNacimiento: 0,
      Id_Nacionalidad: 0,
      Aclaraciones: "",
      FueServidorPublicoAnioAnterior: 0,
}
const validationSchema={
  Nombre: Yup.string().required("El Nombre es obligatorio"),
      PrimerApellido: Yup.string().required("El Primer apellido es obligatorio"),
      // SegundoApellido: Yup.string().required("El Segundo apellido es obligatorio"),
      Curp: Yup.string()
         .required("El CURP es requerido")
         .matches(
            /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
            "El CURP no cumple el formato válido"
         )
         .length(18, "El CURP debe tener exactamente 18 caracteres"),

      Rfc: Yup.string()
         .required("El rfc es requerido")
         .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/, "El rfc no cumple el formato")
         .length(13, "El rfc debe contar con 13 caracteres"),

      Homoclave: Yup.string().required("La Homoclave es requerida").length(3, "La Homoclave debe tener exactamente 3 caracteres"),
      CorreoPersonal: Yup.string().email("El formato de correo es inválido").required("El correo es necesario"),
      // CorreoInstitucional: Yup.string().email("El formato de correo es inválido").required("El correo es necesario"),
      // TelefonoCasa: Yup.string().required("El telefono de casa es obligatorio"),
      // //  .matches(/^\d{12}$/, "El telefono de casa debe contar con 10 caracteres"),
      // TelefonoCelularPersonal: Yup.string().required("El telefono personal es obligatorio"),
      //  .matches(/^\d{12}$/, "El telefono personal debe contar con 10 caracteres"),
      Id_EstadoCivil: Yup.number().required("El estadoCivil es obligatorio").min(1, "El estadoCivil es obligatorio"),
    //   Id_RegimenMatrimonial: !activeRegimen ? Yup.number().required("El régimen matrimonial es obligatorio").min(1, "El estadoCivil es obligatorio") : Yup.number(),
      Id_PaisNacimiento: Yup.number().required("El Pais de nacimiento es obligatorio").min(1, "El Pais de nacimiento es obligatorio"),
      Id_Nacionalidad: Yup.number().required("La nacionalidad es obligatoria").min(1, "La nacionalidad es obligatoria"),
    }
    const data ={
        initialState,validationSchema
    }
    const servidorPublico ={
      FueServidorPublicoAnioAnterior: Yup.number().required("Selecciona una opcion")
    }
    const RegimenMatrimonial ={
 Id_RegimenMatrimonial:Yup.number().required("El régimen matrimonial es obligatorio").min(1, "El régimen matrimonial es obligatorio")
}
export const DatosGeneralesHoja1 = createSlice({
    name:"DatosGenerales",
    initialState:data,
    reducers:{
        addDatosGenerales:(state,action)=>{
            state.initialState = action.payload
        },
        addValidacioneServidorPublico:(state,action)=>{
            switch(action.payload.tipo){
                case "servidorPublico":
                    Object.assign(state.validationSchema,servidorPublico);
                break;
                case "RegimenMatrimonial":
                    Object.assign(state.validationSchema,RegimenMatrimonial);

                break;
                case "QuitarRegimenMatrimonial":
                    state.validationSchema = eliminarPropiedades(action.payload.validaciones,RegimenMatrimonial)
                break;
            }
         },
         foundLocalization:(state,action)=>{

         }

    },
})
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
export  const {addDatosGenerales,addValidacioneServidorPublico,foundLocalization} = DatosGeneralesHoja1.actions
export default DatosGeneralesHoja1.reducer