import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const InsertProduct = () => {
  const [input, setInput] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async () => {
    const api = 'http://localhost:3000/shopping';
    
    try {
      await axios.post(api, input);
      message.success('Product successfully saved!');
      navigate('/admin');  // Navigate to the admin page after submitting
    } catch (error) {
      console.error('Error saving product:', error);
      message.error('Failed to save the product. Please try again.');
    }
  };

  return (
    <div>
      <h1>Insert New Product</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={input.name}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Enter price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={input.price}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Enter description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={input.description}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Select Category</Form.Label>
          <select
            name="category"
            value={input.category}
            onChange={handleInput}
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Enter Image Path</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={input.image}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Select Product Type</Form.Label>
          <select
            name="type"
            value={input.type}
            onChange={handleInput}
          >
            <option value="">Select Type</option>
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default InsertProduct;
