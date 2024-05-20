export const loggerMiddleware = (storeAPI) => (next) => (action) => {
   const result = next(action);
   const { status, idRol, location } = storeAPI.getState().Auth;


   if (status == "logout") {
     window.location.hash = "/";
    
    }
    return result;
};
