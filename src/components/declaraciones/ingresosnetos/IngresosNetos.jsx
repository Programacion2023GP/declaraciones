import { FormikInitialValues } from "./components/FormikInitialValues";
import { FormikIngresosNetos } from "./formik/FormikIngresosNetos";

export const IngresosNetos = ({ next, previous, title }) => {
   return (
      <>
         <FormikIngresosNetos title={title}>
            <FormikInitialValues />
         </FormikIngresosNetos>
      </>
   );
};
