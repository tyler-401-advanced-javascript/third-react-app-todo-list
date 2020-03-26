import { useState, useEffect } from 'react'

const URL = 'http://localhost:3000/todos'

//this function will do our get-all's for the todo list.  
export default function useFetch() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const getTodos = async () => {
    setLoading(true)
    try {
      const raw = await fetch(URL)
      const response = await raw.json();
      setTodos(response);
    } catch (err) {
      console.log(err, err.message);
    } finally {
      setLoading(false)
    }
  }

  // this useEffect only runs when todos = [] (initial run)
  useEffect(() => {
    getTodos();
  }, [])

  //returns the todos we got and the loading status.

  return [
    todos,
    loading,
  ]
}