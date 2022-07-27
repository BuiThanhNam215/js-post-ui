import postApi from './api/postApi'
import { initPostForm } from './utils/post-form'
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    const defaultValues = Boolean(postId)
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: (formVaues) => console.log('submit', formVaues),
    })
  } catch (error) {
    console.log('failed to fetch post', error)
  }
})()
