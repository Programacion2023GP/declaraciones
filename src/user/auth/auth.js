import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   status: parseInt(localStorage.getItem("Id_User")) > 0 && parseInt(localStorage.getItem("Id_Role")) > 0 ? "login" : "logout",
   type: "",
   permissions: [],
   idUser: 0,
   idRol: 0,
   location: ""
};

export const Auth = createSlice({
   name: "Auth",
   initialState: initialState,
   reducers: {
      loginAuth: (state, action) => {
       
         state.idUser = parseInt(localStorage.getItem("Id_User"));
         state.idRol = parseInt(localStorage.getItem("Id_Role"));
         state.location = "/";
         if (state.idUser > 0 && state.idRol > 0) {

            switch (parseInt(localStorage.getItem("Id_Role"))) {
               case 1:
                  window.location.hash = "/dashboard/misdeclaraciones";

                  break;

               case 2:
                  window.location.hash = "/dashboard/misdeclaraciones";

                  break;
               case 3:
                  window.location.hash = "/dashboard/misdeclaraciones";
                  break;
               case 4:
                  break;
               case 5:
                  break;
            }
         }
      },

      logoutAuth: (state, action) => {
         localStorage.clear();
         state.idRol = 0;
         state.idUser = 0;
         state.status = "logout";
         state.location = "/";
      },
      locationAuth: (state, action) => {
         if (parseInt(localStorage.getItem("Id_User")) > 0 && parseInt(localStorage.getItem("Id_Role")) > 0) {
            state.status = "login";
         } else {
            state.status = "logout";
         }
         // console.log(window.location.hash.split("#")[1]);
         state.location = window.location.hash.split("#")[1];
      }
   }
});

export const { loginAuth, logoutAuth, locationAuth } = Auth.actions;

export default Auth.reducer;
