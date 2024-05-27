import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const RegimenMatrimonial = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de regimen matrimonial";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Regimenes matrimoniales"];
   const urlData = "regimenes";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El regimen es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
    };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el regimen matrimonial"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default RegimenMatrimonial;
