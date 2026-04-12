import { useState, useEffect } from "react";
import { getActiveProjects } from "../../services/influencer.service";
import { Link } from "react-router-dom";
  
import { useAuth } from "../../hooks/useAuth";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold">📌 Active Projects</h2>
      <div className="mt-4 space-y-4">
        {projects && projects.length > 0 ? (
          projects.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-lg font-semibold">
                  {p.campaign.title} — {p.campaign.brand?.brandProfile?.companyName || 'A Brand'}
                </div>
                <div className="text-base text-gray-600 dark:text-gray-300">
                  Due: {new Date(p.campaign.endDate).toLocaleDateString()} •
                  Payout: ₹{p.campaign.budget?.amount?.toLocaleString("en-IN") || 'N/A'} •
                  Status: {p.status}
                </div>
              </div>
              <Link
                to={`/app/project/${p._id}/submit`}
                className="btn btn-primary"
              >
                👀 View / Submit
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            You have no active projects.
          </p>
        )}
      </div>
    </div>
  );
}
