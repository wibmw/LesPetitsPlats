import * as Data from '../data/recipes.js'
import SearchForm from '../template/SearchForm.js'
import RecipeCard from '../template/RecipeCard.js'

class IndexPage {
    async displayIndexData(recipes) {
        // console.log(recipes)
        if (recipes) {
            // Generate Photographers Card
            recipes.forEach((recipe) => {
                // console.log(recipe)
                const card = new RecipeCard(recipe)
                // display photographer's informations
                document.querySelector('#gallery').appendChild(card.getRecipeCard())
            })
        }
    }

    init() {
        // Search Form Render
        document.querySelector('#searchSection').appendChild(new SearchForm().searchRender())
        // Get recipes
        this.displayIndexData(Data.recipes)
    }
}

const page = new IndexPage()
page.init()
