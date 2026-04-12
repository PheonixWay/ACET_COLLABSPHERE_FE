import { useState, useEffect } from 'react';
import api from '../../services/api';
import CampaignCard from '../../components/molecules/CampaignCard';

export default function BrowseCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await api.get('/campaigns');
        setCampaigns(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load campaigns. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🚀 Browse Opportunities
        </h1>
        {/* Optional: Add search or filter controls here later */}
      </div>

      {loading && (
        <div className="text-center py-10">
          <p>Loading campaigns...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map(campaign => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Campaigns Found</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                There are no active campaigns at the moment. Please check back later!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

