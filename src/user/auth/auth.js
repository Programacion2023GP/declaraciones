import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   status: "logout",
   type: "",
   permissions: [],
   idUser: 0,
   idRol: 0,
   location:""
};

export const Auth = createSlice({
   name: "Auth",
   initialState: initialState,
   reducers: {
      loginAuth: (state, action) => {

         state.idUser = parseInt(localStorage.getItem("Id_User"));
         state.idRol =  parseInt(localStorage.getItem("Id_Role"));
         state.location = "/"
         if(state.idUser>0 && state.idRol>0){
            state.status ="login"
         }
      },
      
      logoutAuth: (state, action) => {
         localStorage.clear()
         state.idRol =0
         state.idUser =0
         state.status="logout"
         state.location = "/"


      },
      locationAuth:(state,action)=>{
         state.location = window.location.hash.split("#")[1]
      }
   }
});

export const { loginAuth, logoutAuth,locationAuth } = Auth.actions;

export default Auth.reducer;
