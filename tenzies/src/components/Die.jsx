import '../styles/Die.css'

export default function Die(props) {
    const {
        holdDie,
        value,
        isHeld,
        id
    } = props

    return (
        <button 
            style={{backgroundColor: isHeld ? '#59E391' : '#FFF'}} 
            className="die" 
            onClick={() => holdDie(id)}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
        >{value}</button>
    )
}