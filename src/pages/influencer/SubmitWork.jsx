import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { FiLink, FiYoutube, FiSend, FiArrowLeft, FiLoader, FiCheckCircle, FiPlus, FiTrash2, FiAlertTriangle, FiInfo } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const ProjectInfoSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-base-300 rounded-lg"></div>
    <div className="h-6 bg-base-300 rounded w-3/4 mt-4"></div>
    <div className="h-4 bg-base-300 rounded w-1/2 mt-2"></div>
    <div className="h-4 bg-base-300 rounded w-1/3 mt-6"></div>
    <div className="h-4 bg-base-300 rounded w-1/4 mt-2"></div>
  </div>
);

export default function SubmitWork() {
  const { user } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [links, setLinks] = useState([{ type: "reel", url: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/campaign-applications/${projectId}`);
        if (data.success) {
          setProject(data.data);
          if (data.data.submission && data.data.submission !== "[]") {
            setLinks(JSON.parse(data.data.submission));
            setHasSubmitted(true);
          } else {
            setLinks([{ type: "reel", url: "" }]);
            setHasSubmitted(false);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError("Failed to fetch project details. It might have been removed or is no longer available.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const handleAddLink = () => {
    setLinks([...links, { type: "reel", url: "" }]);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (links.some(link => !link.url.trim())) {
      setError("Please ensure all link fields are filled out before submitting.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const submissionData = JSON.stringify(links);
      const { data } = await api.post(`/campaign-applications/${projectId}/submit`, {
        submission: submissionData,
      });

      if (data.success) {
        setSuccess("Your work has been submitted successfully!");
        setHasSubmitted(true);
        setTimeout(() => navigate("/app/active-projects"), 2000);
      } else {
        throw new Error(data.message || "An unknown error occurred.");
      }
    } catch (err) {
      setError(err.message || "Failed to submit work. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLinkIcon = (type) => {
    switch (type) {
      case 'reel': return <FaInstagram className="text-pink-500" />;
      case 'youtube': return <FiYoutube className="text-red-600" />;
      default: return <FiLink />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1"><ProjectInfoSkeleton /></div>
          <div className="lg:col-span-2"><div className="h-64 bg-base-200 rounded-lg animate-pulse"></div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-circle mr-2">
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {hasSubmitted ? 'Update Submission' : 'Submit Your Work'}
        </h1>
      </div>

      {error && (
        <div className="alert alert-error shadow-lg mb-6">
          <div>
            <FiAlertTriangle size={24} />
            <span><strong>Error:</strong> {error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="alert alert-success shadow-lg mb-6">
          <div>
            <FiCheckCircle size={24} />
            <span>{success} Redirecting...</span>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-8">
          {/* Project Header */}
          <div className="mb-6 pb-4 border-b border-base-300">
            <h2 className="text-xl font-bold text-primary">{project?.campaign?.title}</h2>
        
          </div>

          {/* Submission Info */}
          <div className="prose prose-sm max-w-none mb-6">
            <h3>Your Submission</h3>
            <p>
              {hasSubmitted
                ? "Your previous submissions are listed below. You can add more links or remove existing ones and resubmit."
                : "Add the links to your completed work below. You can add multiple links for different platforms."}
            </p>
          </div>

          {/* Submitted Links (if any) */}
          {hasSubmitted && links.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm uppercase">Submitted Links</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index} className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {getLinkIcon(link.type)}
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="link link-hover text-sm truncate">{link.url}</a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="divider text-xs">Add or Update Links Below</div>
            </div>
          )}

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {links.map((link, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="form-control w-full sm:w-48">
                  <div className="input-group">
                    <span className="px-3 flex items-center bg-base-200">{getLinkIcon(link.type)}</span>
                    <select
                      className="select select-bordered w-full"
                      value={link.type}
                      onChange={(e) => handleLinkChange(index, "type", e.target.value)}
                    >
                      <option value="reel">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-control flex-grow w-full">
                  <input
                    type="url"
                    placeholder="https://example.com/your-content"
                    className="input input-bordered w-full"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                    required
                  />
                </div>
                <button type="button" onClick={() => handleRemoveLink(index)} className="btn btn-ghost btn-sm text-error">
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
              <button type="button" onClick={handleAddLink} className="btn btn-outline w-full sm:w-auto">
                <FiPlus className="mr-2" /> Add Another Link
              </button>
              <button type="submit" className="btn btn-primary btn-wide w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting
                  ? <span className="loading loading-spinner"></span>
                  : <><FiSend className="mr-2" /> {hasSubmitted ? 'Update Submission' : 'Submit Work'}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}