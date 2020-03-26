import React, { createContext } from 'react'

//this is how we create a context!
export const ThemeContext = createContext(null)

class Theme extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkMode: true,
      toggleTheme: this.changeTheme,
    }
  }

  changeTheme = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    })
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}


export default Theme