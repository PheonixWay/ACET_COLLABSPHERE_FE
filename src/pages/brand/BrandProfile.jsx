import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

export default function BrandProfile() {
  const { user, updateProfile: updateAuthContext } = useAuth();
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    industry: "",
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?._id) {
        setIsLoading(false);
        setError("User not found. Please log in again.");
        return;
      }
      try {
        const { data } = await api.get(`/profile/brand/${user._id}`);
        if (data.success) {
          setForm(data.data);
        }
      } catch (err) {
        setError("Failed to fetch profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setError("User not found. Please log in again.");
      return;
    }
    try {
      const { data } = await api.put(`/profile/brand/${user._id}`, form);
      if (data.success) {
        updateAuthContext({ brandProfile: data.data });
        alert("Profile updated successfully! ✅");
      }
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Brand Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName || ""}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Website</label>
          <input
            type="text"
            name="website"
            value={form.website || ""}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Industry</label>
          <input
            type="text"
            name="industry"
            value={form.industry || ""}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="input h-32"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
