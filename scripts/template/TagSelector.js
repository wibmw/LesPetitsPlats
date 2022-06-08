import {
    CreaE, QS, SetAt, Tog, ApC,
} from '../utils/domUtils.js'

export default class TagSelector {
    constructor(tagsList, tagType) {
        this.tagsList = tagsList
        this.tagType = tagType
        this.$wrapper = CreaE('div')
        this.tagWrapper = QS('.tag')
    }

    /* unselect() {
        SetAt('unselected', QS('label[for="sort-best"', this.$wrapper))
    }

    /* clearSelect() {
        SetAt('', QS('label[for="sort-best"', this.$wrapper))
    }

    /* onChangeSorter() {

    }

    /* clearWrappers() {
        // Reset media and carousel content
        this.$mediasWrapper.innerHTML = ''
        this.$carouselWrapper.innerHTML = ''
    } */

    render() {
        const tagName = () => {
            switch (tagType) {
            case 'ING': return 'ingedients'
            case 'APP': return 'appareils'
            case 'UST': return 'ustensils'
            default:
                throw error
            }
        }
        // Generate the sorter element
        const tagDropdown = `
                        <span class="tagList" id="${tagName}">
                            <label id="bestLabel" aria-label="Tag ${tagName}" >${tagName[0].toUpperCase()}${tagName.slice(1)}</label>
                        </span>`
                        
        this.tagsList.forEach((tag) => {
            
        })
        tagDropdown += 

        this.$wrapper.innerHTML = tagDropdown
        this.onChangeSorter()
        ApC(this.$wrapper, this.tagWrapper)
    }
}
