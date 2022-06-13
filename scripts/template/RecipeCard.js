import { CreaE, SetAt, QS } from '../utils/domUtils.js'

export default class RecipeCard {
  constructor(recipe) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = recipe
    this.id = id
    this.name = name
    this.servings = servings
    this.ingredients = ingredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensils = ustensils
    // DOM elements
    this.gallery = QS('#gallery')
    this.$wrapperCard = CreaE('article')
    SetAt('card', this.$wrapperCard)
  }

  //* ********************  RESET GALLERY CONTENT  ***********************************/
  clearWrappers() {
    this.gallery.innerHTML = ''
  }

  //* ********************  GENERATE THE CARDS  ***********************************/
  render() {
    let dom = ''
    dom += `
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="image" alt="Image emplacement" />
            <div class="container">
                <h2>${this.name}</h2><h3><span class="far fa-clock" /> ${this.time} min</h3>
            <div class="recipe"><ul class="ingredients" >`
    this.ingredients.forEach((ingredient) => {
      const quantity = ingredient.quantity ? ingredient.quantity : ''
      let unit = ingredient.unit ? ingredient.unit : ''
      unit = unit.length > 3 ? ` ${unit}` : unit
      dom += `<li><strong>${ingredient.ingredient} :</strong> ${quantity}${unit}</li>`
    })
    dom += `</ul><p class="description">${this.description}</p></div></div>`

    this.$wrapperCard.innerHTML = dom
    return this.$wrapperCard
  }
}
