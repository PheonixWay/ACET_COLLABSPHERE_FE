import { useEffect, useMemo, useState } from 'react'
import InfluencerCard from '../../components/molecules/InfluencerCard'
import SearchBar from '../../components/molecules/SearchBar'
import api from '../../services/api'

export default function BrowseInfluencers() {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [q, setQ] = useState('')
  const [influencers, setInfluencers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true)
        const response = await api.get('/influencers')
        setInfluencers(response.data.data)
      } catch (err) {
        setError('Failed to load influencers.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInfluencers()
  }, [])

  const handleViewDetails = (influencer) => {
    setSelectedInfluencer(influencer)
    setIsModalOpen(true)
  }

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return influencers
    return influencers.filter(
      (i) =>
        i.name.toLowerCase().includes(s) ||
        i.influencerProfile?.socialsInfo?.primaryNiche?.toLowerCase().includes(s)
    )
  }, [q, influencers])

  if (loading) {
    return <div className="text-center py-20">Loading influencers...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <SearchBar
        placeholder="Search influencers (name, niche)..."
        onSearch={setQ}
      />
      {list.length === 0 && !loading ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">No influencers found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((i) => (
            <InfluencerCard
              key={i._id}
              data={i}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedInfluencer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedInfluencer.name}</h2>
            <div className="space-y-2">
              <p><strong>Phone:</strong> {selectedInfluencer.influencerProfile?.personalInfo?.phone || 'Not Updated'}</p>
              <p><strong>Instagram:</strong> {selectedInfluencer.influencerProfile?.socialsInfo?.instagram?.handle || 'Not Updated'}</p>
              <p><strong>YouTube:</strong> {selectedInfluencer.influencerProfile?.socialsInfo?.youtube?.channelUrl || 'Not Updated'}</p>
            </div>
            <button
              className="btn btn-primary mt-6"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
