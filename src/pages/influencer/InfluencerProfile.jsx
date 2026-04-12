import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

export default function InfluencerProfile() {
  const { user, updateProfile: updateAuthContext } = useAuth();
  const [form, setForm] = useState({
    personalInfo: {
      fullName: "",
      phone: "",
      city: "",
      bio: "",
    },
    socialsInfo: {
      primaryNiche: "",
      instagram: { handle: "" },
      youtube: { channelUrl: "" },
    },
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
        const { data } = await api.get(`/profile/influencer/${user._id}`);
        if (data.success) {
          // Ensure form state has the same structure
          setForm((prevForm) => ({
            ...prevForm,
            ...data.data,
            personalInfo: { ...prevForm.personalInfo, ...data.data.personalInfo },
            socialsInfo: { ...prevForm.socialsInfo, ...data.data.socialsInfo },
          }));
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
    const { name, value } = e.target;
    const [section, field, subField] = name.split(".");

    if (subField) {
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: { ...prev[section][field], [subField]: value },
        },
      }));
    } else if (field) {
      setForm((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setError("User not found. Please log in again.");
      return;
    }
    try {
      const { data } = await api.put(`/profile/influencer/${user._id}`, form);
      if (data.success) {
        updateAuthContext({ influencerProfile: data.data });
        alert("Profile updated successfully! ✅");
      }
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Influencer Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="personalInfo.fullName"
                value={form.personalInfo?.fullName || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                type="text"
                name="personalInfo.phone"
                value={form.personalInfo?.phone || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                type="text"
                name="personalInfo.city"
                value={form.personalInfo?.city || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Bio</label>
              <textarea
                name="personalInfo.bio"
                value={form.personalInfo?.bio || ""}
                onChange={handleChange}
                className="input h-24"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Socials Info */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Socials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Primary Niche</label>
              <input
                type="text"
                name="socialsInfo.primaryNiche"
                value={form.socialsInfo?.primaryNiche || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">Instagram Handle</label>
              <input
                type="text"
                name="socialsInfo.instagram.handle"
                value={form.socialsInfo?.instagram?.handle || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">YouTube Channel URL</label>
              <input
                type="text"
                name="socialsInfo.youtube.channelUrl"
                value={form.socialsInfo?.youtube?.channelUrl || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}
