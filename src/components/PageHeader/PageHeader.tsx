import logo from '@assets/Rick_and_Morty.svg'

import './PageHeader.scss'

export const PageHeader = () => (
  <header className="page-header border-b border-gray-400">
    <a href="/">
      <img className="page-header__img" src={logo} alt="Логотип" />
    </a>
  </header>
)
