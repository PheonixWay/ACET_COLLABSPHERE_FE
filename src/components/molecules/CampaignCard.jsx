import { Link } from 'react-router-dom';

export default function CampaignCard({ campaign, applicationStatus }) {
  const { _id, title, brand, budget, platforms, status } = campaign;
  const brandName = brand?.brandProfile?.companyName || 'A Brand';

  const getStatusBadge = () => {
    if (applicationStatus) {
      const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-blue-100 text-blue-800',
        rejected: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[applicationStatus]}`}>
          {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
        </span>
      );
    }
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="card h-full flex flex-col justify-between animate-fadeIn p-5">
      <div>
        <div className="mb-2">
          {getStatusBadge()}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          By <span className="font-semibold">{brandName}</span>
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(platforms) && platforms.map(p => (
            <span key={p} className="badge badge-ghost">{p}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          ₹{budget?.amount?.toLocaleString('en-IN') || 'N/A'}
        </p>
        <Link to={`/app/campaign/${_id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}
