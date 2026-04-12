import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiUsers, FiArchive, FiTrash2, FiBriefcase } from "react-icons/fi";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import ReviewApplicationsModal from "./ReviewApplicationsModal";

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    const statusClasses = {
      OPEN: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      CLOSED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export default function MyCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleReviewApplications = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
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

  const handleApplicationUpdate = () => {
    fetchCampaigns(); // Refetch campaigns to update the applicant count
  };

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }
    
    fetchCampaigns();
  }, [user]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiBriefcase className="text-primary"/> My Campaigns
            </h1>
      
        </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {campaigns.length > 0 ? (
          campaigns.map((c) => (
            <div key={c._id} className="card bg-base-100 dark:bg-base-800 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="card-body p-5 flex-grow">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white pr-2">{c.title}</h2>
                        <StatusBadge status={c.status} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Budget: <span className="font-semibold text-gray-700 dark:text-gray-200">₹{c.budget?.toLocaleString("en-IN") || 'N/A'}</span>
                    </p>
                </div>
                <div className="card-actions justify-start p-5 border-t border-base-200 dark:border-base-700 flex flex-wrap gap-2">
                    <Link to={`/app/campaign/${c._id}`} className="btn btn-ghost btn-xs gap-1">
                        <FiEye/> View
                    </Link>
                    <Link to={`/app/campaign/${c._id}/edit`} className="btn btn-ghost btn-xs gap-1">
                        <FiEdit/> Edit
                    </Link>
                    <button
                        onClick={() => handleReviewApplications(c)}
                        className="btn btn-primary btn-xs gap-1"
                    >
                        <FiUsers/> Review ({c.applicants.length})
                    </button>
                    <button
                        className="btn btn-ghost btn-xs text-warning gap-1"
                        onClick={() => handleCloseCampaign(c._id)}
                        disabled={c.status === 'CLOSED'}
                    >
                        <FiArchive/> Close
                    </button>
                    <button
                        className="btn btn-ghost btn-xs text-error gap-1"
                        onClick={() => handleDeleteCampaign(c._id)}
                    >
                        <FiTrash2/> Delete
                    </button>
                </div>
            </div>
          ))
        ) : (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-16 text-gray-500">
                <FiBriefcase className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium">No Campaigns Found</h3>
                <p className="mt-2 text-sm">Get started by creating your first campaign.</p>
                <div className="mt-6">
                    <Link to="/app/campaign/create" className="btn btn-primary gap-2">
                        <FiPlus /> Create Campaign
                    </Link>
                </div>
            </div>
        )}
      </div>
      {isModalOpen && selectedCampaign && (
        <ReviewApplicationsModal
          campaign={selectedCampaign}
          onClose={() => setIsModalOpen(false)}
          onApplicationUpdate={handleApplicationUpdate}
        />
      )}
    </div>
  );
}
