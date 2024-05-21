import { PostAxios } from "../../../services/services";
import { Error, Success } from "../../../toasts/toast";
const asignarIdSituacionPatrimonial = (obj) => {
   const idSituacionPatrimonial = parseInt(localStorage.getItem("id_SituacionPatrimonial"));
   console.log(idSituacionPatrimonial);
   // Verifica si el objeto ya tiene la propiedad 'Id_SituacionPatrimonial'
   if (obj.hasOwnProperty("Id_SituacionPatrimonial")) {
      // Si 'Id_SituacionPatrimonial' es nulo o diferente del valor en localStorage, actualiza el valor
      if (obj.Id_SituacionPatrimonial === null || obj.Id_SituacionPatrimonial !== idSituacionPatrimonial) {
         return { ...obj, Id_SituacionPatrimonial: idSituacionPatrimonial };
      }
   } else {
      // Si la propiedad no existe, añade la propiedad con el valor de localStorage
      return { ...obj, Id_SituacionPatrimonial: idSituacionPatrimonial };
   }
   // Devuelve el objeto original si no hubo cambios
   return obj;
};

export const Post = async (url, values, next = null) => {
   try {
      // Verificar si values es un objeto o un array de objetos
      let updatedValues;
      // Verificar si values es un objeto o un array de objetos
      if (Array.isArray(values)) {
         // Si es un array, iterar sobre cada objeto y asignar el Id_SituacionPatrimonial
         updatedValues = values.map((item) => {
            if (typeof item === "object" && item !== null) {
               return asignarIdSituacionPatrimonial(item);
            }
            return item;
         });
      } else if (typeof values === "object" && values !== null) {
         // Si es un objeto, asignar el Id_SituacionPatrimonial directamente
         updatedValues = asignarIdSituacionPatrimonial(values);
      }

      const response = await PostAxios(url, updatedValues);
      Success(response.data.message);
      next && next();
      // setInterval(()=>{
      //    next();

      // },3000)

      return response.data;
   } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
         Error(error.response.data.message);
      } else {
         Error("Ocurrio un error");
      }
   }
};
