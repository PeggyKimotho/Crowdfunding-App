import React, { useState } from "react";
import "./App.css";
import CampaignCard from "./CampaignCard";

// Initial campaigns data
const initialCampaigns = [
  {
    id: 1,
    title: "Support Sustainable Farming in Rural Africa",
    description:
      "Fund local farmers in East Africa to access climate-resilient seeds and farming tools, improving food security in their communities.",
    goal: "0.5 BTC",
    raised: "0.1 BTC",
    image: "sustainable farming.jpg",
    address: "tb1qquh9dtyngwa4cgp4qftmqtlw356tl9az2yg3g2",
  },
  {
    id: 2,
    title: "Bringing Healthcare to Rural Communities",
    description:
      "Help fund mobile health clinics that travel to underserved villages, providing essential medical care, vaccinations, and maternal health services.",
    goal: "1 BTC",
    raised: "0.2 BTC",
    image: "healthcare.jpg",
    address: "tb1qz5jq7mfqzj8p47e3ahwjm8zpf30t9nsws5e8x4",
  },
  {
    id: 3,
    title: "Solar Power for a Brighter Tomorrow",
    description:
      "Support the installation of solar-powered systems for homes and schools in rural Africa, providing sustainable electricity to communities without access to the grid.",
    goal: "0.7 BTC",
    raised: "0.5 BTC",
    image: "solar.jpg",
    address: "tb1q2d8z09yy3dq5keex6eqh2pyqa2zqcq79g3gquy",
  },
  {
    id: 4,
    title: "Building Futures: Education for Every Child",
    description:
      "Fund the construction of a new school or provide scholarships for underprivileged children in Africa to attend primary and secondary schools.",
    goal: "0.6 BTC",
    raised: "0.3 BTC",
    image: "education.jpg",
    address: "tb1qtqfsdjvep80mdacrt5hz3cn5q3r0s45rxja7vt",
  },
];

const App = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    raised: "0 BTC", // default raised amount
    image: "",
    address: "",
  });

  const handleSearch = () => {
    const filteredCampaigns = initialCampaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCampaigns(filteredCampaigns);
  };

  const handleCreateCampaignClick = () => {
    setIsModalOpen(true); // Open modal when the "Create Campaign" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
    setIsModalOpen(false); // Close the modal after submission
    setNewCampaign({ title: "", description: "", goal: "", raised: "0 BTC", image: "", address: "" }); // Reset the form
  };

  return (
    <div className="App">
      <div className="content">
        <h1 className="heading">Crowdfunding Platform</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="campaigns-container">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </div>

      <div className="bottom-bar">
        <button className="create-campaign-btn" onClick={handleCreateCampaignClick}>
          Create Campaign
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="campaign-form">
            <h2>Create a New Campaign</h2>
            <form onSubmit={handleSubmit}>
              <label>Campaign Title</label>
              <input
                type="text"
                name="title"
                value={newCampaign.title}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newCampaign.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <label>Goal (in BTC)</label>
              <input
                type="number"
                name="goal"
                value={newCampaign.goal}
                onChange={handleInputChange}
                required
              />
              <label>Image</label>
              <input
                type="url"
                name="image"
                value={newCampaign.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={newCampaign.address}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Create Campaign</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
