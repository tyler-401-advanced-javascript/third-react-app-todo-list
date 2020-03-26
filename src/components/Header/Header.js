import React, { useContext } from 'react'
import classNames from 'classnames'
import './Header.scss'

//contexts
import { ThemeContext } from '../../context/Theme'

function Header() {
  const theme = useContext(ThemeContext)
  console.log(theme.darkMode);
  return (
    <div class='header' className={classNames('margin', { dark: theme.darkMode })} >
      Super Awesome To-Do List
    </div>
  )
}

export default Header