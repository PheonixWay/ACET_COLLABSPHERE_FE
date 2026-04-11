import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Sidebar from "../organisms/Sidebar";
import Footer from "../organisms/Footer";
export default function AppShell() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
