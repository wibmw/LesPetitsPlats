import data from '../data/recipes.js'
import SearchForm from '../template/SearchForm.js'
import RecipeCard from '../template/RecipeCard.js'

class IndexPage {
  displayIndexData(recipes) {
    if (recipes) {
      // Generate Recipes Cards
      recipes.forEach((recipe) => {
        const card = new RecipeCard(recipe)
        document.querySelector('#gallery').appendChild(card.render())
      })
    }
  }

  init() {
    // Display Search & Tags Sections
    document.querySelector('#searchSection').prepend(new SearchForm().display())
    // Display All Recipes
    this.displayIndexData(data)
  }
}

const page = new IndexPage()
page.init()
