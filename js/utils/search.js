import debounce from 'lodash.debounce'

export function initSearch({ elementId, defaultParams, onChange }) {
  const searchInput = document.getElementById(elementId)
  console.log(defaultParams)
  console.log(onChange)
  if (!searchInput) return

  if (defaultParams.get('title_like')) {
    console.log('ok')
    searchInput.value = defaultParams.get('title_like')
  }

  const debounceSearch = debounce((event) => onChange?.(event.target.value), 500)
  searchInput.addEventListener('input', debounceSearch)
}
