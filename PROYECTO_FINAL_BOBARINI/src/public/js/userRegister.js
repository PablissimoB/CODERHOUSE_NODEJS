const formRegister = document.querySelector('form')

formRegister?.addEventListener('submit', async event => {
  event.preventDefault()

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formRegister))
  })
  
    const data = await response.json()
    window.location.href = '/static/UserLogin';
    localStorage.setItem('token', data.token)

})
