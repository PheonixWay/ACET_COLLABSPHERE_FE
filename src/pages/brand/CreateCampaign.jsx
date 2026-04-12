import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const campaignTemplate = `[Brand Name] Campaign Brief
A. Campaign Overview

Product Name: [e.g., TVS iQube / TVS Jupiter]
Primary Goal: [e.g., Brand Awareness / Driving Sales / App Downloads]
Target Audience: [e.g., Gen-Z, Working Professionals, Tech-Enthusiasts]

B. Influencer Requirements

Niche: [e.g., Lifestyle, Automotive, Travel, Finance]
Minimum Follower Count: [e.g., 50k+]
Engagement Rate: [e.g., Minimum 3%]
Location Preference: [e.g., Pan India / Specific Cities]

C. Deliverables

Instagram: [e.g., 1 High-Quality Reel + 2 Stories with Link Stickers]
YouTube: [e.g., 1 Integrated Mention or Dedicated Video]
Usage Rights: [e.g., Brand can use content for 3 months on social media]

D. Key Talking Points (What to mention)

[e.g., Highlight the Digital Console and Navigation]
[e.g., Focus on the Eco-friendly "Green" aspect]
[e.g., Show the "Under-seat storage" space]

E. Content Guidelines

Do’s: Wear a helmet while riding, use high-quality lighting, keep the tone energetic.
Don’ts: Don't show rash driving, avoid mentioning competitor brands, don't use offensive language.`;

const TemplateModal = ({ onClose, onInsert }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4">Campaign Description Template</h2>
      <textarea
        readOnly
        className="input h-64 w-full bg-gray-50"
        value={campaignTemplate}
      />
      <div className="mt-6 flex justify-end gap-4">
        <button onClick={onClose} className="btn btn-ghost">
          Close
        </button>
        <button
          onClick={() => {
            onInsert(campaignTemplate);
            onClose();
          }}
          className="btn btn-primary"
        >
          Insert Template
        </button>
      </div>
    </div>
  </div>
);

export default function CreateCampaign() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!user?._id) {
      setError("You must be logged in to create a campaign.");
      return;
    }
    try {
      const { data } = await api.post(`/campaigns/${user._id}`, form);
      if (data.success) {
        nav("/app/my-campaigns");
      }
    } catch (err) {
      setError("Failed to create campaign.");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create a New Campaign</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Campaign Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Summer Fashion Launch"
            />
          </div>
          <div>
            <label className="label">Budget (in INR)</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="input"
              placeholder="e.g., 500"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="label">Description</label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-sm btn-link"
              >
                Use Template
              </button>
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input h-32"
              placeholder="Describe the campaign goals, deliverables, and requirements for influencers."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            🚀 Launch Campaign
          </button>
        </form>
      </div>
      {isModalOpen && (
        <TemplateModal
          onClose={() => setIsModalOpen(false)}
          onInsert={(template) =>
            setForm((prev) => ({ ...prev, description: template }))
          }
        />
      )}
    </>
  );
}
