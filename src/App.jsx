import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import KidsCollection from './pages/KidsCollection';
import MenCollection from "./pages/MenCollection";
import WomenCollection from "./pages/WomenCollection";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import CheckOut from "./pages/CheckOut";
import PaymentDone from "./pages/PaymentDone";
import AdminDashboard from "./admin/AdminDashboard";
import InsertProduct from "./admin/InsertProduct";
import ViewOrders from "./admin/ViewOrders";
import RemoveProduct from "./admin/RemoveProduct";
import UpdateProduct from "./admin/UpdateProduct";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/kids" element={<KidsCollection />} />
            <Route path="/menswear" element={<MenCollection />} />
            <Route path="/womenwear" element={<WomenCollection />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="prodetail/:id" element={<ProductDetail />} />
            <Route path="checkout/:amt" element={<CheckOut />} />
            <Route path="/paydone" element={<PaymentDone />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="insertpro" element={<InsertProduct />} />
              <Route path="orders" element={<ViewOrders />} />
              <Route path="remove" element={<RemoveProduct/>} />
              <Route path="update" element={<UpdateProduct/>} />
              
              

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
 