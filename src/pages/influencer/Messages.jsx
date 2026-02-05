import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { BRANDS, INFLUENCER_LIST, CHATS_INFLUENCER, CHATS_BRAND } from '../../data/mockMessages'
import Avatar from '../../components/atoms/Avatar'

export default function Messages() {
  const { user } = useAuth()
  const isBrand = user?.role === 'brand'
  
  // State
  const [activeId, setActiveId] = useState(null) // ID of active chat
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  
  // Load initial list based on role
  const initialList = isBrand ? INFLUENCER_LIST : BRANDS
  const initialChats = isBrand ? CHATS_BRAND : CHATS_INFLUENCER
  
  // Local state for chat history (so we can "send" messages)
  const [chatHistory, setChatHistory] = useState(initialChats)
  
  // Auto-scroll to bottom
  const scrollRef = useRef(null)

  useEffect(() => {
    if (initialList.length > 0 && !activeId) {
      setActiveId(initialList[0].id)
    }
  }, [initialList, activeId])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, activeId])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage = {
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setChatHistory(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage]
    }))
    setInput('')

    // Simulate Reply
    setTimeout(() => {
      const reply = {
        from: 'them',
        text: 'Got it! Will review shortly. 👍',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }
      setChatHistory(prev => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), newMessage, reply]
      }))
    }, 2000)
  }

  // Filter Sidebar List
  const filteredList = initialList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const activeContact = initialList.find(c => c.id === activeId)
  const currentMessages = chatHistory[activeId] || []

  return (
    <div className="card h-[calc(100vh-140px)] min-h-[600px] p-0 grid grid-cols-1 md:grid-cols-[350px_1fr] overflow-hidden animate-fadeIn">
      
      {/* --- LEFT SIDEBAR --- */}
      <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
        
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3">Messages</h2>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input 
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-sky-500/50 transition"
              placeholder="Search conversations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredList.map(contact => {
            const msgs = chatHistory[contact.id] || []
            const lastMsg = msgs[msgs.length - 1]
            const isActive = activeId === contact.id

            return (
              <button
                key={contact.id}
                onClick={() => setActiveId(contact.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  isActive 
                    ? 'bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent'
                }`}
              >
                <div className="relative">
                    <Avatar name={contact.name} />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-semibold truncate ${isActive ? 'text-sky-700 dark:text-sky-300' : 'text-gray-900 dark:text-white'}`}>
                        {contact.name}
                    </span>
                    <span className="text-xs text-gray-400">{lastMsg?.time || '12:00 PM'}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                    {lastMsg?.from === 'me' && <span className="text-sky-500">✓</span>}
                    {lastMsg?.text || 'Start a conversation'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* --- RIGHT CHAT AREA --- */}
      <div className="flex flex-col bg-gray-50/50 dark:bg-gray-900/50 relative">
        
        {/* Chat Header */}
        {activeContact ? (
          <div className="h-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-6">
             <div className="flex items-center gap-4">
                <Avatar name={activeContact.name} />
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{activeContact.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online now
                    </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button className="btn btn-ghost btn-sm text-gray-500" title="Call">📞</button>
                <button className="btn btn-ghost btn-sm text-gray-500" title="Video">🎥</button>
                <button className="btn btn-ghost btn-sm text-gray-500" title="Info">ℹ️</button>
             </div>
          </div>
        ) : (
          <div className="h-20 border-b bg-white"></div>
        )}

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {currentMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <div className="text-4xl">👋</div>
                <p>Say hello to start collaborating!</p>
                <div className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                    Pro Tip: Ask for a brief before accepting.
                </div>
            </div>
          )}

          {/* Date Divider */}
          <div className="flex justify-center">
             <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Today</span>
          </div>

          {currentMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm relative group ${
                   msg.from === 'me' 
                   ? 'bg-sky-600 text-white rounded-tr-none' 
                   : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-none'
               }`}>
                  <p className="text-base leading-relaxed">{msg.text}</p>
                  <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 opacity-70 ${msg.from === 'me' ? 'text-sky-100' : 'text-gray-400'}`}>
                      {msg.time || 'Now'}
                      {msg.from === 'me' && <span>{msg.status === 'read' ? '✓✓' : '✓'}</span>}
                  </div>
               </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSend} className="flex items-end gap-3">
            <button type="button" className="p-3 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition" title="Attach File">
                📎
            </button>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2">
                <input 
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 py-2"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="button" className="text-gray-400 hover:text-gray-600 px-2">😊</button>
            </div>
            <button 
                disabled={!input.trim()}
                className="p-4 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:hover:bg-sky-600 transition shadow-lg shadow-sky-200 dark:shadow-none"
            >
                ➤
            </button>
          </form>
          <div className="text-center mt-2 text-xs text-gray-400">
             Press Enter to send • Shift + Enter for new line
          </div>
        </div>

      </div>
    </div>
  )
}