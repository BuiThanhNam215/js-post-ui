import dayjs from 'dayjs'
import axiosClient from './api/axiosClient'
import postApi from './api/postApi'
import { getUlPaginations, setTextContent } from './utils'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
function createPostElement(post) {
  if (!post) retun
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  setTextContent(liElement, '[data-id= "title"] ', post.title)
  setTextContent(liElement, '[data-id= "description"] ', post.description)
  setTextContent(liElement, '[data-id= "author"] ', post.author)
  setTextContent(liElement, '[data-id= "timeSpan"] ', ` - ${dayjs(post.updateAt).fromNow()}`)

  const thumbnail = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnail) thumbnail.src = post.imageUrl
  thumbnail.addEventListener('error', () => {
    thumbnail.src = 'https://via.placeholder.com/1368x600?text=thumbnail'
  })
  return liElement
}
function renderPagination(pagination) {
  const ulPagination = getUlPaginations()
  if (!pagination) return

  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')
  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}
function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return
  const ulElement = document.getElementById('postList')
  if (!ulElement) return

  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    history.pushState({}, '', url)

    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('falied to fetch post list', error)
  }
}
function handleNextClick(el) {
  el.preventDefault()
  const ulPagination = getUlPaginations()
  if (!ulPagination) return
  const page = Number.parseInt(ulPagination.dataset.page) || 1
  const totalPages = ulPagination.dataset.totalPage

  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
}
function handlePrevClick(el) {
  el.preventDefault()
  const ulPagination = getUlPaginations()
  if (!ulPagination) return
  const page = Number.parseInt(ulPagination.dataset.page) || 1

  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}
function initPagination() {
  const ulPagination = getUlPaginations()
  if (!ulPagination) return

  const prevLink = ulPagination.firstElementChild?.firstElementChild

  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick)
  }
  const nextLink = ulPagination.lastElementChild?.lastElementChild
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick)
  }
}

function initURL() {
  const url = new URL(window.location)

  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

  history.pushState({}, '', url)
}

;(async () => {
  try {
    initPagination()
    initURL()
    const queryParams = new URLSearchParams(window.location.search)
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('Get all falied', error)
  }
})()
