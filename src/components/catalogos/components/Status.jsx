import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";

const Status = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de estatus civil";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Estatus"];
    const urlData = "estatus";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El estatus es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el estatus"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
 export default Status;