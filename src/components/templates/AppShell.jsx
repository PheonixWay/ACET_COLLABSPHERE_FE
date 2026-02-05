import { Outlet } from 'react-router-dom'
import Header from '../organisms/Header'
import Sidebar from '../organisms/Sidebar'
import Footer from '../organisms/Footer'
export default function AppShell(){ return (<div className="min-h-dvh flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"><Header /><div className="container-px flex-1"><div className="flex gap-8 py-6"><Sidebar /><main className="flex-1"><Outlet /></main></div></div><Footer /></div>) }
