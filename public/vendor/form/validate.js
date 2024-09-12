(function () {
  "use strict";

  let form = document.getElementById('direct-order')
  let submitOrderBtn = document.getElementById('submit-order')
  let intervalId, currentIntervalInSeconds = 0

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    submitOrderBtn.setAttribute('disabled', true)
    submitOrderBtn.innerHTML = `
     <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    `

    intervalId = setInterval(() => {
      currentIntervalInSeconds += 1
    }, 1000)

    displayToastWithData('Orınlanbaqta...', currentIntervalInSeconds)

    const xhr = new XMLHttpRequest()
    const action = form.getAttribute('action')

    let params =
      "?name=" + this.elements['name'].value +
      "&phone=" + this.elements['phone'].value +
      "&comment=" + this.elements['comment'].value

    xhr.open("GET", action + params)
    xhr.send()

    xhr.onload = function () {
      if (xhr.status != 200)
        return displayToastWithData(xhr.status + ': ' + xhr.statusText, currentIntervalInSeconds)

      const resp = JSON.parse(xhr.response)

      displayToastWithData(resp.message, currentIntervalInSeconds)
    }

    xhr.onerror = function () {
      displayToastWithData('Soraw jiberiwde qátelik júz berdi', currentIntervalInSeconds)
    }

    this.reset()

    clearInterval(intervalId)
    submitOrderBtn.setAttribute('disabled', false)
    submitOrderBtn.innerHTML = `Buyırtpa beriw`
  })

  function displayToastWithData(body, timer = currentIntervalInSeconds, header = 'Buyırtpa beriw') {
    const toastContainer = document.getElementById('toastContainer')
    const newToast = document.createElement('div')

    newToast.classList.add('toast')
    newToast.setAttribute('role', 'alert')
    newToast.setAttribute('aria-live', 'assertive')
    newToast.setAttribute('aria-atomic', 'true')
    newToast.setAttribute('data-bs-delay', '5000')
    newToast.setAttribute('data-bs-autohide', 'true')
    newToast.setAttribute('data-bs-animation', 'true')

    newToast.innerHTML = `
      <div class="toast-header">
        <i class="bi bi-bell-fill me-2"></i>
        <strong id="toast-header" class="me-auto">${header}</strong>
        <small id="toast-timer">${timer} sekund aldın</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div id="toast-body" class="toast-body">
        ${body}
      </div>
    `

    toastContainer.appendChild(newToast)

    const toast = new bootstrap.Toast(newToast)

    toast.show()
  }
})()
