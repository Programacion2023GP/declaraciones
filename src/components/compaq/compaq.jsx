import * as Yup from "yup";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { Text } from "../Reusables/input/Input";
import { Box } from "@mui/material";
import { useRef } from "react";
import { CustomRadio } from "../Reusables/radiobutton/Radio";
import { AutoComplete } from "../Reusables/autocomplete/autocomplete";
import { Axios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";

const PageCompaq = () => {
    const formikRef = useRef(null);

    const initialValues = {
        codigoEmpleado: "",
        nombreE: "",
        apellidoP: "",
        apellidoM: "",
        Rfc: "",
        Curp: "",
        fechaAlta: "",
        departamento: "",
        puesto: "",
        Gender: "",
        organismo: "",
        Description: "",
        Title: "",
        Id_SituacionPatrimonial: 0,
        Date: ""
    };

    const validationSchema = Yup.object({
        codigoEmpleado: Yup.string().required("Número de nómina requerido"),
        nombreE: Yup.string().required("Nombre requerido"),
        apellidoP: Yup.string().required("Apellido paterno requerido"),
        fechaAlta: Yup.date()
            .required("Fecha de alta requerida")
            .max(new Date(), "No puede ser fecha futura"),
        departamento: Yup.string().required("Departamento requerido"),
        puesto: Yup.string().required("Puesto requerido"),
        Gender: Yup.string().required("Selecciona un sexo"),
        organismo: Yup.string().required("Dependencia requerida"),
    });

    const submit = async (values, { resetForm, setSubmitting }) => {
        try {
            setSubmitting(true); // Activa el loading y deshabilita el botón
            const response = await Axios.post(`compaq/create/`, values);
            Success(response.data.message);
            resetForm();
        } catch (error) {
            Error('Ocurrió un error');
        } finally {
            setSubmitting(false); // Restaura el estado del botón
        }
    };

    return (
        <div className="!min-h-screen !bg-gradient-to-br !from-blue-50 !to-indigo-100 !py-8 !px-4">
            <div className="!max-w-5xl !mx-auto">
                <div className="!bg-white !rounded-2xl !shadow-xl !overflow-hidden !border !border-gray-100">
                    <div className="!bg-gradient-to-r !from-indigo-600 !to-blue-600 !px-8 !py-6">
                        <h2 className="!text-2xl !font-bold !text-white !tracking-tight">
                            Registro de Empleado
                        </h2>
                        <p className="!text-indigo-100 !mt-1 !text-sm">
                            Complete todos los campos obligatorios
                        </p>
                    </div>

                    <FormikForm
                        ref={formikRef}
                        maxWidth={"100%"}
                        messageButton={"Registrar"}
                        title={""}
                        button
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        submit={submit}
                    >
                        <Text col={4} name="codigoEmpleado" label="Número de Nómina" />
                        <Text col={4} name="nombreE" label="Nombre" />
                        <Text col={4} name="apellidoP" label="Apellido Paterno" />
                        <Text col={4} name="apellidoM" label="Apellido Materno" />
                        <Text col={4} name="Rfc" label="RFC" />
                        <Text col={4} name="Curp" label="CURP" />
                        <Text col={4} name="fechaAlta" label="Fecha Alta" type="date" />
                        <Text col={4} name="departamento" label="Departamento" />
                        <Text col={4} name="puesto" label="Puesto" />

                        <CustomRadio
                            col={4}
                            title="Sexo"
                            name="Gender"
                            options={[
                                { value: "Masculino", label: "Masculino" },
                                { value: "Femenino", label: "Femenino" }
                            ]}
                        />

                        <AutoComplete
                            col={6}
                            name="organismo"
                            label="Dependencia"
                            options={[
                                { id: "Presidencia", text: "Presidencia" },
                                { id: "SIDEAPAAR", text: "SIDEAPAAR" },
                                { id: "SIDEAPA", text: "SIDEAPA" },
                                { id: "DIF", text: "DIF" },
                                { id: "EXPOFERIA", text: "EXPOFERIA" }
                            ]}
                        />

                        <Box width="100%" padding="1.5em" />
                    </FormikForm>
                </div>
            </div>
        </div>
    );
};

export default PageCompaq;