import { PostAxios } from "../../../services/services";
import { Error, Success } from "../../../toasts/toast";

export const Post = async (url, values, next = null) => {
   try {
      const response = await PostAxios(url, values);
      Success(response.data.message);
      next && next();
      // setInterval(()=>{
      //    next();

      // },3000)

      return response.data;
   } catch (error) {
      if (error.response?.data?.message) {
         Error(error.response.data.message);
      } else {
         Error("Ocurrio un error");
      }
   }
};
