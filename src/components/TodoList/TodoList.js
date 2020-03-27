import React, { useState, useEffect, useContext } from 'react'
import classNames from 'classnames'
import './TodoList.scss'
import './TodoColors.scss'
import useFetch from '../../hooks/useFetch'
import uniqid from 'uniqid'
import ToggleTheme from '../ToggleTheme/ToggleTheme'
import Paginator from '../Paginator/Paginator'

//contexts
import { ThemeContext } from '../../context/Settings'

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
  const [input, setInput] = useState({})
  const [showing, setShowing] = useState(Filter.ALL)
  const [page, setPage] = useState(0)

  //context
  const theme = useContext(ThemeContext)

  //custom hooks
  const [todos, loading, setTodos, updateTodos, postNewTodo] = useFetch();

  //effect
  useEffect(() => {
    updateTitle()
  })

  const updateTitle = () => {
    document.title = `Todo's: ${todos.filter(item => !item.complete).length}`;
  }

  //send PUT request for complete item. 
  const handleFinishItem = async (id) => {
    const newTodos = [...todos];
    const previous = todos.find((todo) => todo.id === id);

    const response = await updateTodos({ ...previous, complete: !previous.complete })

    newTodos[todos.indexOf(previous)] = response;
    setTodos(newTodos);
  }

  //send post request for new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const { name, difficulty, time } = input
    const newTodo = { id: uniqid(), name, difficulty, time, complete: false }
    
    await postNewTodo(newTodo);
    //get ready for next input.
    setInput({});
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const filterResults = (filter) => {
    setShowing(filter);
  }

  // filter and paginate results
  const filteredTodos = filterMenu[showing] === false || filterMenu[showing] === true ?
    todos.filter(item => item.complete === filterMenu[showing]) : todos;
  const startResults = theme.resultsPerPage * page;
  const endResults = startResults + theme.resultsPerPage
  const paginatedTodos = filteredTodos.slice(startResults, endResults);

  console.log('start, end', startResults, endResults, ' .. todos.length: ', todos.length)


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

      <div className={classNames('container', { dark: theme.darkMode })}>

        <div className={classNames('paginator', { dark: theme.darkMode })}>
          <button
            className='pageButton'
            onClick={() => page > 0 ? setPage(page - 1) : null}
          >
            Previous
          </button>
          <button
            className='pageButton'
            onClick={() => filteredTodos.length > endResults ? setPage(page + 1) : null}
          >
            Next
          </button>
          <Paginator />
        </div>

        {loading ? <p>Loading...</p> :
          (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Difficulty</th>
                  <th>Time</th>
                  <th>Finished</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTodos.map((item, i) => {
                  return <tr className={classNames('todoItem', { done: item.complete })} key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.difficulty}</td>
                    <td>{item.time}</td>
                    <td>
                      <button className="doneButton" onClick={() => handleFinishItem(item.id)}>
                        {item.complete ? 'Undo' : 'Finish'}
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          )}
      </div>
    </div>
  )
}

export default TodoList