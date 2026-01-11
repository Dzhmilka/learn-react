export default function Meme(props) {
    const {
        imageUrl,
        topText,
        bottomText
    } = props
    return (
        <div className="meme">
            <img src={imageUrl} />
            <span className="top">{topText}</span>
            <span className="bottom">{bottomText}</span>
        </div>
    )
}