import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [mydata, setMydata] = useState(null);
  const [error, setError] = useState(false); // Added error state
  const dispatch = useDispatch();

  // Function to fetch product data
  const loadData = async () => {
    try {
      const api1 = `http://localhost:3000/men/${id}`;
      const api2 = `http://localhost:3000/shopping/${id}`;
      const api3 = `http://localhost:3000/women/${id}`;
      const api4 = `http://localhost:3000/kids/${id}`;
      

      const response = await Promise.any([
        axios.get(api1),
        axios.get(api2),
        axios.get(api3),
        axios.get(api4),
        
      ]);
      setMydata(response.data);
      setError(false); // Reset error state on success
    } catch (error) {
      console.error("Error loading product data:", error);
      setError(true); // Set error state on failure
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const cartDataAdd = (id, name, price, category, description, image) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        category,
        description,
        image,
        qnty: 1,
      })
    );
  };

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "red",
        }}
      >
        Failed to load product details. Please try again later.
      </div>
    );
  }

  if (!mydata) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#007bff",
        }}
      >
        Loading Product Details...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        background: "linear-gradient(to bottom, aliceblue, lightblue, cornflowerblue)",
        color: "#333",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#007bff",
        }}
      >
        Product Detail
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Product Image */}
        <div
          style={{
            flex: "1",
            textAlign: "center",
          }}
        >
          <img
            src={mydata.image}
            alt={mydata.name}
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        {/* Product Details */}
        <div
          style={{
            flex: "2",
            padding: "0 20px",
          }}
        >
          <h2
            style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#444" }}
          >
            {mydata.name}
          </h2>
          <p
            style={{ fontSize: "1rem", marginBottom: "20px", color: "#666" }}
          >
            {mydata.description}
          </p>
          <h4
            style={{
              fontSize: "1.5rem",
              marginBottom: "10px",
              color: "#28a745",
            }}
          >
            Price: ₹{mydata.price}
          </h4>
          <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
            Category:{" "}
            <span style={{ fontWeight: "bold" }}>{mydata.category}</span>
          </p>
          {mydata.type && (
            <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
              Stock: <span style={{ fontWeight: "bold" }}>{mydata.type}</span>
            </p>
          )}
          <Button
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={() => {
              cartDataAdd(
                mydata.id,
                mydata.name,
                mydata.price,
                mydata.category,
                mydata.description,
                mydata.image
              );
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
