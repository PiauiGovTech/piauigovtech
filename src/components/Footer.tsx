import Container from './Container'
import Logo from './Logo'
import bgFrame from '../assets/img/Frame-2147234215.jpg'
import group2 from '../assets/img/Group-2.png'
import { scrollToSection } from '../utils/scrollToSection'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const goToEcosystem: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToSection('para-quem')
    } else {
      navigate('/#para-quem')
    }
  }

  const goTop: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToSection('inicio')
    } else {
      navigate('/')
    }
  }

  return (
    <footer
      className="relative flex min-h-[calc(100vh)] flex-col overflow-hidden bg-[#071025] text-white bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgFrame})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
    >
      {/* Dark overlay + soft radial glows (cinza sutil) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_10%_10%,rgba(200,210,220,0.18),transparent),radial-gradient(50%_40%_at_95%_15%,rgba(200,210,220,0.16),transparent)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#050a14]/92" />

      {/* Right-side overlay image occupying full height */}
      <img
        src={group2}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-auto object-contain"
        loading="lazy"
      />

      {/* CTA Section */}
      <Container className="flex-1 py-16 md:py-24 flex items-center">
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Dê o primeiro passo para
            <br />
            fazer parte do Piauí Gov Tech
          </h2>
          <p className="mt-5 max-w-prose text-white/80">
            Descubra como integrar o ecossistema e colaborar com soluções inovadoras para os desafios do estado.
          </p>

          <a
            href="/#para-quem"
            onClick={goToEcosystem}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-[#2c97ab] bg-[#5dd0df] px-6 py-3 text-base font-semibold text-[#0c2235] hover:translate-y-[1px] hover:shadow-[0_3px_0_0_rgba(44,151,171,0.7)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(44,151,171,0.7)]"
          >
            Faça parte do ecossistema
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L17.94 11H4.5a.75.75 0 010-1.5h13.44l-4.47-4.47a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </Container>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Brand + Back to top */}
      <Container className="py-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Logo className="h-8 w-auto text-brand-400" />
            <div className="text-white/90">
              <span className="font-semibold">piauí</span>
              <span className="text-white/70">gov</span>
              <span className="font-semibold">tech</span>
              {/* <span className="mx-3 inline-block h-4 w-px bg-white/20 align-middle" />
              <span className="text-white/80">Ambiente de inovação governamental</span> */}
            </div>
          </div>
          <a
            href="#inicio"
            onClick={goTop}
            className="absolute right-2 bottom-2 md:right-6 md:bottom-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white hover:translate-y-[1px] hover:shadow-[0_3px_0_0_rgba(44,151,171,0.7)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(44,151,171,0.7)]"
          >
            Voltar ao topo
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#4fd0df] text-[#082032]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                <path fillRule="evenodd" d="M12 4a.75.75 0 01.53.22l6 6a.75.75 0 11-1.06 1.06L12 6.81 6.53 11.28a.75.75 0 11-1.06-1.06l6-6A.75.75 0 0112 4z" clipRule="evenodd" />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/70">
          © {new Date().getFullYear()} – Todos os direitos reservados
        </div>
      </Container>

      {/* Decorative rings at bottom-right (subtle, cinza) */}
      <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 aspect-square w-[900px] opacity-20 [background:radial-gradient(closest-side,transparent_55%,rgba(200,210,220,0.25)_56%,transparent_57%),radial-gradient(closest-side,transparent_65%,rgba(200,210,220,0.25)_66%,transparent_67%),radial-gradient(closest-side,transparent_75%,rgba(200,210,220,0.25)_76%,transparent_77%)]" />
    </footer>
  )
}
