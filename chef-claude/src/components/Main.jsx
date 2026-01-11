import { useState, useRef, useEffect } from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"
import "../styles/Main.css"

function Main() {
    const [ingredients, setIngredients] = useState(["eggs", "butter", "sausage", "bread"])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    const [recipe, setRecipe] = useState(false)

    async function getRecipe() {
        const recipeFromAI = await getRecipeFromMistral(ingredients)
        console.log(recipeFromAI)
        setRecipe(recipeFromAI)
    }

    const recipeSection = useRef(null)

    useEffect(() => {
        if (!!recipeSection.current && !!recipe) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    return (
        <main className="main">
            <form className="form" action={addIngredient}>
                <input className="form__input" placeholder="e.g. oregano" aria-label="Add ingredient" name="ingredient"></input>
                <button className="form__button">Add ingredient</button>
            </form>
            {
                ingredients.length > 0 && 
                <IngredientsList ingredients={ingredients} getRecipe={getRecipe} ref={recipeSection}/>
            }
            {
                !!recipe &&
                <ClaudeRecipe recipe={recipe} />
            }
        </main>
    )
}

export default Main