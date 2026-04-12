import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function CampaignDetail() {
  const { campaignId } = useParams();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchCampaignAndApplication = async () => {
      if (!user?._id || !campaignId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch campaign details
        const campaignResponse = await api.get(`/campaigns/${campaignId}`);
        setCampaign(campaignResponse.data.data);
        
        // Check if an application exists for this campaign and user
        const applicationsResponse = await api.get(`/campaign-applications/my-applications/${user._id}`);
        const existingApplication = applicationsResponse.data.data.find(app => app.campaign._id === campaignId);
        if (existingApplication) {
          setApplication(existingApplication);
        }

      } catch (err) {
        setError('Failed to load campaign details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignAndApplication();
  }, [campaignId, user?._id]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const response = await api.post(`/campaign-applications/${campaignId}/apply`, {
        influencerId: user._id,
      });
      setApplication(response.data.data); // Set the new application
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while applying.");
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error && !campaign) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  if (!campaign) {
    return <div className="text-center py-20">Campaign not found.</div>;
  }

  const { title, brand, description, budget, platforms, deliverables, status } = campaign;
  const brandName = brand?.brandProfile?.companyName || 'A Brand';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 pb-6 border-b dark:border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Posted by <Link to={`/app/brand/${brand._id}`} className="font-semibold text-sky-600 hover:underline">{brandName}</Link>
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{budget.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-500">Total Budget</p>
          </div>
        </div>

        {/* Apply Button & Status */}
        <div className="mb-8 text-center">
          <button
            onClick={handleApply}
            disabled={!!application || isApplying || status !== 'OPEN'}
            className="btn btn-primary btn-lg w-full md:w-auto px-12 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isApplying ? 'Submitting...' : (!!application ? `Applied (${application.status})` : 'Apply Now')}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Submission Details */}
        {application && application.submission && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Submission</h2>
            <div className="space-y-2">
              {JSON.parse(application.submission).map((link, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="font-semibold capitalize">{link.type}:</span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline truncate">
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">About the Campaign</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Information</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="font-semibold w-24">Platforms:</span>
                <div className="flex flex-wrap gap-2">
                  {platforms?.map(p => <span key={p} className="badge badge-ghost">{p}</span>)}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold w-24">Status:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">📝 Deliverables</h2>
          <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            {deliverables?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
