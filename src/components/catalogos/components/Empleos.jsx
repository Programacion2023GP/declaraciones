import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import Loading from "../../Reusables/loading/Loading";
import { Ngif } from "../../Reusables/conditionals/Ngif";
const Empleos = ({ formik, setId, peticiones }) => {
   const { empleos } = peticiones;
   const table = true;

   const title = "Formulario de Empleos";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Aerea de adscripción", "Empleo"];
   const urlData = "empleos";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El Empleos es requerido"),
      organismo: Yup.string("El formato es texto").required("El organismo es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("organismo", row?.organismo);

      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Ngif condition={empleos.length > 0}>
               <AutoComplete
                  col={12}
                  name={"organismo"}
                  label={"Organismo"}
                  options={[
                     { id: "PR", text: "PR" },
                     { id: "DIF", text: "DIF" },
                     { id: "EXPOFERIA", text: "EXPOFERIA" }
                  ]}
               />

               <Text col={12} name={"valor"} label={"Escribe la Empleos"} />
            </Ngif>

            <Ngif condition={empleos.length < 1}>
               <Loading />
            </Ngif>
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default Empleos;
