import React from 'react';
import './App.scss'
import Header from '../Header/Header.js'
import TodoList from '../TodoList/TodoList.js'
import Footer from '../Footer/Footer.js'
import classNames from 'classnames'

//contexts
import Theme from '../../context/Theme'

function App() {

  return (
    <Theme>
      <div className={classNames("App")} >
        <Header />
        <TodoList />
        <Footer />
      </div>
    </Theme>
  );
}

export default App;
