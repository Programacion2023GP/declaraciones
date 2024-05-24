import { element } from "prop-types";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../services/services";
import { Error } from "../../../toasts/toast";
import { Request } from "../../Reusables/request/Request";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import Usuarios from "../../usuarios/Usuarios";

export const Creacion = ({ catalogo, formik }) => {
   const [id, setId] = useState(0);
   useEffect(() => {}, [formik.current == undefined]);
   const methods = [
      { key: "estadocivil", instance: EstadoCivil },
      { key: "regimenmatrimonial", instance: RegimenMatrimonial },
      { key: "estatus", instance: Status },
      { key: "usuarios", instance: Usuarios },
      {
         key: "nuevo",
         instance: Nuevo
      }
   ];
   const foundMethod = methods.find((element) => element.key === catalogo);
   const { instance } = foundMethod;
   console.log(instance);
   const { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table } = instance({ formik, setId });
   const dataForm = initialState;
   const validationSchema = Yup.object().shape(validator);

   return {
      id,
      dataForm,
      validationSchema,
      handleEdit,
      Form,
      headersDatable,
      urlData,
      dataHiddenDatable,
      title,
      headersDatable,
      urlData,
      dataHiddenDatable,
      setId,
      table
   };
};

const EstadoCivil = ({ formik, setId }) => {
   const table = true;
   const title = "Registro de estado civil";
   const initialState = {
      val: ""
   };
   const headersDatable = ["Estado civil"];
   const urlData = "estadoCivil";
   const dataHiddenDatable = ["id"];

   const validator = {
      val: Yup.string("El formato es texto").required("El estado civil es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("val", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"val"} label={"Escribe el estado civil"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
const Nuevo = ({ formik, setId }) => {
   // que aparezca
   const table = true;
   // el titulo del formulario
   const title = "Registro de Nuevo";
   //que regresara el formulario
   const initialState = {
      nuevo: ""
   };
   //titulos de la tabla
   const headersDatable = ["Nuevo"];
   // url de post put delete y get
   const urlData = "estatus";
   //ocultar en la tabla
   const dataHiddenDatable = ["id"];
   // validaciones de los campos
   const validator = {
      nuevo: Yup.string("El formato es texto").required("El nuevo es requerido")
   };
   // editar la tablar
   const handleEdit = (row) => {
      formik.current.setFieldValue("nuevo", row["text"]);
      setId(row.id);
   };
   // formulario
   const Form = () => {
      return (
         <>
            <Text col={12} name={"nuevo"} label={"Escribe el nuevo"} />
         </>
      );
   };
   // retorno de todo el paquete
   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};

const Status = ({ formik, setId }) => {
   const table = true;

   const title = "Registro de estatus civil";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Estatus"];
   const urlData = "estatus";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El estatus es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el estatus "} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
// FALTA COREGIRLO
const RegimenMatrimonial = ({ formik, setAction }) => {
   const table = true;

   const title = "Registro de regimen matrimonial";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Regimen matrimonial"];
   const urlData = "regimenes";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El regimen es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setAction(false);
   };

   const handleDelete = (row) => {};
   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el regimen matrimonial es requerido"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, handleDelete, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
//ES LA CREACION DE LOS USUARIOS NO ES DEL APARTADO CATALOGOS//
