import React from "react";
import "./App.css";  // Import the stylesheet for styling

const campaigns = [
  {
    id: 1,
    title: "Campaign 1",
    description: "Help us fund this amazing project.",
    goal: 5000,
    raised: 1500,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Campaign 2",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Campaign 3",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Campaign 4",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Campaign 5",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Campaign 6",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Campaign 7",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    title: "Campaign 8",
    description: "Support this cause and make a difference.",
    goal: 10000,
    raised: 8000,
    image: "https://via.placeholder.com/150",
  },
  // Add more campaigns as needed
];

const CampaignCard = ({ title, description, goal, raised, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <span>Goal: ${goal}</span>
        <span>Raised: ${raised}</span>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/* Heading added here */}
      <h1 className="heading">Crowdfunding Platform</h1>
      <div className="campaigns-container">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            title={campaign.title}
            description={campaign.description}
            goal={campaign.goal}
            raised={campaign.raised}
            image={campaign.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;