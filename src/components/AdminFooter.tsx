import Container from './Container'
import Logo from './Logo'

export default function AdminFooter() {
  return (
    <footer className="bg-[#0B1636] text-white">
      <Container className="h-14 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-auto text-brand-400" />
          <div className="font-semibold">piauí<span className="font-light text-white/80">gov</span>tech</div>
        </div>
        <div className="text-white/70">© 2025 – Todos os direitos reservados</div>
      </Container>
    </footer>
  )
}

