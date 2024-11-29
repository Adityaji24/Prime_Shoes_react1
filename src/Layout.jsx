import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Topmenu from "./components/Topmenu";
import Home from "./pages/Home";
const Layout=()=>{
    return(
        <>
         <Topmenu/>
         
           <Outlet/>
           
         <Footer/>
        </>
    )
}

export default Layout;