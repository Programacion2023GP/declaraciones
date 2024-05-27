import { Text } from "../../Reusables/input/Input";
import * as Yup from "yup";

const FormaPago = ({ formik, setId }) => {
   const table = true;
   const title = "Formulario de forma de pago";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Formas de pago"];
   const urlData = "formapago";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("La forma de pago es requerida")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe la forma de pago"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default FormaPago;
