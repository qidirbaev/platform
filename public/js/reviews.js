(function () {
  "use strict";

  /** 
 * Get Reviews from the API and render
 */
  function reviewElement(name, job, stars, msg) {
    const reviewDiv = document.createElement('div')
    reviewDiv.classList.add('swiper-slide')
    reviewDiv.innerHTML = `
      <div class="testimonial-item">
        <div class="stars">
          ${'<i class="bi bi-star-fill"></i>'.repeat(stars)}
        </div>
        <p>
          ${msg}
        </p>
        <div class="profile mt-auto">
          <img src="/unknown-person" class="testimonial-img" alt="">
          <h3>${name}</h3>
          <h4>${job}</h4>
        </div>
      </div>
    `

    return reviewDiv
  }

  const reviewContainer = document.getElementById('reviews')

  const stat_1 = document.getElementById('1stat')
  const stat_2 = document.getElementById('2stat')
  const stat_3 = document.getElementById('3stat')
  const stat_4 = document.getElementById('4stat')

  function getStatAndRender() {
    fetch('/stats')
      .then(res => res.json())
      .then(data => {
        data = data.result

        stat_1.setAttribute("data-purecounter-end", data[0].statistics)
        stat_2.setAttribute("data-purecounter-end", data[1].statistics)
        stat_3.setAttribute("data-purecounter-end", data[2].statistics)
        stat_4.setAttribute("data-purecounter-end", data[3].statistics)
      })
      .catch(err => console.error(err))
  }

  function getReviewAndRender() {
    fetch('/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.reviews)
          data.reviews.forEach(review =>
            reviewContainer.appendChild(reviewElement(review.name, review.profession, review.rating, review.comment))
          )
      })
      .catch(err => console.error(err))
  }

  getReviewAndRender()
  getStatAndRender()
})()