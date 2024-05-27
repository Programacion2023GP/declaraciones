import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";

const AmbitoPublico = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de ambito público";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Ambitos públicos"];
    const urlData = "ambitospublicos";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El ambito público es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
     };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el ambito público"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
export default AmbitoPublico;