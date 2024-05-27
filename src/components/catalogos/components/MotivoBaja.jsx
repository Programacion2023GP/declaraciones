import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";

const MotivoBaja = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de motivo de baja";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Motivos de baja"];
    const urlData = "motivobaja";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El motivo de baja es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
     };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el motivo de baja"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
export default MotivoBaja;