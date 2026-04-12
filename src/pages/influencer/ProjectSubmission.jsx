import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { submitWork } from "../../services/influencer.service";

export default function ProjectSubmission() {
  const { id } = useParams();
  const [submission, setSubmission] = useState("");

  const mutation = useMutation({
    mutationFn: () => submitWork(id, submission),
    onSuccess: () => {
      // Handle success, e.g., show a success message and redirect
      alert("Work submitted successfully!");
    },
    onError: () => {
      // Handle error
      alert("Failed to submit work.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold">Submit Your Work</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="submission"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Submission Link
          </label>
          <div className="mt-1">
            <textarea
              id="submission"
              name="submission"
              rows={4}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
