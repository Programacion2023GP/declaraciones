//#region INPUT FILE (Drag&Drop)
//#region IMPORTS
import { FormControl, FormHelperText, TextField, Typography, Box, Grid } from "@mui/material";
// import { Box } from "@mui/system";
import propTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { Field, useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
//#endregion IMPORTS
import "./style.css";
import withReactContent from "sweetalert2-react-content";
import { Error, Info } from "../../../toasts/toast";
import Swal from "sweetalert2";

// #region ESTILOS
// /* CONTENEDOR DE IMAGENES */
// .dropzone-container {
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//    gap: 1rem;
//    width: 100%;
// }

// .dropzone {
//    border: 5px dashed #1455cb;
//    border-radius: 14px;
//    padding: 0.5rem;
//    text-align: center;
//    cursor: pointer;
//    width: 100%;
//    transition: all 0.3s ease-in-out;
// }
// .dropzone:hover {
//    border: 5px solid #1455cb;
//    background-color: #e9ecefb9;
// }

// .dropzone p {
//    font-size: 1rem;
// }

// .file-preview {
//    display: flex;
//    flex-wrap: wrap;
//    justify-content: center;
//    /* flex-direction: column; */
//    gap: 15px;
//    background-color: #e9ecef;
//    border-radius: 12px;
//    max-width: 100%;
//    overflow-x: auto;
//    /* margin-top: 5px; */
//    /* overflow-y: scroll; */
//    max-height: 350px;
// }
// .file-preview .preview-img {
//    max-width: 100px;
//    max-height: 100px;
//    object-fit: cover;
//    /* border: 1px solid #ddd; */
// }
// .file-preview .preview-pdf {
//    margin-top: 18px;
//    /* max-width: 100px;
//    max-height: 100px;
//    */
//    object-fit: cover;
//    /* border: 1px solid #ddd; */
// }

// .preview-item {
//    position: relative;
//    width: 95%; /150px;/
//    text-align: center;
// }

// .progress-bar {
//    width: 100%;
//    height: 10px;
//    background-color: #ddd;
// }

// .progress-bar-fill {
//    height: 100%;
//    background-color: #007bff;
// }

// .remove-button {
//    position: absolute;
//    width: 100%;
//    height: 100%;
//    top: 0%;
//    right: 0%;
//    background-color: transparent;
//    color: transparent; /* Color del icono de eliminar */
//    border: none;
//    border-radius: 12px;
//    font-weight: bolder;
//    cursor: pointer;
//    font-size: 20px;
//    transition: all 0.3s ease-in-out;
// }

// .remove-button:hover {
//    background-color: #777777a1; /* Color de fondo al pasar el ratón */
//    color: #e9ecef; /* Color del icono de eliminar al pasar el ratón */
// }

// .remove-pdf-button {
//    position: absolute;
//    width: 100%;
//    /* height: 100%; */
//    top: 0%;
//    right: 0%;
//    background-color: rgb(139, 19, 19);
//    color: whitesmoke; /* Color del icono de eliminar */
//    border: none;
//    border-radius: 12px 12px 0 0;
//    margin-bottom: 100px;
//    font-weight: bolder;
//    cursor: pointer;
//    font-size: 25px;
//    transition: all 0.3s ease-in-out;
// }
// /* CONTENEDOR DE IMAGENES */
// #endregion

export const setObjImg = (img, setImg) => {
   if (["", null, undefined].includes(img)) return setImg([]);
   // console.log("setObjImg --> ", img, " <--");
   const imgObj = {
      file: {
         name: `${img}`
      },
      dataURL: `${import.meta.env.VITE_HOST}/${img}`
   };
   setImg([imgObj]);
};

/**
  * const [imgFile, setImgFile] = useState([]);
  *
  * <FileInputComponent
       idName="img_path"
       label="Foto de la marca"
       filePreviews={imgFile}
       setFilePreviews={setImgFile}
       error={errors.img_path}
       touched={touched.img_path}
       multiple={false}
       accept={"image/*"}
    />
 *
 * ENVIAR (onSubmit) ----------> values.img_preview = imgFile.length == 0 ? "" : imgFile[0].file;
 * MODIFICAR (handleModify) ---> setObjImg(formData.img_preview, setImgFile);
 * RESET ----------------------> setImgFile([]);
 *
 */
//  ===================================== COMPONENTE =====================================
const MB = 1048576; //2621440=2.5MB
const mySwal = withReactContent(Swal);

export const SimpleDialogComponent = ({ open, onClose, onSelectFile, onSelectPhoto }) => {
   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle sx={{ textAlign: "center", pt: 1, pb: 0 }} variant="h5">
            Selecciona una opción
         </DialogTitle>
         <DialogActions>
            <Button onClick={onSelectFile} color="secondary" sx={{ flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
               <IconPhotoSearch /> Subir Archivo
            </Button>
            <Button onClick={onSelectPhoto} color="secondary" sx={{ flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
               <IconCameraUp /> Tomar Foto
            </Button>
            <Button onClick={onClose} color="inherit" sx={{ flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
               <IconBan /> Cancelar
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export const FileInputComponent = ({
   xsOffset = null,
   // loading = false,
   col,
   idName,
   label,
   helperText,
   disabled,
   hidden,
   marginBottom,
   color,
   // styleInput = 1,
   filePreviews,
   setFilePreviews,
   multiple,
   maxImages = -1,
   accept = null,
   fileSizeMax = 1, // en MB
   showBtnCamera = false,
   handleUploadingFile = null,
   showDialogFileOrPhoto = false,
   ...props
}) => {
   const formik = useFormikContext();
   const isError = formik.touched[idName] && formik.errors[idName];
   const [uploadProgress, setUploadProgress] = useState(0);
   const [messagePreview, setMessagePreview] = useState("Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos");
   // const [filePreviews, setFilePreviews] = useState([]);
   const [ttShow, setTtShow] = useState("");
   const [fileSizeExceeded, setFileSizeExceeded] = useState(fileSizeMax * MB);
   const [confirmRemove, setConfirmRemove] = useState(true);
   const [fileInfo, setFileInfo] = useState(null);

   const inputFileRefMobile = useRef(null);
   const [openCameraFile, setOpenCameraFile] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   const validationQuantityImages = () => {
      if (multiple) {
         if (maxImages != -1) {
            if (filePreviews.length >= maxImages) {
               console.log("maxImages", maxImages);
               Info(`Solo se permiten cargar ${maxImages} imagenes.`);
               return false;
            }
         }
      } else {
         if (filePreviews.length >= 1) {
            Info(`Solo se permite cargar una imagen.`);
            return false;
         }
      }
      return true;
   };

   const onDrop = useCallback(
      (acceptedFiles) => {
         if (!confirmRemove) return; // Solo permite la carga de archivos si la eliminación fue confirmada
         setConfirmRemove(false); // Resetear la confirmación después de la carga
         // else setConfirmRemove(true);

         setFilePreviews([]);
         // if (multiple) if (!validationQuantityImages()) return
         // Puedes manejar los archivos aceptados aquí y mostrar las vistas previas.

         if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach((file) => {
               // console.log("🚀 ~ acceptedFiles.forEach ~ file:", file);
               handleSetFile(file);
            });
         } else {
            console.log("No hay archivos en el acceptedFiles", acceptedFiles);
            Error("No hay archivos en el acceptedFiles");
         }
      },
      [confirmRemove, setFilePreviews]
   );
   const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
         reader.readAsDataURL(file);
      });
   };

   const imageCompress = async (file) => {
      return new Promise((resolve, reject) => {
         new Compressor(file, {
            quality: 0.6,
            convertSize: 2.5 * MB, // 3MB
            maxWidth: 1920,
            maxHeight: 1080,
            success(result) {
               // Convertir el Blob a un File
               const compressedFile = new File([result], file.name, {
                  type: result.type,
                  lastModified: Date.now()
               });

               resolve(compressedFile); // Resolver la promesa con el archivo comprimido
            },
            error(err) {
               reject(err); // Rechazar la promesa si ocurre un error
            }
         });
      });
   };

   const handleSetFile = async (file) => {
      // alert("entre al handleSetFile()");
      console.log("🚀 ~ handleSetFile ~ file:", file);

      if (file.size >= fileSizeExceeded) {
         console.log(1);
         if (filePreviews.length == 0) setConfirmRemove(true);
         return Info(`el archivo es demasiado pesado, intenta con un archivo menor a ${fileSizeMax}MB`);
      }
      if (!file) {
         console.log(2);

         if (filePreviews.length == 0) setConfirmRemove(true);
         return Info("el tipo de archivo no es una imagen.");
      }
      console.log(3);

      setMessagePreview("Archivo cargado");

      // alert("handleSetFile() ~ pase los filtros");

      try {
         // console.log("🚀 ~ handleSetFile ~ file:", file);
         let newFile = file;
         if (file.size > MB * 3) {
            const fileCompressed = await imageCompress(file);
            // console.log("🚀 ~ handleSetFile ~ fileCompressed:", fileCompressed);
            newFile = fileCompressed;
         }

         console.log("🚀 ~ handleSetFile ~ newFile:", newFile);
         const dataURL = await readFileAsDataURL(newFile);
         const preview = {
            file: newFile,
            dataURL
         };
         // console.log("🚀 ~ handleSetFile ~ preview:", preview);
         await setFilePreviews([preview]);
         filePreviews = [preview];
         if (handleUploadingFile) handleUploadingFile(filePreviews);
      } catch (error) {
         console.error("Error al leer el archivo:", error);
         Error(`Error al leer el archivo: ${error}`);
      }
   };

   const handleGetFileCamera = async (file) => {
      // alert("entre al handleGetFileCamera()");
      await setFilePreviews([]);
      setConfirmRemove(true);

      // if (!confirmRemove) return; // Solo permite la carga de archivos si la eliminación fue confirmada
      setConfirmRemove(false); // Resetear la confirmación después de la carga

      // alert("voy al handleSetFile(file)");
      handleSetFile(file);
   };
   const handleOnChangeFileInput = (e) => {
      // console.log("🚀 ~ handleOnChangeFileInput ~ e.target.files:", e.target.files);
      const file = e.target.files.length > 0 ? e.target.files[0] : null;
      // console.log("🚀 ~ handleOnChangeFileInput ~ file:", file);
      if (!file) return;
      // setFileInfo(file);
      // console.log("🚀 ~ handleOnChangeFileInput ~ fileInfo:", fileInfo);
      handleGetFileCamera(file);
   };

   const simulateUpload = () => {
      // Simulamos la carga con un temporizador.
      setTimeout(() => {
         const progress = uploadProgress + 10;
         setUploadProgress(progress);

         if (progress < 100) {
            // Si no se ha alcanzado el 100% de progreso, simulamos más carga.
            simulateUpload();
         } else {
            // Cuando se completa la carga, restablecemos el progreso.
            setUploadProgress(0);
         }
      }, 1000);
   };
   const handleRemoveImage = async (fileToRemove) => {
      if (disabled) return;
      // Filtra la lista de vistas previas para eliminar el archivo seleccionado.
      // console.log(filePreviews);
      // setFilePreviews((prevPreviews) => prevPreviews.filter((preview) => preview.file !== fileToRemove));
      mySwal.fire(QuestionAlertConfig(`¿Estas seguro de eliminar la imágen?, "CONFIRMAR`)).then(async (result) => {
         if (result.isConfirmed) {
            // formik.setValues(idName, null);
            // inputFileRefMobile.current.value = null;
            await setFilePreviews([]);
            setConfirmRemove(true); // Establecer la confirmación para permitir la carga de nuevos archivos
         }
      });
      // console.log(filePreviews);
   };

   const { getRootProps, getInputProps } = useDropzone({
      onDrop
   });

   const handleMouseEnter = () => {
      setTtShow("tt_show");
   };
   const handleMouseLeave = () => {
      setTtShow("");
   };

   const handleOpenDialog = () => {
      confirmRemove && setOpenDialog(true);
   };

   const handleCloseDialog = () => {
      setOpenDialog(false);
   };

   const handleSelectFile = async () => {
      await setOpenCameraFile(false);
      setOpenDialog(false);
      inputFileRefMobile.current.click();
   };

   const handleSelectPhoto = async () => {
      await setOpenCameraFile(true);
      setOpenDialog(false);
      inputFileRefMobile.current.click();
   };

   useEffect(() => {
      // console.log("🚀 ~ useEffect ~ filePreviews:", filePreviews);
      if (filePreviews.length == 0) setConfirmRemove(true);
      else setConfirmRemove(false);
   }, [idName, formik.values[idName]]);

   useEffect(()=>{},[messagePreview])

   const RenderFileComponent = ({ file }) => {
      console.log("🚀 ~ RenderFileComponent ~ filePreviews:", filePreviews);
      return (
         <div>
            <h3>Detalles del Archivo</h3>
            <p>
               <strong>Nombre:</strong> {file.name}
            </p>
            <p>
               <strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
            <p>
               <strong>Tipo:</strong> {file.type}
            </p>
            <br />
            <h3>filePreviews</h3>
            <strong>dataURL:</strong> {filePreviews[0].dataURL} <br />
            <strong>file.name:</strong> {filePreviews[0].file.name}
         </div>
      );
   };

   return (
      <>
         <Grid
            xs={12}
            xsOffset={xsOffset}
            md={col}
            sx={{ display: hidden ? "none" : "flex", flexDirection: "column", alignItems: "center", mb: marginBottom ? marginBottom : 2 }}
         >
            <FormControl fullWidth sx={{}}>
               <Typography variant="p" mb={1} sx={{ fontWeight: "bolder" }} htmlFor={idName} color={color}>
                  {label}
               </Typography>

               <Field name={idName} id={idName}>
                  {({ field, form }) => (
                     <>
                        <div className={"dropzone-container"} onClick={showDialogFileOrPhoto ? handleOpenDialog : undefined}>
                           <div {...getRootProps({ className: color === "red" ? "dropzone-error" : "dropzone" })}>
                              {showDialogFileOrPhoto ? (
                                 <input
                                    {...getInputProps()}
                                    onChange={confirmRemove ? handleOnChangeFileInput : undefined}
                                    type={confirmRemove ? "file" : "text"}
                                    ref={inputFileRefMobile}
                                    multiple={multiple}
                                    accept={accept}
                                    disabled={disabled}
                                    capture={openCameraFile && "environment"}
                                 />
                              ) : (
                                 <input
                                    {...getInputProps()}
                                    onChange={confirmRemove ? handleOnChangeFileInput : undefined}
                                    type={confirmRemove ? "file" : "text"}
                                    // ref={isMobile && showDialogFileOrPhoto ? inputFileRefMobile : null}
                                    multiple={multiple}
                                    accept={accept}
                                    disabled={disabled}
                                 />
                              )}

                              <p style={{ display: filePreviews.length > 0 ? "none" : "block", fontStyle: "italic" }}>{messagePreview}</p>

                              {/* Vista previa de la imagen o PDF */}
                              {/* <aside className={file-preview} style={{ paddingBlock: 5 }}>
                                  {filePreviews.map((preview) => (
                                     <div key={preview.file.name} className={"preview-item"}>
                                        {preview.file.name.includes(".pdf") || preview.file.name.includes(".PDF") ? (
                                           <>
                                              <embed
                                                 className={"preview-pdf"}
                                                 src={preview.dataURL}
                                                 type="application/pdf"
                                                 width="100%"
                                                 height="500px"
                                                 onMouseEnter={handleMouseEnter}
                                                 onMouseLeave={handleMouseLeave}
                                              />
                                              {preview.file.name !== "undefined" && (
                                                 <embed
                                                    className={tooltip_imagen `${ttShow}`}
                                                    src={preview.dataURL}
                                                    type="application/pdf"
                                                    width="50%"
                                                    height="80%"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                 />
                                              )}
                                              <div
                                                 className={"remove-pdf-button"}
                                                 onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemoveImage(preview.file);
                                                 }}
                                                 aria-disabled={disabled}
                                              >
                                                 {!disabled && "Eliminar"}
                                              </div>
                                           </>
                                        ) : (
                                           <>
                                              <img className={"preview-img"} src={preview.dataURL} alt={preview.file.name} />
                                              {preview.file.name !== "undefined" && (
                                                 <img
                                                    width={"50%"}
                                                    src={preview.dataURL}
                                                    alt={preview.file.name}
                                                    srcSet=""
                                                    className={tooltip_imagen `${ttShow}`}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                 />
                                              )}
                                              <div
                                                 className={"remove-button"}
                                                 onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemoveImage(preview.file);
                                                 }}
                                                 onMouseEnter={handleMouseEnter}
                                                 onMouseLeave={handleMouseLeave}
                                              >
                                                 {!disabled && "Eliminar"}
                                              </div>
                                           </>
                                        )}
                                     </div>
                                  ))}
                               </aside> */}
                           </div>
                           <small style={{ marginTop: "-10px", fontStyle: "italic", fontSize: "11px", textAlign: "center" }}>
                              Tamaño maximo del archivo soportado: <b>{fileSizeMax}MB MAX.</b>
                              {!disabled && showBtnCamera && <InputCameraComponent getFile={handleGetFileCamera} />}
                              {/* {fileInfo && filePreviews.length > 0 && <RenderFileComponent file={fileInfo} />} */}
                           </small>
                        </div>
                        <Typography variant="body1" component="label" htmlFor={idName} ml={1}>
                           {isError ? formik.errors[idName] : helperText}
                        </Typography>
                     </>
                  )}
               </Field>
            </FormControl>
         </Grid>

         {/* {isMobile && showDialogFileOrPhoto && (
             <SimpleDialogComponent open={openDialog} onClose={handleCloseDialog} onSelectFile={handleSelectFile} onSelectPhoto={handleSelectPhoto} />
          )} */}
      </>
   );
};

FileInputComponent.propTypes = {
   idName: propTypes.string.isRequired,
   label: propTypes.string.isRequired,
   inputProps: propTypes.object,
   // filePreviews: propTypes.any.isRequired,
   // setFilePreviews: propTypes.func.isRequired,
   error: propTypes.any,
   touched: propTypes.any,
   multiple: propTypes.bool,
   maxImages: propTypes.number
};
//#endregion INPUT FILE (Drag&Drop)
