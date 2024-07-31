import React from 'react'
import netflixLogo from '../../assets/netflix-logo.png'
function Header() {
  return (
    <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <img
          src={netflixLogo}
          alt="logo"
          class="Netflix-logo"
        />
      </div>

      <div class="navbar-nav-items">
        <div class="nav-item">
          <div class="dropdown-container">
            <i class="fas fa-globe"></i>
            <select
              name="languages"
              id="languagesSelect"
              class="language-dropdown"
            >
              <option value="english" selected>English &nbsp;</option>
              <option value="hindi">हिन्दी &nbsp;</option>
            </select>
          </div>
        </div>

        <a href="/home"><div class="nav-item">
   <button class="signin-button">Sign in</button>
        </div></a>
      </div>
    </nav>
  </header>
  )
}

export default Header