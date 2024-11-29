import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
import { FaShoppingCart } from "react-icons/fa"; // For shopping cart icon

const KidsCollection = () => {
  const [mydata, setMydata] = useState([]);
  const [cartoonVisible, setCartoonVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from the API
  const loadData = async () => {
    try {
      const api = "http://localhost:3000/kids";
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    loadData();

    // Toggle cartoon visibility every 2 seconds
    const interval = setInterval(() => {
      setCartoonVisible((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Add to cart handler
  const cartDataAdd = (id, name, price, categ, desc, myimg) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        category: categ,
        description: desc,
        image: myimg,
        qnty: 1,
      })
    );
  };

  // Dynamic rendering of product cards
  const ans = mydata.map((item) => (
    <Card
      key={item.id}
      style={{
        maxWidth: "280px",
        margin: "20px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ffeb3b, #ff4081)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Card.Img
        variant="top"
        src={item.image}
        alt={`${item.name} for kids`}
        style={{
          height: "250px",
          objectFit: "cover",
          borderRadius: "20px 20px 0 0",
          cursor: "pointer",
          animation: "fadeIn 1s ease-in-out",
        }}
        onClick={() => navigate(`/prodetail/${item.id}`)}
      />
      <Card.Body
        style={{
          textAlign: "center",
          padding: "15px",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Card.Title
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {item.name} for {item.category}
        </Card.Title>
        <Card.Text
          style={{
            fontSize: "1rem",
            color: "#fff",
            marginBottom: "15px",
          }}
        >
          {item.description}
          <br />
          <span
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#ffeb3b",
            }}
          >
            ₹{item.price}/-
          </span>
        </Card.Text>
        <Button
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4081",
            border: "none",
            borderRadius: "30px",
            fontSize: "1.1rem",
            color: "#fff",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onClick={() =>
            cartDataAdd(
              item.id,
              item.name,
              item.price,
              item.category,
              item.description,
              item.image
            )
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff3366";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff4081";
          }}
        >
          <FaShoppingCart /> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffcc00, #ff3366)",
        overflow: "hidden",
        padding: "50px",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.2rem",
          fontWeight: "bold",
          color: "#fff",
          fontFamily: "Baloo, cursive",
          marginBottom: "40px",
        }}
      >
        Kids Collection
      </h1>

      {/* Cartoon Image */}
      {cartoonVisible && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            right: "10%",
            animation: "bounce 1s infinite",
          }}
        >
          <img
            src="https://www.shutterstock.com/image-vector/doraemon-cute-hand-drawn-illustration-600nw-2352837563.jpg"
            alt="Cartoon"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        {ans}
      </div>
    </div>
  );
};

export default KidsCollection;
