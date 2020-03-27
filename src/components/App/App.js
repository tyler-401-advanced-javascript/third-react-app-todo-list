import React from 'react';
import './App.scss'
import Header from '../Header/Header.js'
import TodoList from '../TodoList/TodoList.js'
import Footer from '../Footer/Footer.js'
import classNames from 'classnames'
import Auth from '../util/Auth'
//contexts
import Theme from '../../context/Settings'
import AuthMich from '../../context/AuthMich'

const Permission = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
}

function App() {

  return (

    <Theme>
      <AuthMich>
        <div className={classNames("App")} >
          <Header />
          <Auth required={Permission.READ}>
            <TodoList />
          </Auth>
          <Footer />
        </div>
      </AuthMich>
    </Theme>
  );
}

export default App;
