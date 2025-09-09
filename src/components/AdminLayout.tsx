import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <AdminHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


