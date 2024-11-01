// src/components/PrivacyPolicy.jsx
import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacyPolicy">
      <h2>Privacy Policy</h2>
      <p>
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you use our services.
      </p>

      <section>
        <h3>1. Information We Collect</h3>
        <p>
          We collect information to provide better services to all our users. This includes:
        </p>
        <ul>
          <li>Personal Information: name, email, and contact information.</li>
          <li>Usage Data: details on how you interact with our service.</li>
        </ul>
      </section>

      <section>
        <h3>2. How We Use Your Information</h3>
        <p>
          We use the collected data to personalize your experience, improve our services, 
          and communicate with you. Your data will not be sold to third parties.
        </p>
      </section>

      <section>
        <h3>3. Security</h3>
        <p>
          We implement industry-standard security measures to protect your information.
          However, no system is entirely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h3>4. Contact Us</h3>
        <p>
          If you have any questions about our Privacy Policy, please contact us at 
          privacy@AwraChat.com.
        </p>
      </section>

      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default PrivacyPolicy;
