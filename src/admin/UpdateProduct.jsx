import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [input, setInput] = useState({
    id: '',
    name: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async () => {
    const api = `http://localhost:3000/shopping/${input.id}`;
    
    // Validate inputs before submission
    if (!input.id || !input.name || !input.price) {
      message.error('Please fill in all fields before updating.');
      return;
    }

    try {
      const updatedData = {
        name: input.name,
        price: input.price,
      };

      await axios.put(api, updatedData); // Use PUT to update the product
      message.success('Product successfully updated!');
      navigate('/'); // Navigate to the homepage to reflect changes
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Failed to update the product. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Product</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>Enter Product ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={input.id}
            onChange={handleInput}
            placeholder="Enter product ID"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Enter Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={input.name}
            onChange={handleInput}
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Enter Product Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={input.price}
            onChange={handleInput}
            placeholder="Enter product price"
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSubmit}>
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
