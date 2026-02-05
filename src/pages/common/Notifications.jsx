import { NOTIFICATIONS } from '../../data/mockNotifications'
export default function Notifications(){ return (<div className="card p-6"><h2 className="text-xl font-semibold">🔔 Notifications</h2><ul className="mt-4 space-y-3">{NOTIFICATIONS.map(n=>(<li key={n.id} className="flex items-start gap-3"><span className="badge">{n.time}</span><span>{n.text}</span></li>))}</ul></div>) }
