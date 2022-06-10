import { CreaE, QS, QSAll, SetAt, ApC } from '../utils/domUtils.js'

export default class TagSelector {
  constructor(tagsList, tagType) {
    this.tagsList = tagsList
    this.filteredTags = []
    this.tagType = tagType
    this.$wrapper = CreaE('div')
    SetAt('dropdown', this.$wrapper)
    this.tagWrapper = QS('.tag')
  }

  createTag(tag) {
    let className = ''
    switch (this.tagType) {
      case 'ING':
        className = 'ingTag'
        break
      case 'APP':
        className = 'appTag'
        break
      case 'UST':
        className = 'ustTag'
        break
      default:
        throw error
    }
    const selectedTag = QS('.selectedTag')
    const sTag = `${tag}<em class="far fa-times-circle"></em>`
    const span = CreaE('span')
    SetAt(className, span)
    span.setAttribute('value', tag)
    span.innerHTML = sTag
    QS('em', span).addEventListener('click', () => {
      span.parentElement.removeChild(span)
      QS('.btn-search').click()
    })
    selectedTag.appendChild(span)
  }

  setTagsAttributes(parent) {
    QSAll('ul', parent).forEach((ul) => SetAt('col', ul))
    QSAll('li', parent).forEach((li) => {
      const tag = li.getAttribute('value')
      li.addEventListener('click', () => {
        this.createTag(tag)
        QS('.btn-search').click()
      })
      SetAt('dropdown-item', li)
    })
  }

  tagFilter() {
    const dropdown = this.$wrapper
    const tagInput = dropdown.querySelector('.dropdown-button')
    const tagContainer = dropdown.querySelector('.row')

    // console.log(searchField.value.length, ' /n', searchField.value)
    const tagValue = tagInput.value.toLowerCase()
    // Filter search
    const filteredTags = this.tagsList.filter((tag) => tag.toLowerCase().includes(tagValue))
    tagContainer.innerHTML = this.tagListGenerator(filteredTags)
    this.setTagsAttributes(tagContainer)
  }

  //* ******************** ONSEARCH EVENTS  ***********************************/
  onTagFilter() {
    const dropdown = this.$wrapper
    const tagInput = dropdown.querySelector('.dropdown-button')
    // Filter management
    tagInput.addEventListener('input', () => {
      this.tagFilter()
    })
  }

  tagListGenerator = (filteredList = false) => {
    let index = 1
    let indexTotal = 1
    let tagDropdown = ''
    const tagsList = filteredList || this.tagsList
    const listLenth = tagsList.length
    tagsList.every((tag) => {
      const upperTag = `${tag[0].toUpperCase()}${tag.slice(1)}`
      if (index === 1) tagDropdown += `<ul>`
      tagDropdown += `<li value="${tag}" >${upperTag}</li>`
      if (index === 10) tagDropdown += `</ul>`

      if (indexTotal == listLenth + 1 && ![10, 20, 30].includes(indexTotal)) tagDropdown += `</ul>`
      if (indexTotal == 30) return false

      index = index < 10 ? index + 1 : 1
      indexTotal += 1
      return true
    })

    return tagDropdown
  }

  render(tagName) {
    // Generate the sorter element
    let tagDropdown = `
      <input class="dropdown-button" aria-haspopup="true" aria-expanded="false" placeholder="${tagName[0].toUpperCase()}${tagName.slice(1)}">
        <em class="fas fa-angle-down"></em>
      </input>
      <div class="row">`

    tagDropdown += this.tagListGenerator()

    tagDropdown += `</div>`

    this.$wrapper.setAttribute('id', tagName)
    SetAt('dropdown', this.$wrapper)
    this.$wrapper.innerHTML = tagDropdown

    this.setTagsAttributes(this.$wrapper)
    this.onTagFilter()
    ApC(this.$wrapper, this.tagWrapper)
  }
}
