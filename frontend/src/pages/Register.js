// src/pages/Register.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // ✅ Import your global styles

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    companyName: "",
    address: "",
    taxId: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Account Info */}
        <h4>Account Info</h4>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

        {/* Optional Profile Info */}
        <h4>Profile Info</h4>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />

        {/* Billing Info */}
        <h4>Billing Info (Optional)</h4>
        <input name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input name="address" placeholder="Billing Address" onChange={handleChange} />
        <input name="taxId" placeholder="Tax ID / VAT Number" onChange={handleChange} />
        <select name="paymentMethod" onChange={handleChange}>
          <option value="">Preferred Payment Method</option>
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank">Bank Transfer</option>
        </select>

        <button type="submit" style={{ marginTop: 10 }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
