import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FiBriefcase, FiExternalLink } from "react-icons/fi";

export default function BrandActiveProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    const fetchActiveProjects = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/brands/${user._id}/active-projects`);
        console.log("Active projects data:", data);
        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        setError("Failed to fetch active projects.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveProjects();
  }, [user]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <FiBriefcase className="text-primary" /> Active Projects
      </h1>

      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="card bg-base-100 dark:bg-base-800 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="card-body p-5">
                <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white truncate" title={project.campaign.title}>
                  {project.campaign.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Working with: <span className="font-semibold text-gray-700 dark:text-gray-200">{project.influencer.name}</span>
                </p>
                <div className="mt-4">
                    <span className="badge badge-lg badge-success badge-outline">
                        Status: {project.status.toUpperCase()}
                    </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/app/project/${project._id}`} className="btn btn-primary btn-sm gap-2">
                    View Project <FiExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
            <FiBriefcase className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium">No Active Projects</h3>
            <p className="mt-2 text-sm">You do not have any active projects at the moment.</p>
        </div>
      )}
    </div>
  );
}
