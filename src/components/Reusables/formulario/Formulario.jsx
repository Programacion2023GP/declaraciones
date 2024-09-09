import { Children, cloneElement, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CardForm } from "../../Reusables/cardform/CardForm";
import { Button } from "@mui/material";
import { PostAxios } from "../../../services/services";
import { Loader } from "../sppiner/Spinner";

export const Formulario = ({
  action,
  post,
  get,
  navigate,
  put,
  children,
  textButton,
  title,
  getData,
  modifiedValidations,
  submit,
  stepper,
  stepperText,
  stepperFunction,
}) => {
  const [formikKey, setFormikKey] = useState(0); // Agregar estado para la clave de reset
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({})
  );
  const [loader, setLoader] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Estado para almacenar los errores del formulario
  const [initialized, setInitialized] = useState(false); // Estado para rastrear si los datos han sido inicializados
  const [propsChildrens, setPropsChildrens] = useState([]);

  useEffect(() => {
    const initialValuesObj = {};
    const validationShape = {};
    const newArray = [];
    Children.forEach(children, (child, index) => {
      newArray.push({ component: child.type.name, props: child.props });
      // console.clear();
      // console.log("Child herres");
      const fieldName = child.props.name;
      const fieldValue = child.props.value ?? "";
      if (!child.props.exist) {
        initialValuesObj[fieldName] = fieldValue;
      }
      const component = child.type.name;
      let fieldValidation = Yup.string();

      // Si el campo no es opcional, se agrega la validación requerida
      if (!child.props.optional && !child.props.exist) {
        fieldValidation = fieldValidation.required(
          child.props.message ?? `${child.props.label} es requerido`
        );
        if (component == "Phone") {
          fieldValidation = fieldValidation.matches(
            /^\d{10}$/,
            `Debe tener 10 digitos el numero de telefono`
          );
        }
        if (component === "Email") {
          fieldValidation = fieldValidation.matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "El formato del correo electrónico no es válido"
          );
        }
        if (component === "Curp") {
          fieldValidation = fieldValidation.matches(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            "El formato del curp no es válido"
          );
        }
        if (component === "Rfc") {
          fieldValidation = fieldValidation.matches(
            /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
            "El formato del rfc no es válido"
          );
        }

        // Agregar validaciones adicionales si están presentes en props.validations
        if (child.props.validations) {
          const { min, max, regex } = child.props.validations;

          if (min) {
            fieldValidation = fieldValidation.min(
              min,
              `No cumple con el mínimo de ${min} caracteres`
            );
          }

          if (max) {
            fieldValidation = fieldValidation.max(
              max,
              `Supera la cantidad máxima de ${max} caracteres`
            );
          }

          if (regex) {
            fieldValidation = fieldValidation.matches(
              regex,
              `Formato incorrecto, debe coincidir con ${regex}`
            );
          }
        }
      } else {
        // Si el campo es opcional, no se agrega ninguna validación adicional
        fieldValidation = Yup.string();
      }

      validationShape[fieldName] = fieldValidation;
    });

    setPropsChildrens(newArray);
    setFormikKey((prevKey) => prevKey + 1);
    setInitialValues(initialValuesObj);
    console.warn("Mis validaciones", validationShape);
    setValidationSchema(Yup.object().shape(validationShape));

    setInitialized(true);
  }, [
    Children.count(children),
    // textButton,
    // stepper,
    // stepperText,
    // stepperFunction,
    // submit,
    // getData,
    // title,
  ]);
  const setValidationsParent = () => {};
  return (
    <>
      {loader && <Loader />}
      {initialized && ( // Renderizar Formik solo cuando los datos están inicializados
        <Formik
          key={formikKey} // Utilizar la clave de reset
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if ((action && post) || (action && get) || (action && put)) {
              if (action == "post") {
                setLoader(true);
                const response = await PostAxios(post, values);
                console.warn(response);
                response ? setLoader(false) : null;
                if (response.data.status_code == 200) {
                  window.location.hash = navigate;
                }
                if (response.data.result.user) {
                  const user = response.data.result.user;
                  for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                      localStorage.setItem(key, JSON.stringify(user[key]));
                    }
                  }
                }
              } else if (action == "get") {
              } else if (action == "put") {
              }
            } else {
              submit();
            }

            // Aquí puedes manejar la lógica de envío del formulario si es necesario
            // Por ejemplo, puedes llamar a una función para enviar los datos al servidor
            // y luego restablecer el estado del formulario
            setSubmitting(false);
          }}
          // Aquí actualizamos los errores del formulario
          // para poder acceder a ellos desde el exterior
          validate={(values) => {
            const fieldNames = Object.keys(validationSchema.fields);
            const fieldValidations = fieldNames.map(fieldName => {
              return validationSchema.fields[fieldName];
            });
            
            const es = validationSchema.concat(Yup.object().shape(fieldValidations));
            
            setValidationSchema(es);
            

            let newValidationSchema = Yup.object().shape({
              ...validationSchema.fields,
            });
            if (modifiedValidations) {
              let newValidationSchema = es;
            
              modifiedValidations.forEach(({ name, condition, label, action }) => {
                const value = values[name]; // Obtener el valor del campo
                const conditionString = condition.replace(name, value); // Sustituir el nombre del campo en la condición
            
                if (eval(conditionString)) {
            
                  if (action === "required") {
                    newValidationSchema = newValidationSchema.shape({
                      [name]: newValidationSchema.fields[name].concat(Yup.string().required(`${label} es requerido`)),
                    });
                  }
                }
              });
            
              setValidationSchema(newValidationSchema);
            }
            

            if (getData) {
              getData(values);
            }
            validationSchema
              .validate(values, { abortEarly: false })
              .then(() => {
                setFormErrors({});
              })
              .catch((validationErrors) => {
                const errors = {};
                validationErrors.inner.forEach((error) => {
                  errors[error.path] = error.message;
                });
                setFormErrors(errors);
              });
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
            <>
              <CardForm
                handleSubmit={handleSubmit}
                textButton={textButton}
                title={title}
                {...(stepper
                  ? {
                      stepper: stepper,
                      stepperText: stepperText,
                      stepperFunction: stepperFunction,
                    }
                  : {
                      stepper: null,
                      stepperText: null,
                      stepperFunction: null,
                    })}
              >
                {/* Contenido del CardForm */}

                {Children.map(children, (child, index) => {
                  if (child.props.exist) {
                    return null; // No clonar si la propiedad 'exist' está presente
                  }

                  return cloneElement(child, {
                    key: index,
                    value: values[child.props.name] ?? child.props.value,
                    onChange: setFieldValue,
                    onBlur: handleBlur,
                    errors,
                    touched,
                  });
                })}
              </CardForm>
            </>
          )}
        </Formik>
      )}
      {/* Aquí imprimimos los errores de validación */}
      {/* <pre>{JSON.stringify(formErrors, null, 2)}</pre> */}
    </>
  );
};
