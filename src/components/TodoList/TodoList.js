import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './TodoList.scss'

const Filter = {
  ALL: 'ALL',
  DONE: 'DONE',
  TODO: 'TODO'
}

const filterMenu = {
  [Filter.DONE]: true,
  [Filter.TODO]: false,
}
function TodoList() {
  const [dones, setDones] = useState([])
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [showing, setShowing] = useState(Filter.ALL)

  useEffect(() => {
    updateTitle()
  })

  const updateTitle = () => {
    document.title = `Todo's: ${todos.length - dones.length}`;
  }

  const handleFinishItem = (item) => {
    item.complete = !item.complete
    if (!dones.includes(item)) setDones([...dones, item])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const [item, difficulty] = input.split(';')
    setTodos([...todos, { item, difficulty, complete: false }])
    setInput('')
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const filterResults = (filter) => {
    setShowing(filter);
  }

  const filterDisplay = () => {
    console.log(filterMenu[showing])

    //if we are to filter..
    if (filterMenu[showing] === false || filterMenu[showing] === true) {
      return function (todos) {
        return todos.filter(item => item.complete === filterMenu[showing]).map((item, i) => (
            <li key={i} className={classNames('todoItem', { done: item.complete })}>
            Thing: {item.item}, Difficulty: {item.difficulty}
            <input type="button" className="doneButton" onClick={() => handleFinishItem(item)}></input>
          </li>
          ))
      }
      //else show all
    } else 
      return function (todos) {
        return todos.map((item, i) => (
            <li key={i} className={classNames('todoItem', { done: item.complete })}>
              Thing: {item.item}, Difficulty: {item.difficulty}
              <input type="button" className="doneButton" onClick={() => handleFinishItem(item)}></input>
            </li>
          ))
      }
    }

  return (
    <div id="todoList">
      <div className="form">
        <form>
          <input type="text" placeholder="Thing to do..." value={input} onChange={handleChange}></input>
          <input type="submit" value="Create!" onClick={handleSubmit} />
        </form>
        <div className="select">
          <div className={classNames("option", { selected: showing === Filter.ALL })} onClick={() => filterResults(Filter.ALL)}>All</div>
          <div className={classNames("option", { selected: showing === Filter.DONE })} onClick={() => filterResults(Filter.DONE)}>Done</div>
          <div className={classNames("option", { selected: showing === Filter.TODO })} onClick={() => filterResults(Filter.TODO)}>To Do</div>
        </div>
      </div>

      <ul className="list">
        { filterDisplay()(todos) }
      </ul>
    </div>
  )

}

export default TodoList