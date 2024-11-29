import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CashonDelivery from "../pages/Cashondelivery";
import InternetBanking from "./InternetBanking";
import DebitCard from "./DebitCard";
import Upi from "./Upi";
import { useState } from "react";
import axios from 'axios';

const CheckOut = () => {
    const { amt } = useParams();  // Get the amount from URL parameters
    const [paymethod, setPayMethod] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        address: "",
        pincode: "",
        mobile: "",
    });
    const [errors, setErrors] = useState({});
    const [orderSubmitted, setOrderSubmitted] = useState(false);  // Flag to show order submission success
    const [products, setProducts] = useState([        // Sample product list (in a real case, you'd likely pass this from the previous page)
        { name: "Kids' Marvel Avengers Sneakers for Kids", quantity: 2 },
        { name: "AVANT Shoes for Men", quantity: 1 },
        { name: "Campus Women's Camp Eloy Running Shoes for Women", quantity: 1},
    ]);
    const navigate = useNavigate();

    // Handle input change for payment method
    const handleInput = (e) => {
        let val = e.target.value;
        setPayMethod(val);
    };

    // Handle input change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate the form data before submission
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode))
            newErrors.pincode = "Valid 6-digit pin code is required";
        if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
            newErrors.mobile = "Valid 10-digit mobile number is required";

        if (!paymethod) newErrors.paymethod = "Payment method is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const paydone = () => {
        if (validateForm()) {
            // Prepare product names and quantities as part of the data
            const productNames = products
                .map(product => `${product.name} (x${product.quantity})`)
                .join(", ");

            // Create a customer data object with form values and product data
            const customerData = {
                ...formData,
                amt,  // Use the amount passed from the URL params
                paymentMethod: paymethod,
                productsOrdered: productNames,  // Add product details here
            };

            // Send the data to JSON server
            axios.post('http://localhost:3000/customers', customerData)
                .then(response => {
                    console.log("Order submitted successfully:", response.data);
                    setOrderSubmitted(true);  // Set order submitted flag
                    setTimeout(() => {
                        navigate("/paydone");  // Navigate to the payment success page after a delay
                    }, 2000);  // 2 seconds delay before redirecting
                })
                .catch(error => {
                    console.error("Error submitting order:", error);
                    alert("Failed to submit order. Please try again.");
                });
        }
    };

    // Show the corresponding payment component based on selected method
    let paymentComponent;
    if (paymethod === "cash") {
        paymentComponent = <CashonDelivery />;
    } else if (paymethod === "internet") {
        paymentComponent = <InternetBanking />;
    } else if (paymethod === "debit") {
        paymentComponent = <DebitCard />;
    } else {
        paymentComponent = <Upi />;
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: '20px',
        },
        divStyle: {
            width: '48%',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        formTitle: {
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        inputGroup: {
            marginBottom: '15px',
        },
        errorText: {
            color: 'red',
            fontSize: '14px',
        },
        paymentTitle: {
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
        },
    };

    return (
        <>
            <h1>CheckOut</h1>
            <h3 align="center">Total Payable Amount: ₹{amt}</h3>

            <div style={styles.container}>
                <div style={styles.divStyle}>
                    <h4 style={styles.formTitle}>Fill Your Shipping Address</h4>
                    <Form>
                        <Form.Group style={styles.inputGroup} controlId="formBasicName">
                            <Form.Label>Enter name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p style={styles.errorText}>{errors.name}</p>}
                        </Form.Group>
                        <Form.Group style={styles.inputGroup} controlId="formBasicCity">
                            <Form.Label>Enter city</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p style={styles.errorText}>{errors.city}</p>}
                        </Form.Group>
                        <Form.Group style={styles.inputGroup} controlId="formBasicAddress">
                            <Form.Label>Enter Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p style={styles.errorText}>{errors.address}</p>}
                        </Form.Group>
                        <Form.Group style={styles.inputGroup} controlId="formBasicPincode">
                            <Form.Label>Enter Pin Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                            {errors.pincode && <p style={styles.errorText}>{errors.pincode}</p>}
                        </Form.Group>
                        <Form.Group style={styles.inputGroup} controlId="formBasicMobile">
                            <Form.Label>Enter Mobile number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p style={styles.errorText}>{errors.mobile}</p>}
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={paydone}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <div style={styles.divStyle}>
                    <h4 style={styles.paymentTitle}>Select Your Payment Method</h4>
                    <div>
                        <input
                            type="radio"
                            name="paymethod"
                            value="cash"
                            onChange={handleInput}
                        />{" "}
                        Cash on Delivery
                        <br />
                        <input
                            type="radio"
                            name="paymethod"
                            value="internet"
                            onChange={handleInput}
                        />{" "}
                        Internet Banking
                        <br />
                        <input
                            type="radio"
                            name="paymethod"
                            value="debit"
                            onChange={handleInput}
                        />{" "}
                        Debit/Credit Card
                        <br />
                        <input
                            type="radio"
                            name="paymethod"
                            value="upi"
                            onChange={handleInput}
                        />{" "}
                        UPI/Phone Pay
                    </div>
                    {errors.paymethod && <p style={styles.errorText}>{errors.paymethod}</p>}
                    {paymentComponent}
                </div>
            </div>

            {orderSubmitted && (
                <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center' }}>
                    <h4>Order Submitted Successfully!</h4>
                </div>
            )}
        </>
    );
};

export default CheckOut;
