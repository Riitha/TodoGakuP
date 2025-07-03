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
        <li className="list-row flex justify-between items-center px-4 py-3 gap-4 w-full">
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
                        className="btn btn-xs btn-outline"
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-3 min-w-0 w-[180px] overflow-hidden">
                        <input
                            type="checkbox"
                            checked={todo.status}
                            onChange={() => handleToggleStatus(todo.id, todo.status)}
                            className="checkbox checkbox-sm"
                        />
                        <div className={`text-md truncate max-w-[180px] ${todo.status ? 'line-through opacity-50' : ''}`}>
                            {todo.task}
                        </div>
                    </div>

                    <div className="flex gap-1">
                        <button
                            onClick={() => editingTask(todo.id, todo.task)}
                            className="btn btn-square btn-xs btn-ghost"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </button>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="btn btn-square btn-xs btn-ghost"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>
                    </div>
                </>
            )}
        </li>
    );
}
