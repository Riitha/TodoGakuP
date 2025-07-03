import { useEffect, useState } from 'react'
import './App.css'
import normalImg from './assets/normal.png';
import taskImg from './assets/tochuu.png';
import doneImg from './assets/gj.png';
import ListTodo from './components/ListTodo';
import Swal from 'sweetalert2'


function App() {
  const [todos, setTodos] = useState([])
  //text form
  const [text, setText] = useState('');
  //end text form
  const url = "http://localhost:3000/todos"
  //progress bar useState
  const total = todos.length;
  const done = todos.filter(todo => todo.status).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  //end progress bar useState
  //edit useState
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  //end edit useState
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
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
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
      const updateTodos = todos.filter(e => e.id !== id);
      setTodos(updateTodos);
    } catch (error) {
      console.error('error', error);
    }
  }
  //end handle delete

  //handle toggle
  async function handleToggleStatus(id, currentStatus) {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: !currentStatus
        })
      });
      const updated = await res.json();

      const checkTodos = todos.map(todo => todo.id === id ? updated : todo);
      setTodos(checkTodos);
    } catch (error) {
      console.error("error", error)
    }
  }
  //handle chara icon
  function getCharacter(progress) {
    if (progress === 0) {
      return normalImg;
    } else if (progress < 100) {
      return taskImg;
    } else {
      return doneImg;
    }
  }
  //end chara icon

  //function editingTask
  function editingTask(id, task) {
    setEditId(id);
    setEditText(task);
  }
  //end function editingTask

  //handleEditSubmit
  async function handleEditSubmit(id) {
    const result = await Swal.fire({
      title: "変更するの?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "はい",
      denyButtonText: "いいえ",
    });
    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task: editText,
          }),
        });
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, task: editText } : todo
        );
        setTodos(updatedTodos)
        Swal.fire("成功しました");
      } catch (error) {
        Swal.fire("エラーが発生しました", error.message, "error");
      }
    } else if (result.isDenied) {
      Swal.fire("キャンセルしました");
    }
    setEditId(null);
    setEditText("");
  }
  //end handleEditSubmit

  //use effect
  useEffect(() => {
    FetchTodos();
  }, []);
  return (
    <>
      <main className='w-full h-screen'>

        <div className="flex gap-[20px] flex-col justify-start items-center flex-nowrap bg-indigo-900 mx-50 mt-50 border border-none rounded-xl p-8">

          <div className='flex gap-4 flex-col items-center'>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                <img
                  src={getCharacter(progress)}
                  alt='temari.png'
                />
              </div>
            </div>
            <h1 className="text-lg font-bold">TODOリスト</h1>
          </div>


          <div>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-center">プロデューサー今日の予定？</legend>
                <div className='flex gap-2'>
                  <input
                    type="text"
                    className="input"
                    placeholder="入力してください"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                  </button>
                </div>
              </fieldset>


            </form>

          </div>

          <div>
            <ul className='list bg-base-100 rounded-box shadow-md p-2'>
              {todos.map(todo => (
                <ListTodo
                  key={todo.id}
                  todo={todo}
                  editId={editId}
                  editText={editText}
                  setEditText={setEditText}
                  handleEditSubmit={handleEditSubmit}
                  handleToggleStatus={handleToggleStatus}
                  handleDelete={handleDelete}
                  editingTask={editingTask}
                />
              ))}
            </ul>
          </div>
          <div
            className="radial-progress bg-primary text-primary-content border-primary border-4"
            style={{ "--value": progress }} aria-valuenow={progress} role="progressbar">
            {progress}%
          </div>
        </div>
      </main>
    </>
  );
}

export default App
