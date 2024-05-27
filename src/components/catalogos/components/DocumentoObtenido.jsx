import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";

const DocumentoObtenido = ({ formik, setId }) => {
    const table = true;
    const title = "Formulario de documento obtenido";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Documentos obtenidos"];
    const urlData = "documentosbtenidos";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El documento obtenido es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el documento obtenido"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
export default DocumentoObtenido;