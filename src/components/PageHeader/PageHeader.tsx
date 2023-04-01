import logo from '@assets/header-logo.svg'

import './PageHeader.scss'

export const PageHeader = () => (
  <header className="page-header">
    <a href="/">
      <img className="page-header__img" src={logo} alt="Логотип" />
    </a>
  </header>
)
