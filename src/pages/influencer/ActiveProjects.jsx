import { useState, useEffect } from "react";
import { getActiveProjects } from "../../services/influencer.service";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiBriefcase, FiExternalLink, FiCalendar, FiDollarSign, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const ProjectCardSkeleton = () => (
  <div className="card bg-base-100 dark:bg-base-800 shadow-lg animate-pulse">
    <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-t-2xl"></div>
    <div className="card-body p-5">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="mt-4 h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="card-actions justify-end mt-4">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-28"></div>
      </div>
    </div>
  </div>
);

export default function ActiveProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveProjects = async () => {
      if (!user?._id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await getActiveProjects(user._id);
        setProjects(data);
      } catch (err) {
        setError("Failed to load active projects.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveProjects();
  }, [user?._id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <FiAlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-500">An Error Occurred</h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <FiBriefcase className="text-primary" /> Active Projects
        </h1>
        <span className="badge badge-primary badge-lg">{projects.length}</span>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <div key={p._id} className="card bg-base-100 dark:bg-base-800 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-2xl overflow-hidden">
              <div className="card-body p-5 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    For: <span className="font-semibold text-gray-700 dark:text-gray-200">{p.campaign.brand?.brandProfile?.companyName || 'A Brand'}</span>
                  </p>
                  <h2 className="card-title text-xl font-bold text-gray-800 dark:text-white truncate" title={p.campaign.title}>
                    {p.campaign.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span>₹{p.campaign.budget?.toLocaleString("en-IN") || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-between items-center mt-6">
                  <div className={`badge badge-lg ${p.submission ? 'badge-success' : 'badge-warning'} badge-outline gap-2`}>
                    {p.submission ? <FiCheckCircle /> : <FiAlertCircle />}
                    {p.submission ? 'Submitted' : 'Pending'}
                  </div>
                  <Link
                    to={`/app/project/${p._id}/submit`}
                    className="btn btn-primary btn-sm gap-2"
                  >
                    {p.submission ? 'View/Update' : 'Submit Work'} <FiExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-base-200 dark:bg-base-800 rounded-2xl">
            <FiBriefcase className="mx-auto h-20 w-20 text-gray-400" />
            <h3 className="mt-6 text-2xl font-bold">No Active Projects</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">When you're accepted for a campaign, it will appear here.</p>
            <Link to="/app/browse-campaigns" className="btn btn-primary mt-6">
              Find Campaigns
            </Link>
        </div>
      )}
    </div>
  );
}
