import "../admin/AdminDashboard.css";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div id="adminHeader">
        <h4>Welcome to Admin Dashboard</h4>
      </div>
      <div id="adminContainer">
        <div id="adminMenu">
          <h5 className="menuTitle">Admin Menu</h5>
          <Link to="insertpro" className="menuLink">Insert Product</Link>
          <Link to="remove" className="menuLink">Remove Products</Link>
          <Link to="update" className="menuLink">Update Product</Link>
          <Link to="orders" className="menuLink">View Orders</Link>
        </div>
        <div id="adminContent">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
