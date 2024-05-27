import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const RelacionDeclarante = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de relación con el declarante";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Relaciónes con los declarantes"];
   const urlData = "relacioncondeclarante";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El relación con el declarante es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el relación con el declarante"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};

export default RelacionDeclarante;
