import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { FiBriefcase, FiExternalLink, FiCheckCircle, FiClock, FiUser, FiAward } from "react-icons/fi";

const SubmissionLinks = ({ submission }) => {
  let links = [];
  try {
    links = JSON.parse(submission);
  } catch (error) {
    // If parsing fails, it might be a plain string URL
    if (typeof submission === 'string' && submission.startsWith('http')) {
      links = [{ url: submission, type: 'Submission' }];
    } else {
      return <p className="text-sm text-gray-500">No submission link provided.</p>;
    }
  }

  if (!Array.isArray(links) || links.length === 0) {
    return <p className="text-sm text-gray-500">No submission links available.</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 text-sm">Submissions:</h3>
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
        >
          <FiExternalLink />
          <span className="text-sm font-medium">{link.type || 'Link'}</span>
        </a>
      ))}
    </div>
  );
};

export default function ActiveProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const fetchActiveProjects = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/profile/brand/${user._id}/active-projects`);
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch active projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProjects();
  }, [user]);

  const handleCompleteProject = async (projectId) => {
    try {
      const { data } = await api.patch(`/campaign-applications/${projectId}/complete`);
      if (data.success) {
        setProjects(projects.map(p => p._id === projectId ? { ...p, status: 'completed' } : p));
      }
    } catch (error) {
      console.error("Failed to complete project:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'accepted' || p.status === 'submitted');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const ProjectCard = ({ project }) => {
    const statusStyles = {
      accepted: 'badge-warning text-yellow-800 bg-yellow-100',
      submitted: 'badge-info text-blue-800 bg-blue-100',
      completed: 'badge-success text-green-800 bg-green-100',
    };

    return (
      <div key={project._id} className="card bg-base-100 shadow-lg border border-gray-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="card-body p-5">
          <div className="flex justify-between items-start mb-3">
            <h2 className="card-title text-base font-bold text-gray-800 leading-tight">{project.campaign.title}</h2>
            <span className={`badge badge-sm font-semibold ${statusStyles[project.status]}`}>{project.status}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <FiUser />
            <span>{project.influencer.name}</span>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg min-h-[6rem]">
            {project.submission ? (
              <SubmissionLinks submission={project.submission} />
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <FiClock className="text-gray-400 mb-1"/>
                <p className="text-xs text-gray-500">Awaiting submission</p>
              </div>
            )}
          </div>

          <div className="card-actions justify-end mt-4">
            {project.status === 'submitted' && (
              <button 
                onClick={() => handleCompleteProject(project._id)} 
                className="btn btn-sm btn-primary gap-2"
              >
                <FiCheckCircle />
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProjects = (projectList, emptyMessage) => {
    if (projectList.length === 0) {
      return (
        <div className="text-center py-20 bg-gray-50/80 rounded-xl border border-dashed">
          <div className="flex justify-center mb-4">
            {emptyMessage.icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-700">{emptyMessage.title}</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">{emptyMessage.body}</p>
        </div>
      );
    }
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projectList.map(p => <ProjectCard key={p._id} project={p} />)}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <FiBriefcase className="text-3xl text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('active'); }}
            className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium flex items-center gap-2 ${
              activeTab === 'active'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <FiClock />
            <span>Active</span>
            <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {activeProjects.length}
            </span>
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('completed'); }}
            className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            aria-current={activeTab === 'completed' ? 'page' : undefined}
          >
            <FiCheckCircle />
            <span>Completed</span>
            <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {completedProjects.length}
            </span>
          </a>
        </nav>
      </div>
      
      {activeTab === 'active' && renderProjects(activeProjects, {
        icon: <FiBriefcase className="text-4xl text-gray-400"/>,
        title: "No Active Projects",
        body: "When an influencer accepts your campaign offer, it will appear here."
      })}

      {activeTab === 'completed' && renderProjects(completedProjects, {
        icon: <FiAward className="text-4xl text-gray-400"/>,
        title: "No Completed Projects",
        body: "Once you mark a submitted project as complete, it will move to this section."
      })}
    </div>
  );
}
