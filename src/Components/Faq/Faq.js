import React from 'react'

function Faq() {
  return (
    <section class="FAQ-list-container">
    <h1 class="FAQ-heading">Frequently Asked Questions</h1>
    <div class="FAQ-list">
      <div class="FAQ-question">
        <button class="FAQ-title">
          What is Netflix?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            Netflix is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries and more –
            on thousands of internet-connected devices.
          </p>
          <p>
            You can watch as much as you want, whenever you want, without a
            single ad – all for one low monthly price. There's always
            something new to discover, and new TV shows and movies are added
            every week!
          </p>
        </div>
      </div>
      <div class="FAQ-question">
        <button class="FAQ-title">
          How much does netflix cost?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
            streaming device, all for one fixed monthly fee. Plans range
            from ₹ 199 to ₹ 799 a month. No extra costs, no contracts.
          </p>
        </div>
      </div>
      <div class="FAQ-question">
        <button class="FAQ-title">
          Where can i watch?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            Watch anywhere, anytime, on an unlimited number of devices. Sign
            in with your Netflix account to watch instantly on the web at
            netflix.com from your personal computer or on any
            internet-connected device that offers the Netflix app, including
            smart TVs, smartphones, tablets, streaming media players and
            game consoles.
          </p>
          <p>
            You can also download your favourite shows with the iOS,
            Android, or Windows 10 app. Use downloads to watch while you're
            on the go and without an internet connection. Take Netflix with
            you anywhere.
          </p>
        </div>
      </div>
      <div class="FAQ-question">
        <button class="FAQ-title">
          How do I cancel?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            Netflix is flexible. There are no annoying contracts and no
            commitments. You can easily cancel your account online in two
            clicks. There are no cancellation fees – start or stop your
            account anytime.
          </p>
        </div>
      </div>
      <div class="FAQ-question">
        <button class="FAQ-title">
          What can I watch from Netflix?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            Netflix has an extensive library of feature films,
            documentaries, TV shows, anime, award-winning Netflix originals,
            and more. Watch as much as you want, anytime you want.
          </p>
        </div>
      </div>
      <div class="FAQ-question">
        <button class="FAQ-title">
          Is Netflix good for kids?<i class="fal fa-plus"></i>
        </button>
        <div class="FAQ-answer">
          <p>
            The Netflix Kids experience is included in your membership to
            give parents control while kids enjoy family-friendly TV shows
            and films in their own space.
          </p>
          <p>
            Kids profiles come with PIN-protected parental controls that let
            you restrict the maturity rating of content kids can watch and
            block specific titles you don’t want kids to see.
          </p>
        </div>
      </div>
    </div>
    <div class="FAQ-email">
      <h3>
        Ready to watch? Enter your email to create or restart your
        membership.
      </h3>
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

export default Faq