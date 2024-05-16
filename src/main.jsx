import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import { SidebarProvider } from "./context/SidebarContext.jsx";
import { Provider } from "react-redux";
import store from "./user/userstore.js";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById("root")).render(
   <ThemeProvider>
      <Provider store={store}>
         <SidebarProvider>
            <App />
         </SidebarProvider>
      </Provider>
   </ThemeProvider>
);
