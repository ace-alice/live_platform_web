/* eslint-disable no-tabs */
const baseURL = ''

export default function ({
  id,
  message = '',
  messageImage
}: {
  id: string
  message?: string
  messageImage: string
}) {
  const NotLoginBox = document.querySelector(`#${id}`)
  if (NotLoginBox) {
    return
  }

  const html5 = `
			<div class="normal-message ${id}">
        <img class="image" src="${baseURL}${messageImage}" alt="" />
        <div class="message">${message}</div>
		</div>
		`

  const body: any = document.body
  const div: HTMLDivElement = document.createElement('div')
  div.setAttribute('id', id)
  div.innerHTML = html5
  body.insertBefore(div, body.childNodes[0])

  setTimeout(() => {
    const el = document.querySelector(`#${id}`)
    el && el.parentNode?.removeChild(el)
  }, 30000)
}
