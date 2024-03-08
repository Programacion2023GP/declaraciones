import { cloneElement, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CardForm } from "../../Reusables/cardform/CardForm";
import { Input } from "../../Reusables/input/Input";
import { Formulario } from "../../Reusables/formulario/Formulario";

export const DatosGenerales = () => {
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({})
  );
  const [initialValues, setInitialValues] = useState({});
  return (
    <>
      <Formulario textbutton={"registrar"}>
        <Input col={4} label="nombre" name="nombre" value={"d"} />
        {/* <Input col={4} label="age" name="age" value={"ss"} /> */}

        {/* <Input col={4} label="nombre" name="nombre" value={"d"} /> */}
      </Formulario>
    </>
  );
};

{
  /* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Tu lógica de envío de datos aquí
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
          <CardForm handleSubmit={handleSubmit} textbutton={"Registrar"}>
            <Input
              dataForm={initialValues}
              initialValues={setInitialValues}
              handleBlur={handleBlur}
              validator={setValidationSchema}
              col={4}
              label="Nombre"
              name="nombre"
              onChange={setFieldValue}
              value={values.nombre}
              errors={errors}
              touched={touched}
            />
            <Input
              dataForm={initialValues}
              initialValues={setInitialValues}
              handleBlur={handleBlur}
              validator={setValidationSchema}
              col={4}
              label="apellido"
              name="apellido"
              onChange={setFieldValue}
              value={values.apellido}
              errors={errors}
              touched={touched}
            />
          </CardForm>
        )}
      </Formik> */
}
