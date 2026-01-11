import reactLogo from '/src/assets/react-logo.png'

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <img className="header__img" src={reactLogo} width="500px" height="500px" alt="React logo"/>
        <span className="header__span">ReactFacts</span>
      </nav>
    </header>
  )
}

export default Header