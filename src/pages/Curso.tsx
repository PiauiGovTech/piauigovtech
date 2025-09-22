import Container from '../components/Container'
import piaui from '../assets/img/piaui.jpg'
import gov from '../assets/img/gov.png'
import tech from '../assets/img/tech.jpg'

export default function Curso() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col items-start gap-8">
          {/* Linha com as três imagens lado a lado, todas do mesmo tamanho */}
          <div className="flex flex-row items-center gap-4">
            <img
              src={piaui}
              alt="Imagem do curso"
              className="w-64 h-auto rounded-2xl shadow-lg object-cover"
            />
            <img
              src={gov}
              alt="Logo Gov"
              className="w-64 h-auto rounded-2xl shadow-lg object-cover"
            />
            <img
              src={tech}
              alt="Logo Tech"
              className="w-64 h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
          {/* Conteúdo abaixo das imagens */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-white mt-10">Curso</h1>
            <p className="mt-4 text-white/80">
              Este curso ensina conceitos de React, Tailwind e desenvolvimento web moderno.
            </p>

            <ul className="mt-6 list-disc list-inside text-white/90">
              <li>Introdução ao React</li>
              <li>Componentes e Props</li>
              <li>React Router e navegação</li>
              <li>Tailwind CSS: estilização rápida</li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold text-white">Módulo 1: Fundamentos</h2>
            <ul className="mt-2 list-disc list-inside text-white/90">
              <li>Introdução ao React</li>
              <li>JSX e Componentes</li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold text-white">Módulo 2: Avançado</h2>
            <ul className="mt-2 list-disc list-inside text-white/90">
              <li>React Router</li>
              <li>Hooks básicos</li>
            </ul>
            <p className="mt-4 text-white/80">
              Este curso ensina <span className="text-orange-400 font-bold">React</span>, <span className="text-yellow-300 font-bold">Tailwind</span> e desenvolvimento web moderno.
            </p>

            <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-green-700 text-black font-semibold rounded-lg transition transform hover:scale-105">
              Inscreva-se
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}