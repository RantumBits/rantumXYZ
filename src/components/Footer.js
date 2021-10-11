import React from 'react'
import './Footer.css'

export default () => (
  <div>

    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved <br/>
          <a href="https://twitter.com/RantumBits/">@RantumBits</a>
        </span>
      </div>
    </footer>
  </div>
)
