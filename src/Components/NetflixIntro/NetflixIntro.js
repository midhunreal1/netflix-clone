import React from 'react'
import bg from '../../assets/netflix-bg.jpg'

function NetflixIntro() {
  return (
    <section class="netflix-bg">
    <div class="netflix-bg-container">
      <img
        src={bg}
        alt="netflix background image"
        class="netflix-bg-image"
      />
    </div>
    <div class="netflix-bg-overlay"></div>

    <div class="netflix-card">
      <h1 class="netflix-title">
        Unlimited Movies, TV<br />
        Shows and More.
      </h1>
      <p class="netflix-subtitle">Watch anywhere. Cancel anytime.</p>
      <p class="netflix-description">
        Ready to watch? Enter your email to create or restart your
        membership .
      </p>

     

      <div class="email-form-container">
        <div class="form-container">
          <input type="email" class="email-input" placeholder=" " />
          <label class="email-label">Email Address</label>
        </div>
        <button class="primary-button">
          Get Started <i class="fal fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
  )
}

export default NetflixIntro