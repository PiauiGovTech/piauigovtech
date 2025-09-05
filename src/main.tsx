import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Contato from './pages/Contato'
import NotFound from './pages/NotFound'
import QuemSomos from './pages/QuemSomos'
import Ecossistema from './pages/Ecossistema'
import ParaQuem from './pages/ParaQuem'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'quemsomos', element: <QuemSomos /> },
      { path: 'ecossistema', element: <Ecossistema /> },
      { path: 'paraquem', element: <ParaQuem /> },
      { path: 'projetos', element: <Projetos /> },
      { path: 'contato', element: <Contato /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

          // <NavLink to="/">Início</NavLink>
          // <NavLink to="/quemsomos">Quem somos</NavLink>
          // <NavLink to="/ecossistema">Ecossistema</NavLink>
          // <NavLink to="/paraquem">Para Quem</NavLink>
          // <NavLink to="/projetos">Projetos</NavLink>