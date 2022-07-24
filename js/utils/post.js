import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setTextContent } from './common'

dayjs.extend(relativeTime)

export function createPostElement(post) {
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

  const divElement = liElement.firstElementChild
  console.log(divElement)
  divElement.addEventListener('click', () => {
    console.log(post.id)
    window.location.assign(`/post-detail.html?id=${post.id}`)
  })
  return liElement
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return
  const ulElement = document.getElementById(elementId)
  if (!ulElement) return

  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
