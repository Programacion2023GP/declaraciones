import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const TipoInstrumento = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de tipo de instrumento";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Tipos de instrumentos"];
   const urlData = "tipoinstrumento";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El tipo de instrumento es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el tipo de instrumento"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoInstrumento;
