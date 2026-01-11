import marker from "../assets/marker.png"

function Entry({ img, title, country, googleMapsLink, dates, text }) {
    return (
        <section className="section">
            <img className="section__img" src={img.src} alt={img.alt}/>
            <div className="section__info">
                <div className="section__location">
                    <img className="section__location__marker" src={marker} alt="Marker image"/>
                    <span className="section__location__name">{country}</span>
                    <a className="section__location__link" href={googleMapsLink} target="_blank">View on Google Maps</a>
                </div>
                <h2 className="section__h2">{title}</h2>
                <p className="section__dates">{dates}</p>
                <p className="section__p">{text}</p>
            </div>
        </section>
    )
}

export default Entry