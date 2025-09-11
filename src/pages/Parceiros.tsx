import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from '../components/ui/shadcn-io/marquee'
import Container from '../components/Container'
import logoFADEX from '../assets/img/logoFADEX.svg'
import logoGovPiaui from '../assets/img/logoGovPiaui.svg'
import logoSIA from '../assets/img/logoSIA.svg'
import logoSSP from '../assets/img/logoSSP.svg'

export default function Parceiros() {
  const logos = [
    { src: logoFADEX, alt: 'FADEX' },
    { src: logoGovPiaui, alt: 'Governo do Piauí' },
    { src: logoSIA, alt: 'SIA' },
    { src: logoSSP, alt: 'SSP' },
  ]
  const looped = [...logos, ...logos, ...logos]
  return (
    <section className="relative flex flex-col pb-22">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      <Container>
        {/* Cabeçalho no topo (padrão Ecossistema) */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/70">Parceiros</div>
        </div>

        <div className="mt-8 md:mt-12">
          <div className="flex w-full items-center justify-center">
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent>
              {looped.map((item, index) => {
                const posClass =
                  item.alt === 'FADEX' ? 'object-[50%_45%]' :
                  item.alt === 'Governo do Piauí' ? 'object-[55%_45%]' :
                  item.alt === 'SSP' ? 'object-[55%_45%]' :
                  'object-center'
                return (
                  <MarqueeItem className="mx-3 flex-shrink-0" key={`${item.alt}-${index}`}>
                    <div className="relative flex h-32 w-[16rem] items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md sm:h-40 sm:w-[20rem] md:h-48 md:w-[26rem] lg:h-52 lg:w-[30rem] overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={`h-full w-full object-contain ${posClass} opacity-90 transition-opacity duration-200 ease-out hover:opacity-100`}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
                    </div>
                  </MarqueeItem>
                )
              })}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </Container>
    </section>
  )
}
