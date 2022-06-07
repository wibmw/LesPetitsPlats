import * as Data from '../data/recipes.js'
import RecipeCard from './RecipeCard.js'
import * as ModalAccessibility from '../utils/modalAccessibility.js'
import {
    CreaE, QS, SetAt, Tog, ApC,
} from '../utils/domUtils.js'

export default class SearchForm {
    constructor() {
        this.$wrapperSearch = CreaE('div')
        SetAt('search', this.$wrapperSearch)
        this.filteredRecipes = []
    }

    //* ******************** DISPLAY MESSAGES  ***********************************/
    // clear validation message
    clearValidationMessage(element) {
        element.setAttribute('data-error-visible', 'false')
        element.setAttribute('data-error', '')
    }

    // set validation message
    setValidationMessage(element, message) {
        element.setAttribute('data-error-visible', 'true')
        element.setAttribute('data-error', message)
    }

    searchValidation() {
        const search = this.$wrapperSearch
        const searchField = search.querySelector('.input-field')
        if (searchField.value.length >= 3) {
            console.log(searchField.value.length, ' /n', searchField.value)
            const searchValue = searchField.value.toLowerCase()
            QS('#gallery').innerHTML = ''
            this.filteredRecipes = []
            // Filter search
            Data.recipes.forEach((recipe) => {
                const ingredients = recipe.ingredients.map((item) => item.ingredient).join(',').replaceAll(',', ' ')
                const searchIn = `${recipe.name} ${ingredients} ${recipe.description}`.toLowerCase()
                if (searchIn.includes(searchValue)) {
                    const card = new RecipeCard(recipe)
                    document.querySelector('#gallery').appendChild(card.getRecipeCard())
                    this.filteredRecipes.push(recipe)
                    console.log(searchField.value.length, ' /n', searchValue)
                }
            })
            console.log(this.filteredRecipes.length)
            this.filteredRecipes.length ? this.clearValidationMessage(search) : this.setValidationMessage(search, 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...')
        } else {
            console.log('error')
            this.setValidationMessage(search, 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...')
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
        searchField.addEventListener('change', () => {
            this.searchValidation()
        })
        ModalAccessibility.onEnterClick(searchButton)
    }

    searchRender() {
        // Generate the media cards
        let dom = ''
        dom += `
            <form  id="searchForm" action="index.html" onsubmit="searchValidation();" novalidate></form>
                <input type="text" class="input-field" role="textbox" aria-autocomplete="list" placeholder="Rechercher un recette" />
                <button class="btn-search" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                    <span class="sr-only">Rechercher</span>
                </button>
            </form>`

        this.$wrapperSearch.innerHTML = dom
        this.onSearch()
        return this.$wrapperSearch
    }
}
