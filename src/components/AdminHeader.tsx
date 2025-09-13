import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "./Container";
import Logo from "./Logo";
import { supabase } from "../lib/supabaseClient";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname.startsWith('/login');

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch {}
    navigate('/login', { replace: true });
  }

  return (
    <header className="w-full bg-[#0B1636]">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0">
          <div className="flex items-center gap-3 text-brand-400">
            <Logo className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="text-xl font-bold text-white">
                piauí<span className="text-gray-300 font-light">gov</span>
                tech
              </div>
            </div>
          </div>
        </Link>
        {!isLogin && (
          <button
            onClick={handleSignOut}
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-brand-300 text-white/80 cursor-pointer"
          >
            Sair
          </button>
        )}
      </Container>
    </header>
  );
}
