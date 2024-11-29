import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";

const WomenCollection = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to load data from API
  const loadData = async () => {
    try {
      const api = "http://localhost:3000/women";
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to handle Add to Cart
  const cartDataAdd = (id, name, price, categ, desc, myimg) => {
    dispatch(
      addToCart({
        id: id,
        name: name,
        price: price,
        category: categ,
        description: desc,
        image: myimg,
        qnty: 1,
      })
    );
  };

  // Hover state for button
  const [buttonHover, setButtonHover] = useState(false);

  const ans = mydata.map((item) => (
    <Card
      key={item.id}
      style={{
        maxWidth: "320px",
        margin: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
        background: "linear-gradient(135deg, #ffe4e6, #ffccf2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
      }}
    >
      <Card.Img
        variant="top"
        src={item.image}
        alt={`${item.name} for women`}
        style={{
          height: "260px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/prodetail/${item.id}`)} // Navigate on image click
      />
      <Card.Body
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#5a005a",
        }}
      >
        <Card.Title
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            color: "#a000a0",
            marginBottom: "10px",
          }}
        >
          {item.name} for {item.category}
        </Card.Title>
        <Card.Text
          style={{
            fontSize: "1rem",
            color: "#7b007b",
            marginBottom: "15px",
          }}
        >
          {item.description}
          <br />
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff69b4",
            }}
          >
            Price: ₹{item.price}/-
          </span>
        </Card.Text>
        <Button
          variant="light"
          style={{
            padding: "10px 25px",
            backgroundColor: buttonHover ? "#ff66a3" : "#ff99cc",
            border: "none",
            borderRadius: "25px",
            fontSize: "1rem",
            color: "#fff",
            fontWeight: "bold",
            boxShadow: buttonHover
              ? "0 5px 15px rgba(255, 102, 163, 0.6)"
              : "none",
            transition: "all 0.3s ease",
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
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          color: "#ff1493",
          fontFamily: "'Dancing Script', cursive",
          marginBottom: "50px",
          fontWeight: "bold",
        }}
      >
        Women’s Collection
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "30px",
          background: "linear-gradient(135deg, #fff0f5, #ffe4e6)",
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(255, 105, 180, 0.2)",
        }}
      >
        {ans}
      </div>
    </>
  );
};

export default WomenCollection;
