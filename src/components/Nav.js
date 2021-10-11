import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()
  // keyboard events
  handleLinkKeyDown = ev => {
    if (ev.keyCode === 13) {
      this.state.active && this.handleMenuToggle()
    }
  }

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })
  keyToggleSubNav = (e, subNav) => {
    // key o is for open so you can enter key to open
    if (e.keyCode === 79 || e.keyCode === 27) {
      this.toggleSubNav(subNav)
    }
  }
  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          onKeyDown={this.handleLinkKeyDown}
          tabIndex={0}
          aria-label="Navigation"
          role="button"
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link
            to="/"
            onClick={this.handleLinkClick}
            onKeyDown={this.handleLinkKeyDown}
            tabIndex={0}
            aria-label="Navigation"
            role="button"
          >
            <Logo />
          </Link>
          <div className="Nav--Links">
            {/* <NavLink to="/">Home</NavLink>
             <NavLink to="/components/">Components</NavLink>*/}
             <NavLink>   <a href="https://www.cryptovoxels.com/play?coords=E@47W,274S,4F" target="_blank" class="sublink">Metaverse Art Gallery</a> </NavLink>
             <NavLink>   <a href="https://3aNFT.com" target="_blank" class="sublink">3aNFT Podcast</a> </NavLink>

             <div
               className={`Nav--Group ${
                 this.state.activeSubNav === 'dash' ? 'active' : ''
               }`}
             >
               <span
                 className={`NavLink Nav--GroupParent ${
                   this.props.location.pathname.includes('dashboards')

                     ? 'active'
                     : ''
                 }`}
                 onClick={() => this.toggleSubNav('dash')}
                 onKeyDown={e => this.keyToggleSubNav(e, 'dash')}
                 tabIndex={0}
                 aria-label="Navigation"
                 role="button"
               >
                 NFT Dashboards
                 <div className="Nav--GroupLinks">

                   <NavLink>
                  <a href="https://dune.xyz/rantum/NFT-Sales-Overview-by-Project" target="_blank" class="sublink">NFT Sales Overview</a>
                  </NavLink>
                  <NavLink>
                 <a href="https://dune.xyz/rantum/NFT-Collection-Dashboard" target="_blank" class="sublink">NFT Project Analytics</a>
                 </NavLink>
                 <NavLink>
                <a href="https://dune.xyz/rantum/Art-Blocks-total-sales" target="_blank" class="sublink">ArtBlocks Overview</a>
                </NavLink>
                <NavLink>
               <a href="https://duneanalytics.com/rantum/Art-Blocks" target="_blank" class="sublink">ArtBlocks Single Project Analytics </a>
               </NavLink>
                 </div>
               </span>
             </div>



            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  this.props.location.pathname.includes('notes') ||
                  this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
                onKeyDown={e => this.keyToggleSubNav(e, 'posts')}
                tabIndex={0}
                aria-label="Navigation"
                role="button"
              >
                Notes & Articles
                <div className="Nav--GroupLinks">
                  <NavLink to="/blog/" className="Nav--GroupLink">
                    All Posts
                  </NavLink>
                  {subNav.posts.map((link, index) => (
                    <NavLink
                      to={link.slug}
                      key={'posts-subnav-link-' + index}
                      className="Nav--GroupLink"
                    >
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </span>
            </div>
            {/*  <NavLink to="/default/">Default</NavLink>*/}
             <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
            tabIndex={0}
            aria-label="Navigation"
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
