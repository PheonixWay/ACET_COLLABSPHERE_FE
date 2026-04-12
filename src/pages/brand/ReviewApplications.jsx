import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampaignApplicants } from "../../services/campaign.service";
import { updateApplicationStatus } from "../../services/brand.service";

export default function ReviewApplications() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants", id],
    queryFn: () => getCampaignApplicants(id),
  });

  const mutation = useMutation({
    mutationFn: ({ applicationId, status }) =>
      updateApplicationStatus(applicationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants", id]);
    },
  });

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!applicants) return [];
    const s = q.trim().toLowerCase();
    if (!s) return applicants.data;
    return applicants.data.filter(
      (a) =>
        a.influencer.name.toLowerCase().includes(s) ||
        a.influencer.niche.join(" ").toLowerCase().includes(s) ||
        String(a.influencer.followers).includes(s)
    );
  }, [q, applicants]);

  const handleUpdateStatus = (applicationId, status) => {
    mutation.mutate({ applicationId, status });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">📝 Review Applications</h2>
        <div className="mt-4 flex gap-3">
          <input
            className="input"
            placeholder="Filter by name, niche, followers..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-base">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-3 py-2">Influencer</th>
                <th className="px-3 py-2">Niche</th>
                <th className="px-3 py-2">Followers</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a._id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-3 py-2">{a.influencer.name}</td>
                  <td className="px-3 py-2">{a.influencer.niche.join(", ")}</td>
                  <td className="px-3 py-2">
                    {a.influencer.followers.toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-2 capitalize">{a.status}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateStatus(a._id, "accepted")}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleUpdateStatus(a._id, "rejected")}
                    >
                      ❌ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
