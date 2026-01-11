import globe from "../assets/globe.png"

function Header() {
    return (
        <header className="header">
            <img src={globe} className="header__img" alt="globe" width="72px" height="72px"/>
            <h1 className="header__h1">my travel journal.</h1>
        </header>
    )
}

export default Header