import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { FaUsers, FaBox, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      <header className="main-header">
        <div className="header-container">
          <div className="logo-container">
            {/* Placeholder for the logo icon */}
            <div className="logo-icon-placeholder"></div>
            <span className="logo-text">Mumbai Ration Distribution</span>
          </div>
          <div className="header-buttons">
            <button onClick={() => navigate("/login-user")} className="header-button citizen">
              Citizen Login
            </button>
            <button onClick={() => navigate("/login-admin")} className="header-button admin">
              Admin Login
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <p className="initiative-text">Government of Maharashtra Initiative</p>
          <h1 className="hero-title">Digital Ration Distribution System</h1>
          <p className="hero-description">
            Streamlined, transparent, and efficient ration distribution for Mumbai citizens. Order your monthly rations online and collect from your nearest distribution center.
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/login-user")} className="cta-button primary">
              Access Your Rations
            </button>
            <button className="cta-button secondary">
              Learn More
            </button>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3 className="stat-number">50,000+</h3>
            <p className="stat-text">Registered Families</p>
          </div>
          <div className="stat-card">
            <FaBox className="stat-icon" />
            <h3 className="stat-number">1M+</h3>
            <p className="stat-text">Rations Distributed</p>
          </div>
          <div className="stat-card">
            <FaMapMarkerAlt className="stat-icon" />
            <h3 className="stat-number">25</h3>
            <p className="stat-text">Distribution Centers</p>
          </div>
          <div className="stat-card">
            <FaRegClock className="stat-icon" />
            <h3 className="stat-number">24/7</h3>
            <p className="stat-text">Online Access</p>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-description">Simple steps to access your monthly ration allocation</p>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4 className="step-title">Login with Ration Card</h4>
              <p className="step-text">Use your ration card number and password to access your account</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4 className="step-title">Place Your Order</h4>
              <p className="step-text">Select from available rations based on your family size and entitlement</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4 className="step-title">Collect from Center</h4>
              <p className="step-text">Visit your assigned distribution center to collect your order when ready</p>
            </div>
          </div>
        </section>

        <section className="info-card-section">
          <div className="info-card">
            <h2 className="info-card-title">Mumbai Central Distribution Center</h2>
            <p className="info-card-subtitle">Currently serving Dadar, Parel, and surrounding areas</p>
            <div className="info-card-details">
              <div className="details-column">
                <h4 className="details-title">Address</h4>
                <p className="details-text">123 Central Avenue<br />Dadar West, Mumbai - 400028<br />Maharashtra, India</p>
              </div>
              <div className="details-column">
                <h4 className="details-title">Operating Hours</h4>
                <p className="details-text">Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: 10:00 AM - 4:00 PM<br />Closed on public holidays</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-col">
            <div className="logo-container">
              {/* Placeholder for logo icon */}
              <div className="logo-icon-placeholder"></div>
              <span className="logo-text">Mumbai Ration Distribution</span>
            </div>
            <p className="footer-description">
              Ensuring food security for all Mumbai citizens through efficient digital distribution.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Citizen Portal</a></li>
              <li><a href="#">Admin Portal</a></li>
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contact Information</h4>
            <p className="footer-contact">Phone: +91 22 1234 5678</p>
            <p className="footer-contact">Email: support@mumbairations.gov.in</p>
            <p className="footer-contact">Helpline: 1800-123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Government of Maharashtra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}