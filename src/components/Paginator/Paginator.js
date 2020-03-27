import React, { useContext } from 'react'
import { ThemeContext } from '../../context/Settings'

export default function Paginator() {
  const theme = useContext(ThemeContext)
  return (
    <select onChange={theme.setResultsPerPage}>
      <option selected value={10}>Number Per Page</option>
      <option value={5} >5</option>
      <option value={10} >10</option>
      <option value={15} >15</option>
    </select>
  )
}