(function () {
  const choose_address = document.getElementById("choose-address")
  const address_input = document.getElementById("address")
  const geolocation_error = document.getElementById("geolocation-error")

  choose_address.addEventListener("click", function getLocation(e) {
    if (!navigator.geolocation)
      return geolocation_error.innerHTML = "Geolokaciya browzerińis tárepinen qollap-quwwatlanbaydı, Iltimas mánzildi qolda kiritiń";

    navigator.geolocation.getCurrentPosition(showPosition)
  })

  function showPosition(position) {
    let position_string = position.coords.latitude + "; " + position.coords.longitude;
    address_input.value = position_string
  }

  /** Phone number masking */
  let selector = "phone"

  const mask = (selector) => {
    function setMask() {
      let matrix = '## ### ## ##';

      let i = 0
      let val = this.value.replace(/\D/g, '');

      this.value = matrix.replace(/(?!\+)./g, function (a) {
        return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
    }

    let input = document.getElementById(selector);

    input.addEventListener('input', setMask);
    input.addEventListener('focus', setMask);
    input.addEventListener('blur', setMask);
  }

  mask(selector)

  /** Form Alerts */
  const alerts_container = document.getElementById('alerts_container')

  const payment_options_texts = [
    // {
    //   name: 'click',
    //   body: 'Click arqalı tólew - Sizge tólem forması linki beriledi hám siz',
    // },
    // {
    //   name: 'payme',
    //   body: 'Payme cardı arqalı',
    // },
    {
      name: 'card_number',
      body: `
      Kitap ushın kart nomeri arqalı tólem qılıwda, sizge karta rekvizitleri beriledi hám
      siz tólemdi kartadan-kartaǵa ótkeriw jolı menen ámelge asırasız. <br>

      <strong>Tolıqraq maǵlıwmat alıw ushın: <a style="color: inherit;" href="https://t.me/gulinaz_hr">@gulinaz_hr</a></strong>
      `,
    },
    {
      name: 'cash',
      body: `Kitap ushın naq pul arqalı tólem qılıwda, siz arnawlı tarqatıw ornına kelip,
      kitaptı alǵanıńıstan soń tólemdi ámelge asırsańıs boladı.<br>

      <strong>Tolıqraq maǵlıwmat alıw ushın: <a style="color: inherit;" href="https://t.me/gulinaz_hr">@gulinaz_hr</a></strong>
      `,
    }
  ]

  const alert = document.getElementById('alert')

  const show_alert = (body, type) => {
    if (type === 'error') type = 'danger'
    alert.className = ''
    alert.classList.add('alert', `alert-${type}`)
    alert.removeAttribute('hidden')

    alert.innerHTML = body
  }

  const payment_options = document.querySelectorAll('.btn-check')

  payment_options.forEach(option => {
    option.addEventListener('click', (e) => {
      const payment_option = e.target.getAttribute('id')

      payment_options_texts.forEach(text => {
        if (payment_option === text.name) {
          show_alert(text.body, 'dark')
        }
      })
    })
  })

  /** FORM */
  const form = document.getElementById('order-form')
  const submit_btn = document.getElementById('submit-btn')
  const submit_btn_spinner = document.getElementById('submit-btn-spinner')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    submit_btn.setAttribute('disabled', true)
    submit_btn_spinner.removeAttribute('hidden')

    const { name, phone, address, payment_option } = e.target

    const data = {
      name: name.value,
      phone: phone.value,
      address: address.value,
      payment_option: payment_option.value
    }

    try {
      const response = await fetch('/direct-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      })

      const result = await response.json()

      console.log({ result })
      show_modal(result.status, result.message)

      form.reset()
    } catch (error) {
      console.log({ error })
      show_modal('error', 'Internet baylanısı menen qátelik kelip shıqtı iltimas qaytadan urınıp kóriń')
    } finally {
      submit_btn.removeAttribute('disabled')
      submit_btn_spinner.setAttribute('hidden', true)

      setTimeout(() => {
        alert.setAttribute('hidden', true)
      }, 60_000)
    }
  })

  /** Modal */
  const show_modal = (status, message) => {
    const modal_trigger_btn = document.getElementById(`status-${status}-btn`)

    const modal_status = document.getElementById(`${status}-title`)
    const modal_message = document.getElementById(`${status}-message`)

    modal_status.innerHTML = (status === 'success') ? 'Buyırtpańıs qabıllandı' : 'Qátelik kelip shıqtı'
    modal_message.innerHTML = message

    modal_trigger_btn.click()
  }
})()