import { setBackgroundImage, setFieldValue } from './common'

function setFormValue(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title)
  setFieldValue(form, '[name="author"]', formValues?.author)
  setFieldValue(form, '[name="description"]', formValues?.description)

  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl)
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}
function getFormValues(form) {
  const formValues = {}
  //   s1: query each input and return values
  //   ;[('title', 'author', 'description', 'imageUrl')].forEach((name) => {
  //     const field = form.querySelector(`[name="${name}"]`)
  //     if (field) values[name] = field.value
  //   })
  //   s2 using form data

  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }
  return formValues
}
export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return

  console.log('form', form)

  setFormValue(form, defaultValues)
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formValues = getFormValues(form)
    console.log(formValues)
  })
}
