import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const TipoBienEnajenado = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de tipo enajenado";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Tipos de enajenados"];
   const urlData = "bienenajenacion";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El tipo enajenado es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el tipo enajenado"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoBienEnajenado;
