const formRegister = document.querySelector('form')

formRegister?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formRegister))
  })

  window.location.href = '/static/'
  
})
