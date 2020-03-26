import React, { useState, useEffect, useContext } from 'react'
import classNames from 'classnames'
import './TodoList.scss'
import useFetch from '../../hooks/useFetch'
import uniqid from 'uniqid'
import ToggleTheme from '../ToggleTheme/ToggleTheme'

//contexts
import { ThemeContext } from '../../context/Theme'

const Filter = {
  ALL: 'ALL',
  DONE: 'DONE',
  TODO: 'TODO'
}

const filterMenu = {
  [Filter.DONE]: true,
  [Filter.TODO]: false,
}

//react component
function TodoList() {
  // const [todos, setTodos] = useState([])
  const [input, setInput] = useState({})
  const [showing, setShowing] = useState(Filter.ALL)

  //context
  const theme = useContext(ThemeContext)

  //custom hooks
  const [todos, loading, setTodos, updateTodos, postNewTodo] = useFetch();

  useEffect(() => {
    updateTitle()
  })

  const updateTitle = () => {
    document.title = `Todo's: ${todos.filter(item => !item.complete).length}`;
  }

  const handleFinishItem = async (id) => {
    const newTodos = [...todos];
    const previous = todos.find((todo) => todo.id === id);

    //send put request for complete item. 
    const response = await updateTodos({ ...previous, complete: !previous.complete })

    //update newTodos
    newTodos[todos.indexOf(previous)] = response;

    //set the state
    setTodos(newTodos);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const { name, difficulty, time } = input
    const newTodo = { id: uniqid(), name, difficulty, time, complete: false }
    //send post request for new todo
    await postNewTodo(newTodo);

    //get ready for next input.
    setInput({});
  }

  const handleChange = (e) => {
    //key:  "name" || "difficulty" || "time"
    //value: <string>
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const filterResults = (filter) => {
    setShowing(filter);
  }

  const filteredTodos = filterMenu[showing] === false || filterMenu[showing] === true ?
    todos.filter(item => item.complete === filterMenu[showing]) : todos;

  return (
    <div className={classNames('todoList', { dark: theme.darkMode })} onSubmit={handleSubmit}>
      <div className={classNames('form', { dark: theme.darkMode })} onSubmit={handleSubmit}>
        <form>
          <input type="text" placeholder="Thing to do..." name="name" value={input.name} onChange={handleChange}></input>
          <input type="text" placeholder="Difficulty" name="difficulty" value={input.difficulty} onChange={handleChange}></input>
          <input type="text" placeholder="Time Needed" name="time" value={input.time} onChange={handleChange}></input>
          <input type="submit" value="Create!" />
        </form>
        <div className="select">
          <div
            className={classNames("option", { selected: showing === Filter.TODO })}
            onClick={() => filterResults(Filter.TODO)}
          >To Do</div>
          <div
            className={classNames("option", { selected: showing === Filter.DONE })}
            onClick={() => filterResults(Filter.DONE)}
          >Done</div>
          <div
            className={classNames("option", { selected: showing === Filter.ALL })}
            onClick={() => filterResults(Filter.ALL)}
          >All</div>
        </div>
        <ToggleTheme />
      </div>


      <div className={classNames("container", { dark: theme.darkMode })}>

        {loading ? <p>Loading...</p> :
          (
            <ul className="list">
              {filteredTodos.map((item, i) => {
                return <li key={i} className={classNames('todoItem', { done: item.complete })}>
                  Name: {item.name}, Difficulty: {item.difficulty}, Time: {item.time}
                  <input type="button" className="doneButton" onClick={() => handleFinishItem(item.id)} value={item.complete ? 'Oops' : 'Finish'}></input>
                </li>
              })}
            </ul>
          )}
      </div>
    </div>
  )
}

export default TodoList