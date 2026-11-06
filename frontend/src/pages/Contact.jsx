
import { useState } from "react";
import "../styles/Contact.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane
} from "react-icons/fa";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx7Zuvu_HYr3EeRZx7NIOeD10lAaBlnQEZ4kgoM-2Q7svvpT6ZnA09LSBmQ89wgT3uJPw/exec";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
};

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const email = formData.email.trim();

  if (!formData.name.trim()) {
    setStatus("Please enter your name.");
    return;
  }

  if (!email) {
    setStatus("Please enter your email.");
    return;
  }

  if (!validateEmail(email)) {
    setStatus("Please enter a valid email address.");
    return;
  }

  if (!formData.message.trim()) {
    setStatus("Please enter your message.");
    return;
  }

  setLoading(true);
  setStatus("");

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  body: JSON.stringify({
    name: formData.name.trim(),
    email: formData.email.trim(),
    message: formData.message.trim()
  })
});

const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    setStatus("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });

  } catch (error) {
    console.error(error);
    setStatus("Unable to send message. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions about AI Interview Bot?
          We are here to help you.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-box">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>support@aiinterviewbot.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhone />
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-box">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

         <input
  type="email"
  name="email"
  placeholder="Your Email"
  value={formData.email}
  onChange={handleChange}
  required
/>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {status && (
            <p className="contact-status">{status}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
            {!loading && <FaPaperPlane />}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Contact;
