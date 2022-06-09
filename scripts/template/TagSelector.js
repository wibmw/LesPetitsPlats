import { CreaE, QS, QSAll, SetAt, ApC } from '../utils/domUtils.js'

export default class TagSelector {
  constructor(tagsList) {
    this.tagsList = tagsList
    this.$wrapper = CreaE('div')
    SetAt('dropdown', this.$wrapper)
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

  render(tagName) {
    /* const tagName = (tagType) => {
      switch (tagType) {
        case 'ING':
          return 'ingredients'
        case 'APP':
          return 'appareils'
        case 'UST':
          return 'ustensils'
        default:
          throw error
      }
    } */

    // console.log(tagName, ' /n', tagName[0])
    // Generate the sorter element
    let tagDropdown = `
      <input class="dropdown-button" aria-haspopup="true" aria-expanded="false" placeholder="${tagName[0].toUpperCase()}${tagName.slice(1)}">
        <em class="fas fa-angle-down"></em>
      </input>
      <div class="row">`

    let index = 1
    let indexTotal = 1
    const listLenth = this.tagsList.length
    this.tagsList.every((tag) => {
      if (index === 1) tagDropdown += `<ul><li>${tag}</li>`
      else if (index > 1 && index < 10) tagDropdown += `<li>${tag}</li>`
      else if (index === 10) tagDropdown += `<li>${tag}</li></ul>`

      if (indexTotal == listLenth + 1 && ![10, 20, 30].includes(indexTotal)) tagDropdown += `</ul>`

      if (indexTotal == 30) return false

      index = index < 10 ? index + 1 : 1
      indexTotal += 1
      return true
    })

    tagDropdown += `</div>`

    this.$wrapper.setAttribute('id', tagName)
    SetAt('dropdown', this.$wrapper)
    this.$wrapper.innerHTML = tagDropdown
    console.log(this.$wrapper)
    QSAll('ul', this.$wrapper).forEach((ul) => SetAt('col', ul))
    QSAll('li', this.$wrapper).forEach((li) => SetAt('dropdown-item', li))
    // this.onChangeSorter()
    ApC(this.$wrapper, this.tagWrapper)
  }
}
