export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action); 
  const { status, idRol,location } = storeAPI.getState().Auth;
    console.log(status,location);
   if (status=="login" && location=="/") {
      switch (idRol) {
        case 1:
          window.location.hash = "/dashboard/declaraciones";

          break;
          
          case 2:
            window.location.hash = "/dashboard/declaraciones";

          break;
          case 3:
            window.location.hash = "/dashboard/declaraciones";
          break;
          case 4:
          break;
          case 5:
          break;
      }
   if(status=="logout"){
             window.location.hash = "/";

   }

   return result; 
};
}