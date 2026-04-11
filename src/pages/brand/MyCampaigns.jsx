import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function MyCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCloseCampaign = async (campaignId) => {
    try {
      const { data } = await api.patch(`/campaigns/${campaignId}/close`);
      if (data.success) {
        setCampaigns((prevCampaigns) =>
          prevCampaigns.map((c) =>
            c._id === campaignId ? { ...c, status: "CLOSED" } : c
          )
        );
        alert("Campaign closed successfully!");
      }
    } catch (err) {
      alert("Failed to close campaign.");
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        const { data } = await api.delete(`/campaigns/${campaignId}`);
        if (data.success) {
          setCampaigns((prevCampaigns) =>
            prevCampaigns.filter((c) => c._id !== campaignId)
          );
          alert("Campaign deleted successfully!");
        }
      } catch (err) {
        alert("Failed to delete campaign.");
      }
    }
  };

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get(`/campaigns/by-brand/${user._id}`);
        if (data.success) {
          setCampaigns(data.data);
        }
      } catch (err) {
        setError("Failed to fetch campaigns.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📋 My Campaigns</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.length > 0 ? (
          campaigns.map((c) => (
            <div key={c._id} className="card p-6 min-h-[220px]">
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="text-base text-gray-600 dark:text-gray-300">
                Budget: ₹{c.budget.toLocaleString("en-IN")}
              </div>
              <div className="mt-2 text-base">
                Status: <span className={`font-semibold ${c.status === 'OPEN' ? 'text-green-500' : 'text-red-500'}`}>{c.status}</span>
              </div>
              <div className="mt-5 flex gap-3 flex-wrap">
                <Link to={`/app/campaign/${c._id}`} className="btn btn-ghost btn-sm">
                  👁️ View
                </Link>
                <Link to={`/app/campaign/${c._id}/edit`} className="btn btn-ghost btn-sm">
                  ✏️ Edit
                </Link>
                <Link
                  to={`/app/campaign/${c._id}/review`}
                  className="btn btn-primary btn-sm"
                >
                  📝 Review Applications ({c.applicants.length})
                </Link>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCloseCampaign(c._id)}
                  disabled={c.status === 'CLOSED'}
                >
                  🚫 Close
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeleteCampaign(c._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have not created any campaigns yet.</p>
        )}
      </div>
    </div>
  );
}
