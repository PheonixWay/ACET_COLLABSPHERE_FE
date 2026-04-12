import api from './api';

export const getCampaignApplicants = async (campaignId) => {
  const response = await api.get(`/campaigns/${campaignId}/applicants`);
  return response.data;
};