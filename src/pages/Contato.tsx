import Container from '../components/Container'

export default function Contato() {
  return (
      <Container>
        <h1 className="text-3xl font-semibold">Contato</h1>
        <p className="mt-3 text-gray-600">Fale conosco para parcerias, projetos e dúvidas.</p>
        <form className="mt-6 grid max-w-2xl gap-4">
          <div>
            <label className="block text-sm text-gray-700">Nome</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">E-mail</label>
            <input type="email" className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="voce@exemplo.com" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Mensagem</label>
            <textarea rows={5} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Como podemos ajudar?" />
          </div>
          <div>
            <button className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">Enviar</button>
          </div>
        </form>
      </Container>
  )
}
