import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function CreateCampaign() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [error, setError] = useState(null);

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
          <label className="label">Description</label>
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
  );
}
