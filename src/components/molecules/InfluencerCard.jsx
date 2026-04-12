export default function InfluencerCard({ data, onViewDetails }) {
  const { name, email, influencerProfile } = data
  const primaryNiche = influencerProfile?.socialsInfo?.primaryNiche || 'N/A'

  return (
    <div className="card p-6 min-h-[220px]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-base text-gray-500">{email}</div>
          <div className="text-base text-gray-500">
            Niche: {primaryNiche}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button className="btn btn-primary" onClick={() => onViewDetails?.(data)}>
          👁️ View Details
        </button>
      </div>
    </div>
  )
}
