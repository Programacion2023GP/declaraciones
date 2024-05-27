import { Text } from "../../Reusables/input/Input";
import * as Yup from "yup";
const NivelEstudios = ({ formik, setId }) => {
    const table = true;
    const title = "Formulario de nivel de estudios";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Niveles de estudio"];
    const urlData = "nivelestudios";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El nivel de estudios es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el nivel de estudios"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default NivelEstudios;