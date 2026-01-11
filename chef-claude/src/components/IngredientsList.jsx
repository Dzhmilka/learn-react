function IngredientsList({ ingredients, getRecipe, ref }) {
    const ingredientsList = ingredients.map(ingredient => <li className="section--ingredients__li" key={ingredient}>{ingredient}</li>)

    return (
        <section className="section--ingredients">
            <h2 className="section--ingredients__h2">Ingredients on hand:</h2>
            <ul>
                {ingredientsList}
            </ul>
            {
                ingredients.length >= 4 &&
                <div className="section--ingredients__div" ref={ref}>
                    <div className="section--ingredients__div__div">
                        <h3 className="section--ingredients__div__div__h3">Ready for a recipe?</h3>
                        <p className="section--ingredients__div__div__p">Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button className="section--ingredients__div__button" onClick={getRecipe}>Get a recipe</button>
                </div>
            }
        </section>
    )
}

export default IngredientsList