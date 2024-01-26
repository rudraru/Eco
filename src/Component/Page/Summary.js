import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Summary.css';
import { Link } from 'react-router-dom';

const SummaryPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({
    reference_number: '',
    ProductName: '',
    Prices: 0,
    Unit: '',
    Total: 0,
    CustomerName: '',
    CustomerId: 0,
    Email: '',
    Address: '',
    ContactNumber: '',
    PaymentMethod: '',
    DeliveryStatus: ''
  });

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : []; 
    const storedCustomerName = localStorage.getItem('customerName');
    if (storedCustomerName) {
      setCustomerName(storedCustomerName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const orderAmount = calculateTotalAmount(cartItems);
  const shippingCharge = orderAmount < 1500 ? 150 : 0;
  const totalAmount = orderAmount + shippingCharge;

  const handleSubmit = (e) => {
    e.preventDefault();
 
    fetch('http://localhost:10000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
   
        orderAmount: orderAmount,
        shippingCharge: shippingCharge,
        totalAmount: totalAmount,
        customerName: customerName,
        address: address,
        email: email,
        contactNumber: contactNumber,
        paymentMethod: paymentMethod,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response only if it's a successful response
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('Order created successfully:', data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        // Handle errors, e.g., display an error message to the user
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  

  return (
<div>

    <Link className='Backclass' to='/'>
       Home   /
    </Link>
    <Link className='Backclass' to='/fruits'>
    fruits /
    </Link>

    <Link className='Backclass' to='/order-summary'>
  Summary
    </Link>
    <div className="summary-page">
      <div className="invoice-section">
        <div className="invoice-container">
          <div className="invoice-row">
          
          </div>
          <table className="table invoice-items">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.price * item.quantity}</td>
                  <td className="remove-icon" onClick={() => handleRemoveItem(item.id)}>
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>Amount: {orderAmount}</p>
          <p>Shipping Charge: {shippingCharge}</p>
          <p>Total Amount: {totalAmount}</p>

          <div className="invoice-footer">
            <p className="invoice-message">Thank you for your purchase!</p>
            {/* <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!paymentMethod || cartItems.length === 0 || orderConfirmed}
            >
              Confirm Order
            </button> */}
          </div>
        </div>
      </div>

      <div className="invoice-details">
        {orderConfirmed && (
          <div className="confirmation-overlay">
            <div className="confirmation-message">
              <p className="confirmation-text">Order confirmed! Redirecting to homepage...</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
        <label className="invoice-label">Customer Name:</label>
            <input
              className="invoice-input"
              type="text"
              value={customerName}
              placeholder="Enter Your Name..."
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

          <label>
            Address:
            <input
              type="text"
              value={address}
              placeholder="Enter Your Address..."
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              placeholder="something@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Contact Number:
            <input
              type="number"
              value={contactNumber}
              placeholder="+977 98********"
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </label>

          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SummaryPage;
