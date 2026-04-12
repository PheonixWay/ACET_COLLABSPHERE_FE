import { FiMail, FiTag, FiArrowRight } from "react-icons/fi";

export default function InfluencerCard({ data, onViewDetails }) {
  const { name, email, influencerProfile } = data
  const primaryNiche = influencerProfile?.socialsInfo?.primaryNiche || 'Not Set'

  return (
    <div className="card bg-base-100 dark:bg-base-800 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div className="card-body p-5">
        <div className="flex items-center gap-4">
            <div className="avatar placeholder flex-shrink-0">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <span className="text-xl">{name.substring(0, 2).toUpperCase()}</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white truncate" title={name}>{name}</h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <FiMail />
                    <span className="truncate" title={email}>{email}</span>
                </div>
            </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FiTag className="text-primary"/>
            <strong>Niche:</strong>
            <span className="badge badge-outline badge-primary">{primaryNiche}</span>
        </div>
      </div>
      <div className="card-actions justify-end p-5 border-t border-base-200 dark:border-base-700">
        <button className="btn btn-ghost btn-sm gap-2" onClick={() => onViewDetails?.(data)}>
          View Profile <FiArrowRight />
        </button>
      </div>
    </div>
  )
}
