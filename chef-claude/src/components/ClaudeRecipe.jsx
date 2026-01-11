import Markdown from 'react-markdown'
import '../styles/ClaudeRecipe.css'

function ClaudeRecipe({ recipe }) {
    return (
        <section className='recipe-container'>
            <h2>Chef Claude Recommends:</h2>
            <Markdown>{recipe}</Markdown>
        </section>
    )
}

export default ClaudeRecipe