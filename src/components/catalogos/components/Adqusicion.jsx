import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const Adqusicion = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de adquisición";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Formas de adquisición"];
   const urlData = "formadquisicion";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("La adquisición es requerida")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe la adquisición"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default Adqusicion;
