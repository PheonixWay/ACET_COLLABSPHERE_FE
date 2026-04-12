import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'

export default function InfluencerProfile() {
  const { id } = useParams()
  const [influencer, setInfluencer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/influencers/${id}`)
        setInfluencer(response.data.data)
      } catch (err) {
        setError('Failed to load influencer profile.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchInfluencer()
    }
  }, [id])

  if (loading) {
    return <div className="text-center py-20">Loading profile...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  if (!influencer) {
    return <div className="card p-6">Influencer not found.</div>
  }

  const { name, email, influencerProfile } = influencer
  const {
    niche,
    followers,
    engagementRate,
    bio,
    socialMediaLinks,
    pastCollaborations,
  } = influencerProfile || {}

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="text-base text-gray-600">
          Niche: {niche?.join(', ') || 'N/A'}
        </div>
        <p className="mt-4">{bio || 'No bio available.'}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">📇 Contact & Social</h3>
            <p className="text-base mt-1">Email: {email}</p>
            <div className="text-base mt-1">
              Socials:
              {socialMediaLinks && Object.keys(socialMediaLinks).length > 0 ? (
                <ul className="list-disc pl-5">
                  {Object.entries(socialMediaLinks).map(([platform, link]) => (
                    <li key={platform}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline"
                      >
                        {platform}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                ' N/A'
              )}
            </div>
            <Link to="/app/messages" className="btn btn-primary mt-3">
              💬 Send Message
            </Link>
          </div>
          <div className="rounded-2xl border p-4">
            <h3 className="font-semibold">📊 Performance Metrics</h3>
            <p className="text-base mt-1">
              Followers: {followers ? followers.toLocaleString('en-IN') : 'N/A'}
            </p>
            <p className="text-base">
              Engagement Rate: {engagementRate || 'N/A'}%
            </p>
          </div>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold">⭐ Past Collaborations</h3>
        {pastCollaborations && pastCollaborations.length > 0 ? (
          <ul className="mt-3 list-disc pl-5">
            {pastCollaborations.map((collab, i) => (
              <li key={i} className="text-base">
                <b>{collab.brandName}:</b> {collab.campaignName} (
                {'⭐'.repeat(collab.rating)})
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">No past collaborations listed.</p>
        )}
      </div>
    </div>
  )
}
