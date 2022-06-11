/* eslint-disable indent */
import data from '../data/recipes.js'
import RecipeCard from './RecipeCard.js'
import TagSelector from './TagSelector.js'
import TagFactory from '../factories/tagFactory.js'
import * as ModalAccessibility from '../utils/modalAccessibility.js'
import { CreaE, QS, QSAll, SetAt } from '../utils/domUtils.js'

export default class SearchForm {
  constructor() {
    this.$wrapperSearch = CreaE('div')
    SetAt('search', this.$wrapperSearch)
    this.filteredRecipes = []
    this.error = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...'
  }

  getSelectors = () => {
    const ingTag = []
    const appTag = []
    const ustTag = []

    QSAll('.selectedTag > span').forEach((span) => {
      const tagType = span.getAttribute('class')
      const value = span.getAttribute('value')
      switch (tagType) {
        case 'ingTag':
          ingTag.push(value)
          break
        case 'appTag':
          appTag.push(value)
          break
        case 'ustTag':
          ustTag.push(value)
          break
        default:
          throw error
      }
    })

    return [ingTag, appTag, ustTag]
  }

  //* ******************** DISPLAY MESSAGES  ***********************************/
  // clear validation message
  clearValidationMessage(element) {
    element.setAttribute('data-error-visible', 'false')
    element.setAttribute('data-error', '')
    QS('#errorMessage').style.display = 'none'
  }

  // set validation message
  setValidationMessage(element, message) {
    element.setAttribute('data-error-visible', 'true')
    element.setAttribute('data-error', message)
    QS('#gallery').innerHTML = ''
    QS('#errorMessage').style.display = 'flex'
  }

  isIncluded(searchIn, searchFor) {
    if (searchIn.includes(searchFor) || searchFor == null) return true
    return false
  }

  renderGallery() {
    const search = this.$wrapperSearch
    const searchField = search.querySelector('.input-field')
    const searchValue = searchField.value.toLowerCase()
    QS('#gallery').innerHTML = ''
    this.filteredRecipes = []
    // Get Tags Selectors
    const tagsSelectors = this.getSelectors()
    const ingTags = tagsSelectors[0].join()
    const appTags = tagsSelectors[1].join()
    const ustTags = tagsSelectors[2].join()

    // Filter search
    data.forEach((recipe) => {
      const ingredients = recipe.ingredients.map((item) => item.ingredient).join()
      const recipeIn = `${recipe.name} ${ingredients} ${recipe.description}`.toLowerCase()
      const isSearchIncluded = this.isIncluded(recipeIn, searchValue)
      const isIngIncluded = this.isIncluded(ingredients.toLowerCase(), ingTags)
      const isAppIncluded = this.isIncluded(recipe.appliance.toLowerCase(), appTags)
      console.log(recipe.appliance, ' /n', appTags)
      const isUstIncluded = this.isIncluded(recipe.ustensils.map((item) => item).join(), ustTags)
      console.log(isSearchIncluded, ' /n', isIngIncluded, ' /n', isAppIncluded, ' /n', isUstIncluded)
      if (isSearchIncluded && isIngIncluded && isAppIncluded && isUstIncluded) {
        const card = new RecipeCard(recipe)
        document.querySelector('#gallery').appendChild(card.getRecipeCard())
        this.filteredRecipes.push(recipe)
      }
    })
    if (this.filteredRecipes.length) this.clearValidationMessage(search)
    else {
      this.setValidationMessage(search, this.error)
    }
  }

  searchValidation() {
    const search = this.$wrapperSearch
    const searchField = search.querySelector('.input-field')
    const selectors = this.getSelectors()
    const isSelectorsNotEmpty = selectors[0].length + selectors[1].length + selectors[2].length

    if (searchField.value.length >= 3 || isSelectorsNotEmpty) {
      this.renderGallery()
    } else {
      this.setValidationMessage(search, this.error)
    }
  }

  //* ******************** ONSEARCH EVENTS  ***********************************/
  onSearch() {
    const search = this.$wrapperSearch
    const searchField = search.querySelector('.input-field')
    const searchButton = search.querySelector('.btn-search')
    // Search management
    searchButton.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.searchValidation()
    })
    searchField.addEventListener('input', () => {
      this.searchValidation()
    })
    ModalAccessibility.onEnterClick(searchButton)

    const tag = new TagFactory(data)
    new TagSelector(tag.getTagsList('ING'), 'ING').render('ingredients')
    new TagSelector(tag.getTagsList('APP'), 'APP').render('appareils')
    new TagSelector(tag.getTagsList('UST'), 'UST').render('ustensils')
  }

  searchRender() {
    // Generate the media cards
    let dom = ''
    dom += `
            <form  id="searchForm" action="index.html" onsubmit="searchValidation();" novalidate></form>
                <input type="text" class="input-field" placeholder="Rechercher un recette" />
                <button class="btn-search" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 
                      4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                    <span class="sr-only">Rechercher</span>
                </button>
            </form>`

    this.$wrapperSearch.innerHTML = dom
    this.onSearch()
    return this.$wrapperSearch
  }
}
