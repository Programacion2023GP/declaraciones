import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";

const TipoInversion = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de tipo de inversión";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Tipos de inversiones"];
   const urlData = "tipoinversion";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El tipo de inversión es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {

      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el tipo de inversión"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoInversion;
