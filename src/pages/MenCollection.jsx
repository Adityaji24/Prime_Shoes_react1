import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';

const MenCollection = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Function to load data from API
  const loadData = async () => {
    try {
      const api = "http://localhost:3000/men";
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
    <Card key={item.id} style={{
      maxWidth: '300px',
      margin: '20px',
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      background: 'linear-gradient(135deg, #003366, #001f3d)', // Navy blue gradient
      transition: 'transform 0.3s ease',
    }}>
      <Card.Img
        variant="top"
        src={item.image}
        alt={`${item.name} for men`}
        style={{
          height: '250px',
          objectFit: 'cover',
          borderRadius: '12px',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/prodetail/${item.id}`)} // Navigate on image click
      />
      <Card.Body style={{
        textAlign: 'center',
        padding: '20px',
        color: '#f0f0f0',
      }}>
        <Card.Title style={{
          fontSize: '1.3rem',
          color: '#fff', // White for title text for contrast
          fontWeight: 'bold',
          marginBottom: '10px',
        }}>
          {item.name} for {item.category}
        </Card.Title>
        <Card.Text style={{
          fontSize: '1rem',
          color: '#e0e0e0', // Slightly faded text for description
          marginBottom: '15px',
        }}>
          {item.description}
          <br />
          <span style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#00bfff', // Light blue to highlight price
          }}>
            Price: ₹{item.price}/-
          </span>
        </Card.Text>
        <Button
          variant="light"
          style={{
            padding: '10px 20px',
            backgroundColor: buttonHover ? '#004d75' : '#1e3a5f', // Change color on hover
            border: 'none',
            borderRadius: '20px',
            fontSize: '1rem',
            color: '#fff',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
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
          onMouseEnter={() => setButtonHover(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setButtonHover(false)} // Set hover state to false on mouse leave
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        color: 'navy', // Light blue for title
        fontFamily: 'Arial, sans-serif',
        marginBottom: '40px',
        fontWeight: 'bold',
      }}>
        Men Collection
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px',
        background: 'linear-gradient(135deg, #003366,lightblue)', // Navy blue gradient for background
        borderRadius: '20px',
      }}>
        {ans}
      </div>
    </>
  );
};

export default MenCollection;
