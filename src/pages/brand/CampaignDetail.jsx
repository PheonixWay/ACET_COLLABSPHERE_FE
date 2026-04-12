import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const FormattedDescription = ({ description }) => {
  if (!description) return null;

  // Split by newline and process each line
  const lines = description.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') {
      return <br key={index} />;
    }
    // Bold headings like "A. Campaign Overview"
    if (trimmedLine.match(/^[A-E]\./)) {
      return <p key={index} className="font-bold mt-4">{trimmedLine}</p>;
    }
    // Bold headings like "[Brand Name] Campaign Brief"
    if (trimmedLine.match(/^\[.*\]/)) {
        return <p key={index} className="font-bold text-xl mb-4">{trimmedLine}</p>;
    }
    return <p key={index}>{trimmedLine}</p>;
  });

  return <div>{lines}</div>;
};

export default function CampaignDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const token = localStorage.getItem("collabsphere_token");
        const { data } = await api.get(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          setCampaign(data.data);
        }
      } catch (err) {
        setError("Failed to fetch campaign details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    setError(null);
    try {
      const token = localStorage.getItem("collabsphere_token");
      await api.post(`/campaigns/${id}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Successfully applied for the campaign!");
      nav("/app/influencer/applications");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply.");
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error && !campaign) return <div className="text-red-500">{error}</div>;
  if (!campaign) return <div>Campaign not found.</div>;

  const isInfluencer = user.role === "INFLUENCER";
  const hasApplied = campaign.applicants.includes(user._id);

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
      <p className="text-md text-gray-600 mb-6">
        by {campaign.brand?.brandProfile?.companyName || "A Brand"}
      </p>

      <div className="mb-6">
        <span className="font-bold text-2xl text-green-600">${campaign.budget}</span>
        <span className="text-gray-500"> Budget</span>
      </div>

      <div className="prose max-w-none mb-8">
        <FormattedDescription description={campaign.description} />
      </div>

      {isInfluencer && (
        <div className="text-center">
          {hasApplied ? (
            <p className="font-semibold text-green-600">You have already applied to this campaign.</p>
          ) : (
            <button onClick={handleApply} disabled={isApplying} className="btn btn-primary btn-lg">
              {isApplying ? "Applying..." : "Apply Now"}
            </button>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {!isInfluencer && (
         <div className="mt-8">
         <h2 className="text-xl font-bold mb-4">
           Applicants ({campaign.applicants.length})
         </h2>
         {campaign.applicants.length > 0 ? (
           <p>
             {campaign.applicants.length} influencer(s) have applied. Viewing applicants will be available soon.
           </p>
         ) : (
           <p>No applicants yet.</p>
         )}
       </div>
      )}
    </div>
  );
}
