import React from 'react';
import './App.scss'
import Header from '../Header/Header.js'
import TodoList from '../TodoList/TodoList.js'
import Footer from '../Footer/Footer.js'


import './App.scss';

function App() {

  //functions here.

  return (
    <div className="App">
     <Header />
     <TodoList />
     <Footer />
    </div>
  );
}

export default App;
