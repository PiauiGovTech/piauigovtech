import Container from '../components/Container'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <div className="text-7xl font-bold text-brand-100">404</div>
        <h1 className="mt-3 text-2xl font-semibold">Página não encontrada</h1>
        <p className="mt-2 text-gray-600">A página que você procura não existe.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-md bg-brand px-4 py-2 text-white hover:bg-brand-600">
          Voltar ao início
        </Link>
      </Container>
    </section>
  )
}
