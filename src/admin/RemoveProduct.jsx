import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const RemoveProduct = () => {
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setProductId(e.target.value);
  };

  const handleDelete = async () => {
    const api = `http://localhost:3000/shopping/${productId}`;

    try {
      await axios.delete(api);
      message.success('Product successfully removed!');
      navigate('/admin'); // Navigate to the admin page after deleting
    } catch (error) {
      console.error('Error removing product:', error);
      message.error('Failed to remove the product. Please try again.');
    }
  };

  return (
    <div>
      <h1>Remove Product</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicProductId">
          <Form.Label>Enter Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID to remove"
            value={productId}
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="danger" type="button" onClick={handleDelete}>
          Remove Product
        </Button>
      </Form>
    </div>
  );
};

export default RemoveProduct;
