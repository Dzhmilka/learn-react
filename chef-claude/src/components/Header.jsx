import chefLogo from "../assets/chef-claude-icon.png"
import "../styles/Header.css"

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={chefLogo} alt="Chef logo" />
            <h1 className="header__h1">Chef Claude</h1>
        </header>
    )
}

export default Header