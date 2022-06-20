export default class TagFactory {
  constructor(recipes) {
    this.recipes = recipes
  }

  //* ******************** TAGS SORTING  ***********************************/
  sortTags = (tagsList) =>
    tagsList.sort((a, b) => {
      if (a > b) {
        return 1
      }
      if (b > a) {
        return -1
      }
      return 0
    })

  //* ******************** GET UNIQUE TAGS  ***********************************/
  reduceTags = (tagsList) => tagsList.reduce((prev, curr) => [...prev, ...curr])

  //* ******************** GET UNIQUE TAGS  ***********************************/
  setUniqueTags = (tagsList) => [...new Set(tagsList)]

  //* ******************** GET ALL TAGS  ***********************************/
  getAllTags = (tagType) => {
    const error = 'unknow tag type'
    const tags = []
    switch (tagType) {
      case 'ING': {
        // Get all Ingredients
        this.recipes.forEach((recipe) => tags.push(recipe.ingredients.map((item) => item.ingredient.toLowerCase())))
        return this.reduceTags(tags)
      }
      case 'APP': {
        // Get all Appareils
        this.recipes.forEach((recipe) => tags.push(recipe.appliance.toLowerCase()))
        return tags
      }
      case 'UST': {
        // Get all Ustensiles
        this.recipes.forEach((recipe) => tags.push(recipe.ustensils.map((item) => item.toLowerCase())))
        return this.reduceTags(tags)
      }
      default:
        throw error
    }
  }

  //* ******************** RETURN TAGS LIST  ***********************************/
  getTagsList = (tagType) => this.sortTags(this.setUniqueTags(this.getAllTags(tagType)))
}
