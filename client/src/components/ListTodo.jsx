export default function ListTodo({
  todo,
  editId,
  editText,
  setEditText,
  handleEditSubmit,
  handleToggleStatus,
  handleDelete,
  editingTask,
}) {
  return (
    <li className="list-row items-center gap-3 px-4 py-2 border-b">
      {editId === todo.id ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="input input-sm input-bordered flex-1"
          />
          <button
            onClick={() => handleEditSubmit(todo.id)}
            className="btn btn-sm btn-outline"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => handleToggleStatus(todo.id, todo.status)}
              className="checkbox checkbox-sm"
            />
            <span className={todo.status ? 'line-through opacity-50' : ''}>
              {todo.task}
            </span>
          </div>
          <button
            onClick={() => editingTask(todo.id, todo.task)}
            className="btn btn-sm btn-ghost"
          >
            ✏️
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="btn btn-sm btn-ghost"
          >
            🗑️
          </button>
        </>
      )}
    </li>
  );
}