import React from 'react'

function Footer() {
  return (
    <footer>
    <div class="footer-row-1">
      <h4>Questions? Call 000-800-919-1694</h4>
    </div>
    <div class="footer-row-2">
      <div class="column-1">
        <p>FAQ</p>
        <p>Investor Relations</p>
        <p>Privacy</p>
        <p>Speed Test</p>
      </div>
      <div class="column-2">
        <p>Help Centre</p>
        <p>Jobs</p>
        <p>Cookie Preferences</p>
        <p>Legal Notices</p>
      </div>
      <div class="column-3">
        <p>Account</p>
        <p>Ways to Watch</p>
        <p>Corporate Information</p>
        <p>Only on Netflix</p>
      </div>
      <div class="column-4">
        <p>Media Centre</p>
        <p>Terms of Use</p>
        <p>Contact Us</p>
      </div>
    </div>
    <div class="footer-row-3">
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
    <div class="footer-row-4">
      <p>Netflix India</p>
    </div>
  </footer>
  )
}

export default Footer