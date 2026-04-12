import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiUser } from "react-icons/fi";
import api from "../../services/api";
import { updateApplicationStatus } from "../../services/brand.service";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const StatusBadge = ({ status }) => {
  let Icon;
  switch (status) {
    case "accepted":
      Icon = FiCheckCircle;
      break;
    case "rejected":
      Icon = FiXCircle;
      break;
    default:
      Icon = FiClock;
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};


export default function ReviewApplicationsModal({ campaign, onClose, onApplicationUpdate }) {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await api.get(
          `/campaigns/${campaign._id}/applicants`
        );
        if (data.success) {
          setApplicants(data.data);
        }
      } catch (err) {
        setError("Failed to fetch applicants.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, [campaign]);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const { data } = await updateApplicationStatus(applicationId, status);
      if (data.success) {
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === data.data._id ? { ...app, status: data.data.status } : app
          )
        );
        if (onApplicationUpdate) {
          onApplicationUpdate();
        }
      }
    } catch (error) {
      alert(`Failed to ${status} application.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Review Applications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For campaign: {campaign.title}</p>
        </div>

        {isLoading && <div className="flex-grow flex items-center justify-center"><p>Loading applicants...</p></div>}
        {error && <div className="flex-grow flex items-center justify-center"><p className="text-red-500">{error}</p></div>}
        
        {!isLoading && !error && (
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-gray-600 dark:text-gray-300 font-semibold">
                  <th className="px-6 py-3">Influencer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {applicants.length > 0 ? (
                  applicants.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                    <span>{a.influencer.name.substring(0, 2).toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{a.influencer.name}</div>
                                <div className="text-xs opacity-70">{a.influencer.email}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                            <button
                                className="btn btn-success btn-sm btn-outline gap-2"
                                onClick={() => handleUpdateStatus(a._id, "accepted")}
                                disabled={a.status === "accepted" || a.status === "rejected"}
                            >
                                <FiCheckCircle /> Accept
                            </button>
                            <button
                                className="btn btn-error btn-sm btn-outline gap-2"
                                onClick={() => handleUpdateStatus(a._id, "rejected")}
                                disabled={a.status === "accepted" || a.status === "rejected"}
                            >
                                <FiXCircle /> Reject
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-16 text-gray-500">
                      <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No applications</h3>
                      <p className="mt-1 text-sm">No applications received for this campaign yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button className="btn btn-ghost" onClick={onClose}>
            Close
            </button>
        </div>
      </div>
    </div>
  );
}
