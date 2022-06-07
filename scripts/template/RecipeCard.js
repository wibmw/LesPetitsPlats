import * as ModalAccessibility from '../utils/modalAccessibility.js'
import {
    CreaE, QS, SetAt, ApC,
} from '../utils/domUtils.js'

export default class RecipeCard {
    constructor(recipe) {
        const {
            id, name, servings, ingredients, time, description, appliance, ustensils,
        } = recipe
        this.id = id
        this.name = name
        this.servings = servings
        this.ingredients = ingredients
        this.time = time
        this.description = description
        this.appliance = appliance
        this.ustensils = ustensils
        this.$wrapperMedia = CreaE('article')
        SetAt('card', this.$wrapperMedia)
    }

    // Events handler
    mediaEventsHandler() {
        // DOM $Wrapper
        const media = this.$wrapperMedia
        const likes = QS('.likes', media)
        const icone = likes.closest('div')
        let box

        // Buttons
        if (this.type === 'ImageM') {
            box = QS('img', media)
        } else if (this.type === 'VideoM') {
            box = QS('.playMask', media)
        }

        //* ******************** EVENTS ***********************************/
        box.addEventListener('click', () => {
            const item = QS(`li[data-name="item-${this.position}"]`)
            this.type === 'ImageM' ? SetAt('active-item', item) : SetAt('active-item-video', item)
            ModalAccessibility.onOpenLightboxModal()
            QS('#close').focus()
        })
        ModalAccessibility.onEnterClick(box)

        // Likes management
        icone.addEventListener('click', () => {
            const totalLikes = QS('.totalLikes')
            if (this.likes == likes.textContent) {
                likes.textContent = parseInt(likes.textContent) + 1
                totalLikes.textContent = parseInt(totalLikes.textContent) + 1
                icone.classList.add('active-heart')
            } else {
                likes.textContent = parseInt(likes.textContent) - 1
                totalLikes.textContent = parseInt(totalLikes.textContent) - 1
                icone.classList.remove('active-heart')
            }
        })
        ModalAccessibility.onEnterClick(icone)
    }

    getRecipeCard() {
    // Generate the media cards
        let media = ''
        media += `
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="image">
                </img>
                <div class="container">
                    <h2>${this.name}</h2><h3><span class="far fa-clock" /> ${this.time} min</h3>
                    <div class="recipe"><ul class="ingredients" >`
        this.ingredients.forEach((ingredient) => {
            const quantity = ingredient.quantity ? ingredient.quantity : ''
            let unit = ingredient.unit ? ingredient.unit : ''
            unit = unit.length > 3 ? ` ${unit}` : unit
            media += `<li><b>${ingredient.ingredient} :</b> ${quantity}${unit}</li>`
        })
        media += `</ul><p class="description">${this.description}</p></div></div>`

        this.$wrapperMedia.innerHTML = media
        // this.mediaEventsHandler()
        return this.$wrapperMedia
    }
}
