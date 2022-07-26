import dayjs from 'dayjs'
import { registerLightBox, setTextContent } from './utils'
import postApi from './api/postApi'

function renderPostDetails(post) {
  if (!post) return
  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format('- DD/MM/YYYY HH:mm')
  )

  const heroImage = document.querySelector('#postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url('${post.imageUrl}')`
  }
  const editPageLink = document.querySelector('#goToEditPageLink')
  if (editPageLink) {
    editPageLink.herf = `/add-edit-post.html?id=${post.id}`
    editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit post'
  }
}
;(async () => {
  try {
    registerLightBox({
      modalId: 'lightbox',
      imgSelector: 'img[data-id="lightboxImg"]',
      prevSelector: 'button[data-id="lightboxPrev"]',
      nextSelector: 'button[data-id="lightboxNext"]',
    })

    const queryParams = new URLSearchParams(window.location.search)
    const postId = queryParams.get('id')

    if (!postId) {
      console.log('Post not found')
      return
    }

    const post = await postApi.getById(postId)
    renderPostDetails(post)
  } catch (error) {
    console.log('failed to fetch post', error)
  }
})()
