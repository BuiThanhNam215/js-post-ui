export function setTextContent(parent, selector, text) {
  if (!parent) return

  const elemet = parent.querySelector(selector)

  return (elemet.textContent = text)
}
