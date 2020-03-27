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
      console.log('got here');
      setTodos(response);
    } catch (err) {
      console.log(err, err.message);
    } finally {
      setLoading(false)
    }
  }

  const updateTodos = async (data) => {
    //maybe set an in-button spinner

    //send a request to update the todo in question
    const url =`${URL}/${data.id}`;

    console.log('the url is : ', url)

    const raw = await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(data)
    })
    //return the new info
    return await raw.json();
  }

  async function postNewTodo(data) {
    const raw = await fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const response = await raw.json();

    //set the new todos is good response. On next refresh, todos will get set straight from API, but in mean time we can pencil in the new entry. 
    setTodos([...todos, response])

  }

  // this useEffect only runs when todos = [] (initial run)
  useEffect(() => {
    getTodos();
  }, [])

  //returns the todos we got and the loading status.

  return [
    todos,
    loading,
    setTodos,
    updateTodos,
    postNewTodo
  ]
}