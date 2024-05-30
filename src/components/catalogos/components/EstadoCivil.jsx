import { Text } from "../../Reusables/input/Input";
import * as Yup from "yup";

const EstadoCivil = ({ formik, setId }) => {
   const table = true;
   const title = "Formulario de estado civil";
   const initialState = {
      val: ""
   };
   const headersDatable = ["Estados civiles"];
   const urlData = "estadoCivil";
   const dataHiddenDatable = ["id"];

   const validator = {
      val: Yup.string("El formato es texto").required("El estado civil es requerido")
   };

   const handleEdit = (row) => {
       formik.current.setFieldValue("val", row["text"]);
       setId(row.id);
   };

   // 
   const Form = () => {
      return (
         <>
            <Text col={12} name={"val"} label={"Escribe el estado civil"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default EstadoCivil;
