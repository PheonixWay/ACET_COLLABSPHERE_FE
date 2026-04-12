import api from "./api";

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(
    `/campaign-applications/${applicationId}/status`,
    { status }
  );
  return response.data;
};
