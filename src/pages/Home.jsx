import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { Fade, Bounce } from "react-awesome-reveal";


import ban1 from "../images/b1.png";
import ban2 from "../images/b2.png";
import ban3 from "../images/b4.png";
import banner from "../images/b4.png"; // New banner image

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';

import "../css/home.css"; // Add custom styles

const Home = () => {
    const [mydata, setMydata] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadData = () => {
        let api = "http://localhost:3000/shopping";
        axios.get(api).then((res) => {
            setMydata(res.data);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const cartDataAdd = (id, name, price, categ, desc, myimg) => {
        dispatch(addToCart({ id, name, price, category: categ, description: desc, image: myimg, qnty: 1 }));
    };

    const goto_pro_detail = (id) => {
        navigate(`/prodetail/${id}`);
    };

    const ans = mydata.map((key) => {
        return (
            <Fade key={key.id}>
                <Card style={{ width: "390px", marginTop: "10px" }} className="custom-card">
                    <img 
                        src={key.image} 
                        style={{ height: "300px", cursor: 'pointer' }} 
                        alt={key.name} 
                        onClick={() => goto_pro_detail(key.id)} 
                    />
                    <Card.Body>
                        <Card.Title>{key.name} for {key.category}</Card.Title>
                        <Card.Text>
                            {key.description}
                            <br />
                            <span style={{ color: 'red', fontWeight: 'bold' }}>Price: {key.price}</span>
                        </Card.Text>
                        <Button 
                            className="add-to-cart-btn" 
                            onClick={() => cartDataAdd(key.id, key.name, key.price, key.category, key.description, key.image)}
                        >
                            Add to Cart
                        </Button>
                    </Card.Body>
                </Card>
            </Fade>
        );
    });

    return (
        <>
            {/* Carousel */}
            <Carousel>
                <Carousel.Item>
                    <img src={ban1} width="100%" height="500" alt="First slide" />
                    <Carousel.Caption>
                        <h3>Top Quality Shoes</h3>
                        <p>Get the latest collection of top Shoe making Brands</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ban2} width="100%" height="500" alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Reasonable Prices</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={ban3} width="100%" height="500" alt="Third slide" />
                    <Carousel.Caption>
                        <h3>Fast Delivery</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Cards Section */}
            <h1>New Arrival</h1>
            <div id="cardData">
                {ans}
            </div>

            {/* Latest Discounts */}
            <div 
                style={{
                    background: "linear-gradient(135deg, red, black)",
                    padding: '15px',
                    textAlign: 'center',
                    margin: '20px 0',
                    borderRadius: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: "whitesmoke"
                }}
            >
                🎉 Latest Discounts: Up to 50% off on Top Fashion Shoe Brands! 🛒
            </div>

            {/* Image Section */}
            <div 
                style={{
                    position: 'relative',
                    marginTop: '20px',
                }}
            >
                <img 
                    src={banner} 
                    alt="Discount Banner" 
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />
                <div 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'black',
                        backgroundColor: 'transparent',
                        padding: '20px',
                        fontFamily: "sans-serif",
                        borderRadius: '10px',
                    }}
                >
                    <Bounce>
                        <h2>Discount on Top Shoe Brands</h2>
                    </Bounce>
                    <Button 
                        style={{
                            backgroundColor: '#ff5722',
                            border: 'none',
                            padding: '10px 20px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#e64a19';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#ff5722';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Shop Now
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <footer 
                style={{
                    backgroundColor: '#343a40',
                    color: 'white',
                    padding: '20px 0',
                    textAlign: 'center',
                    marginTop: '20px',
                }}
            >
                <h4>Top Brands</h4>
                <p>Nike | Adidas | Puma | Reebok | Bata | Woodland and many more top Shoe Brands at precised rates</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                    <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    
                </div>
                <p style={{ marginTop: '10px' }}>© 2024 Shoe Store. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Home;
