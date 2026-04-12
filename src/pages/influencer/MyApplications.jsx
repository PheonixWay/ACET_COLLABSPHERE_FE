import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import CampaignCard from '../../components/molecules/CampaignCard';

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get(
          `/campaign-applications/my-applications/${user._id}`
        );
        setApplications(response.data.data);
      } catch (err) {
        setError('Failed to load applications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?._id]);

  if (loading) {
    return <div className="text-center py-20">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      {applications.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">You haven't applied to any campaigns yet.</p>
          <Link to="/app/browse-campaigns" className="btn btn-primary">
            Browse Campaigns
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map(application => (
            <CampaignCard key={application._id} campaign={application.campaign} applicationStatus={application.status} />
          ))}
        </div>
      )}
    </div>
  );
}