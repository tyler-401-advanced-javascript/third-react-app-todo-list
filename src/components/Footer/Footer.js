import React, { useContext } from 'react'
import classNames from 'classnames'
import './Footer.scss'
import {ThemeContext} from '../../context/Theme'


function Footer() {
  const theme = useContext(ThemeContext)
  return (
    <div className={classNames("margin", "footer", {dark: theme.darkMode})}>
      &copy; Tyler Sayvetz and Associates
    </div>
  )
}

export default Footer