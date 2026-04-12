import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function EditCampaign() {
  const { campaignId } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await api.get(`/campaigns/${campaignId}`);
        if (data.success) {
          setForm({
            title: data.data.title,
            description: data.data.description,
            budget: data.data.budget,
          });
        }
      } catch (err) {
        setError("Failed to fetch campaign details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaign();
  }, [campaignId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await api.patch(`/campaigns/${campaignId}`, form);
      if (data.success) {
        nav("/app/my-campaigns");
      }
    } catch (err) {
      setError("Failed to update campaign.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium">
            Budget (₹)
          </label>
          <input
            type="number"
            name="budget"
            id="budget"
            value={form.budget}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
