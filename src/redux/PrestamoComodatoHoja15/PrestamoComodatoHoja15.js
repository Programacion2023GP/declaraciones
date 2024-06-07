import { createSlice } from "@reduxjs/toolkit";
import * as Yup from "yup";
const initialState = {
   Id_SituacionPatrimonial: parseInt(localStorage.getItem("id_SituacionPatrimonial")),
   TipoBien: 1,
   Id_TipoVehiculo: 0,
   Id_TipoInmueble: 0,
   EspecifiqueOtro: "",
   NumeroExterior: "",
   Calle: "",
   CodigoPostal: "",
   CiudadLocalidad: "",
   // Id_ActividadLaboral: 0,
   Marca: "",
   Modelo: "",
   Anio: "",
   NumeroSerieRegistro: "",
   V_Id_EntidadFederativa: 0,
   Id_MunicipioAlcaldia: 0,
   V_Id_Pais: 0,
   EstadoProvincia: "",
   V_EsEnMexico:1,
   Id_TipoDuenoTitular:1,
   NombreTitular:"",
   RfcTitular:"",
   Id_Relacion:0,
   Aclaraciones:"",


};
const validationSchema = {
   TipoBien: Yup.number("El formato es numerico").required("El tipo de bien es requerido"),

//agregandose vehiculo desde el inicio
   Id_TipoVehiculo: Yup.string("El formato es texto").required("El tipo de vehiculo es requerido"),
   Marca: Yup.string("El formato es texto").required("La marca es requerida"),
   Modelo: Yup.string("El formato es texto").required("El modelo es requerido"),
   Anio: Yup.number("El formato es numerico").min(1900,"El año es requerido").required("El año es requerido"),
   NumeroSerieRegistro: Yup.string("El formato es texto").required("El numero de serie de registro es requerido"),
   Id_TipoDuenoTitular:Yup.number("El formato es numerico").required("El dueño o titular es requerido"),

   NombreTitular:Yup.string("El formato es texto").required("El nombre del titular es requerido"),
   RfcTitular: Yup.string()
   .required("El rfc es requerido")
   .matches(/^[A-ZÑ&]{3,4}\d{6}?$/, "El rfc no cumple el formato")
   .length(10, "El rfc debe contar con 10 caracteres"),
   Id_Relacion:Yup.number("el formato es numerico").min(1,"La relacion es requerida").required("La relacion es requerida"),
};
const inmueble = {
   Id_TipoInmueble: Yup.string("El formato es texto").required("El tipo de Inmueble es requerido"),
   V_EsEnMexico: Yup.number("Debe ser numerico").required("Es requerido que selecione una opcion"),
   NumeroExterior: Yup.number("Debe ser numerico").required("El numero exterior es requerido").min(1, "El numero exterior debe ser mayor a 0"),
   Calle: Yup.string().required("La calle es requerida"),
   CodigoPostal: Yup.string()
      .matches(/^\d{5}$/, "El código postal debe tener exactamente 5 caracteres numéricos")
      .required("El código postal es requerido"),
   CiudadLocalidad: Yup.string().required("La colonia localidad es requerida"),
};
const vehiculo = {
   Id_TipoVehiculo: Yup.string("El formato es texto").required("El tipo de vehiculo es requerido"),
   Marca: Yup.string("El formato es texto").required("La marca es requerida"),
   Modelo: Yup.string("El formato es texto").required("El modelo es requerido"),
   Anio: Yup.number("El formato es numerico").min(1900,"El año es requerido").required("El año es requerido"),
   NumeroSerieRegistro: Yup.string("El formato es texto").required("El numero de serie de registro es requerido"),
   Id_TipoDuenoTitular:Yup.number("El formato es numerico").required("El dueño o titular es requerido"),

   NombreTitular:Yup.string("El formato es texto").required("El nombre del titular es requerido"),
   RfcTitular: Yup.string()
   .required("El rfc es requerido")
   .matches(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/, "El rfc no cumple el formato")
   .length(13, "El rfc debe contar con 13 caracteres"),
   Id_Relacion:Yup.number("el formato es numerico").min(1,"La relacion es requerida").required("La relacion es requerida"),

};
const otro = {
   EspecifiqueOtro: Yup.string("El formato es texto").required("El especificar es requerido")
};

const data = {
   initialState: initialState,
   validationSchema: validationSchema,
   datas: []
};

const mexico = {
   Id_EntidadFederativa: Yup.number("Debe ser numerico").required("La entidad federativa es obligatoria").min(1, "La entidad federativa es obligatoria"),
   Id_MunicipioAlcaldia: Yup.number("Debe ser numerico").required("El municipio / alcadia es obligatoria").min(1, "El municipio / alcadia es obligatoria")
};
const extranjero = {
   V_Id_Pais: Yup.number().required("El Pais es obligatorio").min(1, "El Pais es obligatorio"),
   EstadoProvincia: Yup.string().required("El estado / provincia es obligatorio").max(80, "El limite son 80 caracteres")
};

export const PrestamoComodatoHoja15 = createSlice({
   name: "PrestamoComodato",
   initialState: data,
   reducers: {
      addPrestamos: (state, action) => {
         state.datas.push(action.payload)
         // Object.assign(state.initialState, action.payload);
         // state.initialState.Id_SituacionPatrimonial =parseInt(localStorage.getItem("id_SituacionPatrimonial"));
      },
      addOtroPrestamo:(state,action)=>{
        Object.assign(state.validationSchema, otro);

      },
      eliminarOtroPrestamo:(state,action)=>{
        delete state.validationSchema["EspecifiqueOtro"];

      },
      addVehiculosPrestamos: (state, action) => {
        delete state.validationSchema["Id_TipoInmueble"];
        delete state.validationSchema["V_EsEnMexico"];
        delete state.validationSchema["NumeroExterior"];
        delete state.validationSchema["Calle"];
        delete state.validationSchema["CodigoPostal"];
        delete state.validationSchema["CiudadLocalidad"];
        delete state.validationSchema["V_Id_EntidadFederativa"];
        delete state.validationSchema["Id_MunicipioAlcaldia"];
        // inmuebles
        delete state.validationSchema["V_Id_Pais"];
        delete state.validationSchema["EstadoProvincia"];
        // mexico
        delete state.validationSchema["V_Id_EntidadFederativa"];
        delete state.validationSchema["Id_MunicipioAlcaldia"];
        // extranjero


        Object.assign(state.validationSchema, vehiculo);

      },
      addInmueblesPrestamos: (state, action) => {
        delete state.validationSchema["Id_TipoVehiculo"];
        delete state.validationSchema["Marca"];
        delete state.validationSchema["Modelo"];
        delete state.validationSchema["Anio"];
        delete state.validationSchema["NumeroSerieRegistro"];
        delete state.validationSchema["NombreTitular"];
        delete state.validationSchema["RfcTitular"];
        delete state.validationSchema["Id_TipoDuenoTitular"];
        delete state.validationSchema["Id_Relacion"];

        // vehiculos

        Object.assign(state.validationSchema, inmueble);
        Object.assign(state.validationSchema, mexico);

      },
      addMexicoPrestamo: (state, action) => {
        delete state.validationSchema["V_Id_Pais"];
        delete state.validationSchema["EstadoProvincia"];
        Object.assign(state.validationSchema, mexico);

      },
      addExtranjeroPrestamo: (state, action) => {
        delete state.validationSchema["V_Id_EntidadFederativa"];
        delete state.validationSchema["Id_MunicipioAlcaldia"];
        Object.assign(state.validationSchema, extranjero);

      },

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

export const { addPrestamos, addVehiculosPrestamos,addInmueblesPrestamos,addMexicoPrestamo,addExtranjeroPrestamo,addOtroPrestamo,eliminarOtroPrestamo } = PrestamoComodatoHoja15.actions;
export default PrestamoComodatoHoja15.reducer;
