import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import Loading from "../../Reusables/loading/Loading";
const AereaAdscripcion = ({ formik, setId, peticiones }) => {
   const table = true;
   const { organismo } = peticiones;
   const title = "Formulario de aerea de adscripción";
   const initialState = {
      nombre: ""
   };
   const headersDatable = ["Aereas de adscripción", "Organismo"];
   const urlData = "adscripcion";
   const dataHiddenDatable = ["id"];

   const validator = {
      nombre: Yup.string("El formato es texto").required("El aerea de adscripción es requerido"),
      organismo: Yup.string("El formato es texto").required("El organismo es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("organismo", row["organismo"]);

      formik.current.setFieldValue("nombre", row["text"]);
      setId(row.id);
   };

   const Form = () => {
    
      return (
         <>
            <Ngif condition={organismo.length > 0}>
               <AutoComplete col={12} name={"organismo"} label={"Dependencia"} options={organismo} />
               <Text col={12} name={"nombre"} label={"Escribe el aerea de adscripción"} />{" "}
            </Ngif>

            <Ngif condition={organismo.length < 1}>
               <Loading />
            </Ngif>
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default AereaAdscripcion;
