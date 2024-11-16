import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CampaignCard.css";

const CampaignCard = ({ title, description, goal, raised, image, address }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const handleDonate = () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    alert(`You donated ${donationAmount} BTC to the campaign at address: ${address}`);
    setShowDonateModal(false); // Close the modal after donation
  };

  return (
    <div className="campaign-card">
      <img src={image} alt={title} className="campaign-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        Goal: <strong>{goal}</strong> {/* "BTC" is already included in the `goal` value */}
      </p>
      <p>
        Raised: <strong>{raised}</strong> {/* "BTC" is already included in the `raised` value */}
      </p>
      {address ? (
        <p>
          <strong>Bitcoin Address:</strong> 
          <span className="campaign-address">{address}</span> {/* Wrapped address in a span for styling */}
        </p>
      ) : (
        <p>No Bitcoin address provided for donations</p>
      )}
      <button className="donate-btn" onClick={() => setShowDonateModal(true)}>
        Donate
      </button>

      {showDonateModal && (
        <div className="donate-modal">
          <div className="donate-modal-content">
            <h2>Donate to {title}</h2>
            <label>Donation Amount (in BTC):</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount in BTC"
              required
            />
            <div className="donate-modal-actions">
              <button onClick={handleDonate}>Donate</button>
              <button onClick={() => setShowDonateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Prop type validation
CampaignCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired, // Updated to string since "BTC" is part of the value
  raised: PropTypes.string.isRequired, // Updated to string since "BTC" is part of the value
  image: PropTypes.string.isRequired,
  address: PropTypes.string,
};

export default CampaignCard;
