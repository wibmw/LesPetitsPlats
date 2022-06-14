import { CreaE, QS, QSAll, SetAt, ApC } from '../utils/domUtils.js'

export default class TagSelector {
  constructor(tagsList, tagType) {
    this.tagsList = tagsList
    this.tagType = tagType

    // DOM elements
    this.$wrapper = CreaE('div')
    SetAt('dropdown', this.$wrapper)
    this.tagWrapper = QS('.tag')
  }

  //* ********************  DISPLAY THE SELECTED TAG  ***********************************/
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
    // CLOSE THE TAG
    QS('em', span).addEventListener('click', () => {
      span.parentElement.removeChild(span)
      QS('.btn-search').click()
    })
    selectedTag.appendChild(span)
  }

  //* ******************** SET TAGS CLASSES? ATTRIBUTES AND EVENT  ***********************************/
  setTagsAttributes(parent) {
    for (const ul of QSAll('ul', parent)) SetAt('col', ul)
    for (const li of QSAll('li', parent)) {
      const tag = li.getAttribute('data-value')

      li.addEventListener('click', () => {
        const spans = QSAll('span', QS('.selectedTag'))
        const selectedTag = spans.map((span) => span.getAttribute('value'))
        if (!selectedTag.includes(tag)) {
          this.createTag(tag)
          QS('.btn-search').click()
        }
      })
      SetAt('dropdown-item', li)
    }
  }

  //* ******************** FILTERING TAGS LIST ON INPUT  ***********************************/
  onTagFilter() {
    const dropdown = this.$wrapper
    const tagInput = QS(`#in${this.tagType}`, dropdown)
    const tagContainer = QS('.row', dropdown)

    // Filter management
    tagInput.addEventListener('input', () => {
      const tagValue = QS(`#in${this.tagType}`).value.toLowerCase()
      const filteredTags = []
      for (const tag of this.tagsList) if (tag.toLowerCase().includes(tagValue)) filteredTags.push(tag.toLowerCase())
      tagContainer.innerHTML = this.tagListGenerator(filteredTags)
      this.setTagsAttributes(tagContainer)
    })
  }

  //* ******************** GENERATE THE DROPDOWN'S ITEMS  ***********************************/
  tagListGenerator = (filteredList = false) => {
    let index = 1
    let indexTotal = 1
    let tagDropdown = ''
    const tagsList = filteredList || this.tagsList
    const listLenth = tagsList.length
    while (indexTotal < listLenth && indexTotal < 30) {
      const tag = tagsList[indexTotal]
      const upperTag = `${tag[0].toUpperCase()}${tag.slice(1)}`
      // Column Beginning
      if (index === 1) tagDropdown += `<ul>`
      // Column Items
      tagDropdown += `<li data-value="${tag}" >${upperTag}</li>`
      // Column End
      if (index === 10) tagDropdown += `</ul>`
      // Column End every 10 items
      if (indexTotal == listLenth && ![10, 20, 30].includes(indexTotal + 1)) tagDropdown += `</ul>`

      index = index < 10 ? index + 1 : 1
      indexTotal += 1
    }

    if (listLenth == 1) tagDropdown += `<ul><li data-value="" > </li></ul>`

    return tagDropdown
  }

  //* ******************** CREATE THE DROPDOWN LIST  ***********************************/
  render(tagName) {
    let tagDropdown = `
      <label for="in${this.tagType}" class="sr-only">Liste de ${tagName}</label>
      <input id="in${this.tagType}" role="textbox" class="dropdown-button" aria-haspopup="true"
       placeholder="${tagName[0].toUpperCase()}${tagName.slice(1)}">
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
