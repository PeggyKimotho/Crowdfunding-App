import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CampaignCard.css";

const CampaignCard = ({ title, description, goal, raised, image, address }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationHistory, setDonationHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // New state for donation history modal

  useEffect(() => {
    // Fetch donation history for this campaign
    const fetchDonationHistory = async () => {
      const response = await fetch(`http://localhost:5000/donations?campaign_address=${address}`);
      const data = await response.json();
      setDonationHistory(data);
    };

    if (address) {
      fetchDonationHistory();
    }
  }, [address]);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      // Send donation request to backend
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaign_address: address,
          donation_amount: donationAmount,
          donor_address: "tb1qmvatex4s3zmz2ms7x8q85m4sxdxmjn8u6fjw79",  // You may want to replace this with real donor info
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert(`You donated ${donationAmount} BTC to the campaign! TXID: ${data.txid}`);
      } else {
        alert("Donation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during donation:", error);
      alert("An error occurred while processing the donation.");
    }

    setShowDonateModal(false); // Close the modal after donation
  };

  const toggleHistoryModal = () => {
    setShowHistoryModal(!showHistoryModal); // Toggle the history modal visibility
  };

  return (
    <div className="campaign-card">
      <img src={image} alt={title} className="campaign-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        Goal: <strong>{goal}</strong>
      </p>
      <p>
        Raised: <strong>{raised}</strong>
      </p>
      {address ? (
        <p>
          <strong>Bitcoin Address:</strong>
          <span className="campaign-address">{address}</span>
        </p>
      ) : (
        <p>No address available for this campaign.</p>
      )}
      <button className="donate-btn" onClick={() => setShowDonateModal(true)}>
        Donate
      </button>

      {/* Button to toggle Donation History Modal */}
      <button className="view-history-btn" onClick={toggleHistoryModal}>
        View Donation History
      </button>

      {/* Donation History Modal */}
      {showHistoryModal && (
        <div className="history-modal">
          <div className="history-modal-content">
            <h2>Donation History for {title}</h2>
            {donationHistory.length > 0 ? (
              <ul>
                {donationHistory.map((donation, index) => (
                  <li key={index}>
                    <p>
                      <strong>Amount:</strong> {donation.donation_amount} BTC
                    </p>
                    <p>
                      <strong>Donor Address:</strong> {donation.donor_address}
                    </p>
                    <p>
                      <strong>TXID:</strong> {donation.txid}
                    </p>
                    <p>
                      <strong>Date:</strong> {donation.timestamp}
                    </p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donations yet.</p>
            )}
            <button onClick={toggleHistoryModal}>Close</button>
          </div>
        </div>
      )}

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
  goal: PropTypes.string.isRequired,
  raised: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  address: PropTypes.string,
};

export default CampaignCard;
