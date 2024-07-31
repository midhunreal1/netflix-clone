import React from 'react'
import tv from '../../assets/tv-1.png'
import video from '../../assets/video-1.m4v'
import mobile from '../../assets/mobile.jpg'
import tv2 from '../../assets/tv-1.png'
import child from '../../assets/children.png'
import video2 from '../../assets/video-2.m4v'
import boxshot from '../../assets/boxshot.png'
import download from '../../assets/download-icon.gif'

function Feature() {
  return (
    <section class="features-container">
 
    <div class="feature">
      <div class="feature-details">
        <h3 class="feature-heading">Enjoy on your TV.</h3>
        <h5 class="feature-sub-heading">
          Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
          Blu-ray players and more.
        </h5>
      </div>
      <div class="feature-image-container">
        <img
          src={tv}
          alt="Feature image"
          class="feature-image"
        />
        <div class="feature-bg-video-container">
          <video autoplay="" loop="" muted="" class="feature-bg-video">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

  
    <div class="feature">
      <div class="feature-details">
        <h3 class="feature-heading">
          Download your shows to watch offline.
        </h3>
        <h5 class="feature-sub-heading">
          Save your favourites easily and always have something to watch.
        </h5>
      </div>
      <div class="feature-image-container">
        <img
          src={mobile}
          alt="Feature image"
          class="feature-image"
        />
        <div class="feature-2-poster-container">
          <div class="poster-container">
            <img src={boxshot} alt="poster" class="poster" />
          </div>
          <div class="poster-details">
            <h4>Stranger Things</h4>
            <h6>Downloading...</h6>
          </div>
          <div class="download-gif-container">
            <img
              src={download}
              alt="downloading gif"
              class="gif"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="feature">
      <div class="feature-details">
        <h3 class="feature-heading">Watch everywhere.</h3>
        <h5 class="feature-sub-heading">
          Stream unlimited movies and TV shows on your phone, tablet,
          laptop, and TV.
        </h5>
      </div>
      <div class="feature-image-container feature-3-image-container">
        <img
          src={tv2}
          alt="Feature image"
          class="feature-image feature-3-image"
        />
        <div
          class="feature-bg-video-container feature-3-bg-video-container"
        >
          <video
            autoplay=""
            loop=""
            muted=""
            class="feature-bg-video feature-3-bg-video"
          >
            <source src={video2} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>

    <div class="feature">
      <div class="feature-details">
        <h3 class="feature-heading">Create profiles for children.</h3>
        <h5 class="feature-sub-heading">
          Send children on adventures with their favourite characters in a
          space made just for them—free with your membership.
        </h5>
      </div>
      <div class="feature-image-container">
        <img
          src={child}
          alt="Feature image"
          class="feature-image"
        />
      </div>
    </div>
  </section>
  )
}

export default Feature