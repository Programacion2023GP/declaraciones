import { Error } from "../../toasts/toast";

export const loggerMiddleware = storeAPI => next => action => {
    // const route =window.location.hash.split("#")[1]
    // if(route.includes("dashboard/declaraciones")){
    //     if (!localStorage.getItem("id_SituacionPatrimonial")) {
    //             Error("Debes crear una declaración primero en el apartado declaraciones")
    //             window.location.hash = "dashboard/misdeclaraciones"
    //     }
    // }
    return next(action);
  };
  