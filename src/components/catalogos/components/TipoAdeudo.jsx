import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const TipoAdeudo = ({ formik, setId }) => {
   const table = true;
   const title = "Formulario de tipo de adeudo";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Tipos de adeudos"];
   const urlData = "tiposadeudos";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El tipo de adeudo es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el tipo de adeudo"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoAdeudo;
