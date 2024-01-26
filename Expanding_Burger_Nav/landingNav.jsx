import React from 'react'
import navStyles from './Navbar.module.css';

export function LandingNav() {
  return (
    <div>
    <nav className={navStyles.nav}>
  <input type="checkbox" className={navStyles.nav__cb} id="menu-cb" />
  <div className={navStyles.nav__content}>
    <ul className={navStyles.nav__items}>
      <li className={navStyles.nav__item}>
        <span className={navStyles.nav__item_text}>Home</span>
      </li>
      <li className={navStyles.nav__item}>
        <span className={navStyles.nav__item_text}>About</span>
      </li>
      <li className={navStyles.nav__item}>
        <span className={navStyles.nav__item_text}>Contact</span>
      </li>
      /* <li className={navStyles.nav__item}>
        <span className={navStyles.nav__item_text}>Login/Signup</span>
      </li>
      <li className={navStyles.nav__item}>
        <span className={navStyles.nav__item_text}>Support</span>
      </li> */
    </ul>
  </div>
  <label className={navStyles.nav__btn} htmlFor="menu-cb" />
</nav>

    </div>
  )
}
