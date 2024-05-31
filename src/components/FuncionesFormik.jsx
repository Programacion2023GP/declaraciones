
export const insertFormik = (formik, data) => {
    const esNumero = (cadena) => !isNaN(parseFloat(cadena)) && isFinite(cadena);

    for (let key in data) {
       if (typeof data[key] === "string" && esNumero(data[key])) {
          if (data[key].includes(".")) {
             data[key] = parseFloat(data[key]);
          } else {
             data[key] = parseInt(data[key], 10);
          }
       }
    }
    formik.current.setValues(data);
 };