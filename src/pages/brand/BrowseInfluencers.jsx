import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiUsers, FiInstagram, FiYoutube, FiPhone, FiMail, FiTag, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import InfluencerCard from '../../components/molecules/InfluencerCard'
import SearchBar from '../../components/molecules/SearchBar'
import api from '../../services/api'

const SkeletonCard = () => (
    <div className="card bg-base-100 dark:bg-base-800 shadow-md">
        <div className="card-body p-5">
            <div className="flex items-center gap-4 animate-pulse">
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4"></div>
                    <div className="skeleton h-3 w-1/2"></div>
                </div>
            </div>
            <div className="skeleton h-4 w-1/3 mt-4"></div>
        </div>
        <div className="card-actions justify-end p-5 border-t border-base-200 dark:border-base-700">
            <div className="skeleton h-8 w-24"></div>
        </div>
    </div>
)

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

  return (
    <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiUsers className="text-primary"/> Browse Influencers
            </h1>
        </div>
        <SearchBar
            placeholder="Search influencers by name or niche..."
            onSearch={setQ}
        />
        {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
        ) : error ? (
            <div className="text-center py-20 text-red-500">{error}</div>
        ) : list.length === 0 ? (
            <div className="text-center py-20 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <FiSearch className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-white">No Influencers Found</h3>
                <p className="mt-2 text-sm text-gray-500">Your search for "{q}" did not match any influencers.</p>
            </div>
        ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
                    <div className="avatar placeholder mx-auto">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                            <span className="text-4xl">{selectedInfluencer.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-4">{selectedInfluencer.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1.5 mt-1">
                        <FiMapPin/> {selectedInfluencer.influencerProfile?.personalInfo?.city || 'City not specified'}, {selectedInfluencer.influencerProfile?.personalInfo?.country || 'India'}
                    </p>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                    <div className="flex items-center gap-3">
                        <FiMail className="text-primary"/>
                        <span className="font-semibold">Email:</span>
                        <a href={`mailto:${selectedInfluencer.email}`} className="text-gray-600 dark:text-gray-300 hover:underline">{selectedInfluencer.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiPhone className="text-primary"/>
                        <span className="font-semibold">Phone:</span>
                        <span className="text-gray-600 dark:text-gray-300">{selectedInfluencer.influencerProfile?.personalInfo?.phone || 'Not Provided'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiTag className="text-primary"/>
                        <span className="font-semibold">Primary Niche:</span>
                        <span className="badge badge-lg badge-outline badge-primary">{selectedInfluencer.influencerProfile?.socialsInfo?.primaryNiche || 'Not Set'}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiCheckCircle className="text-primary mt-1"/>
                        <span className="font-semibold">Secondary Niches:</span>
                        <div className="flex flex-wrap gap-1">
                            {selectedInfluencer.influencerProfile?.socialsInfo?.secondaryNiches?.length > 0 ?
                                selectedInfluencer.influencerProfile.socialsInfo.secondaryNiches.map(n => <span key={n} className="badge badge-ghost">{n}</span>) :
                                <span className="text-gray-600 dark:text-gray-300">None</span>
                            }
                        </div>
                    </div>
                    <div className="divider">Socials</div>
                    <div className="flex items-center gap-3">
                        <FiInstagram className="text-primary"/>
                        <span className="font-semibold">Instagram:</span>
                        <a href={selectedInfluencer.influencerProfile?.socialsInfo?.instagram?.handle} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:underline">
                            {selectedInfluencer.influencerProfile?.socialsInfo?.instagram?.handle || 'Not Provided'}
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiYoutube className="text-primary"/>
                        <span className="font-semibold">YouTube:</span>
                        <a href={selectedInfluencer.influencerProfile?.socialsInfo?.youtube?.channelUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:underline">
                            {selectedInfluencer.influencerProfile?.socialsInfo?.youtube?.channelUrl || 'Not Provided'}
                        </a>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}
