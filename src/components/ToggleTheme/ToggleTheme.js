import React, { useContext } from 'react'
import { ThemeContext } from '../../context/Settings'
import classNames from 'classnames'


export default function ToggleTheme() {
  const theme = useContext(ThemeContext);


  return (
    <div
      className={classNames('themeToggle', { dark: theme.darkMode })}
      onClick={theme.toggleTheme}
    >
      Theme
    </div>
  )
}