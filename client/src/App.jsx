import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  //text form
  const [text, setText] = useState('');
  //end text form
  const url = "http://localhost:3000/todos"
  // fetch todos
  async function FetchTodos() {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      setTodos(data)
    } catch(error) {
      console.error('error', error);
    }
  }
  //end fetch todos

  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();

    if (text.trim() === '') return;
    const newTodo = {
      task: text,
      status: false
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setText('')
    } catch (error) {
      console.error('error', error);
    }
  }
  //end handle submit

  //handle delete
  async function handleDelete(id) {
    try {
      await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      const updateTodos = todos.filter(e => e.id !==id);
      setTodos(updateTodos);
    } catch (error) {
      console.error('error', error);
    }
  }
  //end handle delete

  //handle toggle
  async function handleToggleStatus(id, currentStatus) {
    try {
      const res = await fetch (`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status:!currentStatus
        })
      });
      const updated = await res.json();

      const checkTodos = todos.map(todo=> todo.id === id? updated : todo);
      setTodos(checkTodos);
    } catch (error) {
      console.error("error", error)
    }
  }

  //use effect
  useEffect (()=>{
    FetchTodos();
  }, []);
  return (
    <>
      <h1>Daftar Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='やりたい事入力してよね'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      <button type='submit'>add</button>
      </form>
      <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
          type='checkbox'
          checked={todo.status}
          onChange={() => handleToggleStatus(todo.id, todo.status)}
          />
        {todo.task} {todo.status ? '✅' : ''}
        <button onClick={() => handleDelete(todo.id)}>del</button>
        </li>
        ))}
      </ul>
    </>
  )
}

export default App
