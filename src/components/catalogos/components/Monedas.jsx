import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const Monedas = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de monedas";
    const initialState = {
       Divisa: ""
    };
    const headersDatable = ["Monedas"];
    const urlData = "monedas";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       Divisa: Yup.string("El formato es texto").required("La moneda es requerida")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("Divisa", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"Divisa"} label={"Escribe la moneda"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
export default Monedas;