export function setTextContent(parent, selector, text) {
  if (!parent) return

  const elemet = parent.querySelector(selector)

  return (elemet.textContent = text)
}

export function setFieldValue(form, selector, value) {
  if (!form) return
  const field = form.querySelector(selector)
  if (field) field.value = value
}
export function setBackgroundImage(parent, selector, imageUrl) {
  if (!parent) return
  const elemet = parent.querySelector(selector)
  if (elemet) elemet.style.backgroundImage = `url("${imageUrl}")`
}
