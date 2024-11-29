import React, { useEffect, useState } from 'react';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customer data from the JSON server using fetch
    fetch('http://localhost:3000/customers')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the structure of the data
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Customer Orders</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={headerStyle}>Order ID</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Mobile</th>
            <th style={headerStyle}>City</th>
            <th style={headerStyle}>Address</th>
            <th style={headerStyle}>Pincode</th>
            <th style={headerStyle}>Total Amount</th>
            <th style={headerStyle}>Payment Method</th>
            <th style={headerStyle}>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((customer) => (
            <tr key={customer.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{customer.id}</td>
              <td style={cellStyle}>{customer.name}</td>
              <td style={cellStyle}>{customer.mobile}</td>
              <td style={cellStyle}>{customer.city}</td>
              <td style={cellStyle}>{customer.address}</td>
              <td style={cellStyle}>{customer.pincode}</td>
              <td style={cellStyle}>₹{customer.amt}</td>
              <td style={cellStyle}>{customer.paymentMethod || 'Not Specified'}</td>
              <td style={cellStyle}>
                {/* Displaying the ordered products */}
                {customer.productsOrdered ? (
                  <ul>
                    {customer.productsOrdered.split(',').map((item, index) => {
                      const [productName, qty] = item.split(' (x');
                      return (
                        <li key={index} style={{ marginBottom: '5px' }}>
                          {productName} (Qty: {qty.replace(')', '')})
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No products ordered</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styling for header and cells
const headerStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f4f4f4',
  fontWeight: 'bold',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default ViewOrders;
