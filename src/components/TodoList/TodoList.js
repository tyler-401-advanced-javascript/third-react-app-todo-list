import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './TodoList.scss'
import useFetch from '../../hooks/useFetch'
import uniqid from 'uniqid'


const URL = 'http://localhost:3000/todos'

const Filter = {
  ALL: 'ALL',
  DONE: 'DONE',
  TODO: 'TODO'
}

const filterMenu = {
  [Filter.DONE]: true,
  [Filter.TODO]: false,
}

// api functions
async function postNewTodo(data) {
  await fetch(URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

//react component
function TodoList() {
  // const [todos, setTodos] = useState([])
  const [input, setInput] = useState({})
  const [showing, setShowing] = useState(Filter.ALL)

  //custom hooks
  const [todos, loading] = useFetch();


  useEffect(() => {
    updateTitle()
  })

  const updateTitle = () => {
    document.title = `Todo's: ${todos.filter(item => !item.complete).length}`;
  }

  const handleFinishItem = (id) => {
    //spread todos into new variable. 
    //update the value you want
    //then setTodos(newTodos);

    const newTodos = [...todos];
    const previous = todos.find((todo) => todo.id === id);
    newTodos[todos.indexOf(previous)] = { ...previous, complete: !previous.complete };
    // setTodos(newTodos);

    //send put request for complete item. 


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const { name, difficulty, time } = input
    const newTodo = { id: uniqid(), name, difficulty, time, complete: false }


    //send post request for new todo
    await postNewTodo(newTodo);

    // setTodos(newTodos)


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
    <div id="todoList">
      <div className="form" onSubmit={handleSubmit}>
        <form>
          <input type="text" placeholder="Thing to do..." name="name" value={input.name} onChange={handleChange}></input>
          <input type="text" placeholder="Difficulty" name="difficulty" value={input.difficulty} onChange={handleChange}></input>
          <input type="text" placeholder="Time Needed" name="time" value={input.time} onChange={handleChange}></input>
          <input type="submit" value="Create!" />
        </form>

        <div className="select">
          <div className={classNames("option", { selected: showing === Filter.ALL })} onClick={() => filterResults(Filter.ALL)}>All</div>
          <div className={classNames("option", { selected: showing === Filter.DONE })} onClick={() => filterResults(Filter.DONE)}>Done</div>
          <div className={classNames("option", { selected: showing === Filter.TODO })} onClick={() => filterResults(Filter.TODO)}>To Do</div>
        </div>
      </div>

      { loading ? <p>Im loading, be patient</p> :
        (
          <ul className="list">
            {filteredTodos.map((item, i) => {
              return <li key={i} className={classNames('todoItem', { done: item.complete })}>
                Name: {item.name}, Difficulty: {item.difficulty}, Time: {item.time}
                <input type="button" className="doneButton" onClick={() => handleFinishItem(item.id)}></input>
              </li>
            })}
          </ul>
        )}
    </div>
  )

}

export default TodoList