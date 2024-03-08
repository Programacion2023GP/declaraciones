import { cloneElement, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CardForm } from "../../Reusables/cardform/CardForm";
import { Input } from "../../Reusables/input/Input";
export const Formulario = ({ children, textbutton }) => {
  console.log("propiedades", children.props);
  const { name, value, label } = children.props;

  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({})
  );
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    // Lógica que deseas ejecutar cuando cambie 'name' o 'value'
    console.log("Los props 'name' o 'value' han cambiado");
  }, [name, label, value]); //
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          handleBlur,
        }) => (
          <CardForm handleSubmit={handleSubmit} textbutton={textbutton}>
            {cloneElement(children, {
              value: values[name] ?? value,
              dataForm: initialValues,
              initialValues: setInitialValues,
              handleBlur,
              validator: setValidationSchema,
              setValidationSchema,
              onChange: setFieldValue,
              errors,
              touched,
            })}
          </CardForm>
        )}
      </Formik>
    </>
  );
};
