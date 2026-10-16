import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Axios, GetAxios } from "../../services/services";
import { Success, Error } from "../../toasts/toast";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../user/auth/auth";
import Gomez from "../../assets/icons/logo-gpd.png";
import { Ngif } from "../Reusables/conditionals/Ngif";
import { Modal } from "../Reusables/table/DataTable";
import { Email } from "../Reusables/email/Email";
import { Password } from "../Reusables/password/Password";
import { ArrowForward } from "@mui/icons-material";

const Login = () => {
   const [loading, setLoading] = useState(false);
   const [loadingPost, setLoadingPost] = useState(false);
   const [openModal, setOpenModal] = useState(false);
   const [usuarios, setUsuarios] = useState([]);
   const [nomina, setNomina] = useState("");

   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      Email: Yup.string()
         .email("Formato de correo electrónico inválido")
         .required("El correo electrónico es obligatorio"),
      Password: Yup.string()
         .min(6, "Debe contener al menos 6 caracteres")
         .required("La contraseña es obligatoria"),
   });

   useEffect(() => {
      dispatch(loginAuth());
      const init = async () => {
         const response = await GetAxios("usuarios/index");
         if (response.length > 0) setUsuarios(response);
      };
      init();
      setLoading(true);
   }, []);

   const modalValidation = Yup.object().shape({
      Email: Yup.string().required("Debes seleccionar un correo"),
   });

   return (
      <Ngif condition={loading}>
         <div className="!min-h-screen !flex !items-center !justify-center !bg-gradient-to-br !from-[#9B2242] !via-[#651D32] !to-[#130D0E] !relative !overflow-hidden">

            {/* Fondo animado */}
            <div className="!absolute !inset-0 !bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03)_0%,transparent_70%)] !animate-pulse"></div>

            {/* Contenedor */}
            <div className="!flex !flex-col md:!flex-row !w-11/12 md:!w-4/5 !max-w-5xl !rounded-2xl !shadow-2xl !overflow-hidden !bg-white/10 !backdrop-blur-md !border !border-[#B8B6AF]/20 !relative !z-10">

               {/* Columna izquierda */}
               <div className="!w-full md:!w-1/2 !flex !flex-col !items-center !justify-center !p-8 !bg-white/90 !backdrop-blur-md">
                  <img src={Gomez} alt="Logo" className="!w-56 !mb-4 !animate-fade-in" />
                  <h1 className="!text-3xl !font-semibold !text-[#651D32] !mb-2">
                     Portal de Declaraciones
                  </h1>
                  <p className="!text-[#474C55] !mb-8">
                     Ingresa tus credenciales para acceder
                  </p>

                  <Formik
                     initialValues={{ Email: "", Password: "" }}
                     validationSchema={validationSchema}
                     onSubmit={async (values) => {
                        setLoadingPost(true);
                        try {
                           const formData = new FormData();
                           formData.append("Email", values.Email);
                           formData.append("Password", values.Password);
                           const response = await Axios.post("usuarios/login", formData, {
                              headers: { "Content-Type": "multipart/form-data" },
                           });
                           const user = response.data.data.result.user;
                           if (!user) {
                              Error(response.data.data.message);
                              return;
                           }
                           localStorage.setItem("Id_User", user.Id_User);
                           localStorage.setItem("Id_Role", user.Id_Role);
                           localStorage.setItem("Name", user.Name);
                           localStorage.setItem("PaternalSurname", user.PaternalSurname);
                           localStorage.setItem("MaternalSurname", user.MaternalSurname);
                           localStorage.setItem("Dependencia", user.Dependencia);

                           switch (parseInt(user.Id_Role)) {
                              case 1:
                              case 10:
                              case 11:
                              case 12:
                                 window.location.hash = "/dashboard/checador";
                                 break;
                              case 2:
                              case 3:
                                 window.location.hash = "/dashboard/misdeclaraciones";
                                 break;
                              case 4:
                                 window.location.hash = "/dashboard/usuarios";
                                 break;
                              default:
                                 console.error("Invalid role");
                           }
                        } catch (e) {
                           Error("Error al iniciar sesión");
                        } finally {
                           setLoadingPost(false);
                        }
                     }}
                  >
                     {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit} className="!w-full !space-y-5">
                           <Email
                              name="Email"
                              label="Correo electrónico"
                              value={values.Email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors}
                              touched={touched}
                              className="!border-[#B8B6AF] focus:!border-[#9B2242] !rounded-lg"
                           />
                           <Password
                              name="Password"
                              label="Contraseña"
                              value={values.Password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors}
                              touched={touched}
                              className="!border-[#B8B6AF] focus:!border-[#9B2242] !rounded-lg"
                           />

                           <button
                              type="submit"
                              disabled={loadingPost}
                              className="!w-full !bg-gradient-to-r !from-[#9B2242] !to-[#651D32] hover:!from-[#7e1f39] hover:!to-[#4d1829] !text-white !font-semibold !py-3 !rounded-lg !shadow-lg !transition-all !duration-300 !flex !items-center !justify-center !gap-2"
                           >
                              {loadingPost ? (
                                 <span className="!animate-pulse">Iniciando...</span>
                              ) : (
                                 <>
                                    Iniciar sesión <ArrowForward />
                                 </>
                              )}
                           </button>

                           <div className="!text-center">
                              <button
                                 type="button"
                                 onClick={() => setOpenModal(true)}
                                 className="!text-sm !text-[#9B2242] hover:!text-[#651D32] !transition-all !duration-200"
                              >
                                 ¿Olvidaste tu contraseña?
                              </button>
                           </div>
                        </form>
                     )}
                  </Formik>
               </div>

               {/* Columna derecha */}
               <div className="!hidden md:!flex !flex-col !justify-center !items-center !w-1/2 !bg-gradient-to-br !from-[#651D32] !to-[#130D0E] !text-white !relative !overflow-hidden">
                  <h1 className="!text-6xl !font-extrabold !mb-3 !tracking-widest !animate-bounce">
                     Declaraciones
                  </h1>
                  <p className="!text-lg !text-[#B8B6AF] !text-center !max-w-md !animate-fade-in-slow">
                     Transparencia, confianza y cumplimiento en un solo lugar.
                  </p>
                  <div className="!absolute !w-64 !h-64 !bg-white/10 !rounded-full !blur-3xl !animate-ping-slow !top-20 !left-10"></div>
                  <div className="!absolute !w-72 !h-72 !bg-white/5 !rounded-full !blur-2xl !animate-ping-slow !bottom-10 !right-10"></div>
               </div>
            </div>

            {/* Modal de recuperación de contraseña */}
            <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)}>
               <div className="!p-4">
                  <h2 className="!text-2xl !font-bold !mb-4 !text-[#474C55]">
                     Recuperar contraseña
                  </h2>

                  <Formik
                     initialValues={{ Email: "", NewPassword: "" }}
                     validationSchema={Yup.object().shape({
                        Email: Yup.string().required("Debes seleccionar un correo"),
                        NewPassword: Yup.string()
                           .min(6, "Debe contener al menos 6 caracteres")
                           .required("La nueva contraseña es obligatoria"),
                     })}
                     onSubmit={async (values, { setSubmitting,resetForm }) => {
                        try {
                         
                           await Axios.post("usuarios/updatePassword", {
                              Email: values.Email,
                              NewPassword: values.NewPassword,
                           });
                           Success("Se ha actualizado tu contraseña");
                           setOpenModal(false);
                        } catch (e) {
                           Error("Error al actualizar la contraseña");
                        } finally {
                           setSubmitting(false);
                           setNomina("")
                           resetForm()
                        }
                     }}
                  >
                     {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => {
                        const [loadingEmails, setLoadingEmails] =useState(false);
                        const [filteredUsers, setFilteredUsers] =useState([]);

                        // Simula carga al escribir número de nómina
                       useEffect(() => {
                           if (nomina.trim() === "") {
                              setFilteredUsers([]);
                              return;
                           }

                           setLoadingEmails(true);
                           const timeout = setTimeout(() => {
                              const results = usuarios.filter(
                                 (user) => user.Nomina === nomina
                              );
                              setFilteredUsers(results);
                              setLoadingEmails(false);
                           }, 800); // Simula 800ms de carga

                           return () => clearTimeout(timeout);
                        }, [nomina]);

                        return (
                           <form
                              onSubmit={handleSubmit}
                              className="!space-y-6 !p-6 !bg-white !rounded-xl !shadow-xl !border !border-gray-200"
                           >
                              {/* Campo para ingresar número de nómina */}
                              <input
                                 type="text"
                                 placeholder="Escribe tu número de nómina"
                                 value={nomina}
                                 onChange={(e) => setNomina(e.target.value)}
                                 className="!w-full !border !border-gray-300 !focus:border-[#9B2242] !rounded-lg !p-3 !transition-all !duration-200 !outline-none"
                              />

                              {/* Label descriptivo */}
                              <label className="!block !text-gray-600 !font-medium">
                                 Selecciona a cuál correo deseas cambiar la contraseña
                              </label>

                              {/* Select filtrado por número de nómina */}
                              {loadingEmails ? (
                                 <div className="!flex !justify-center !items-center !py-3">
                                    <div className="!animate-spin !h-6 !w-6 !border-4 !border-[#9B2242] !border-t-transparent !rounded-full"></div>
                                    <span className="!ml-2 !text-gray-500">Cargando correos...</span>
                                 </div>
                              ) : (
                                 <select
                                    name="Email"
                                    value={values.Email}
                                    onChange={handleChange}
                                    disabled={filteredUsers.length === 0}
                                    className="!w-full !border !border-gray-300 !focus:border-[#9B2242] !rounded-lg !p-3 !transition-all !duration-200 !outline-none"
                                 >
                                    <option value="">
                                       {filteredUsers.length === 0
                                          ? "No hay correos disponibles"
                                          : "Selecciona tu correo"}
                                    </option>
                                    {filteredUsers.map((user) => (
                                       <option key={user.Id_User} value={user.Email}>
                                          {user.Email}
                                       </option>
                                    ))}
                                 </select>
                              )}
                              {errors.Email && touched.Email && (
                                 <div className="!text-red-500 !text-sm">{errors.Email}</div>
                              )}

                              {/* Campo para la nueva contraseña */}
                              <input
                                 type="password"
                                 name="NewPassword"
                                 placeholder="Ingresa tu nueva contraseña"
                                 value={values.NewPassword}
                                 onChange={handleChange}
                                 className="!w-full !border !border-gray-300 !focus:border-[#9B2242] !rounded-lg !p-3 !transition-all !duration-200 !outline-none"
                              />
                              {errors.NewPassword && touched.NewPassword && (
                                 <div className="!text-red-500 !text-sm">{errors.NewPassword}</div>
                              )}

                              {/* Botón de envío */}
                              <button
                                 type="submit"
                                 disabled={isSubmitting}
                                 className="!w-full !bg-gradient-to-r !from-[#9B2242] !to-[#651D32] !hover:from-[#7e1f39] !hover:to-[#4d1829] !text-white !font-semibold !py-3 !rounded-lg !shadow-lg !transition-all !duration-300"
                              >
                                 {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
                              </button>
                           </form>
                        );
                     }}
                  </Formik>
               </div>
            </Modal>

         </div>
      </Ngif>
   );
};

export default Login;
