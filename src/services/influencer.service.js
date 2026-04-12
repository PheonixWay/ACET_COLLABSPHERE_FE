import api from "./api";
export const getActiveProjects = async (influencerId) => {
  if (!influencerId) throw new Error("User not authenticated");
  const response = await api.get(
    `/campaign-applications/active-projects/${influencerId}`
  );
  return response.data.data;
};

export const submitWork = async (applicationId, submission) => {
  const response = await api.post(
    `/campaign-applications/${applicationId}/submit`,
    { submission }
  );
  return response.data;
};
