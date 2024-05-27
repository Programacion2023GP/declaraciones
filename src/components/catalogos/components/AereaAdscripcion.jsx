import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const AereaAdscripcion = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de aerea de adscripción";
   const initialState = {
      nombre: ""
   };
   const headersDatable = ["Aereas de adscripción"];
   const urlData = "adscripcion";
   const dataHiddenDatable = ["id"];

   const validator = {
      nombre: Yup.string("El formato es texto").required("El aerea de adscripción es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("nombre", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"nombre"} label={"Escribe el aerea de adscripción"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default AereaAdscripcion;