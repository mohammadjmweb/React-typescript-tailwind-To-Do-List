import './App.css'
import React, { useState } from 'react'

interface Todo{
    id:number;
    text:string;
}

const App:React.FC=()=>{
    const [todos,setTodos]=useState<Todo[]>([])
    const [inputValue,setInputValue]=useState<string>('')
    const [editId,setEditId]=useState<number|null>(null)
    const [editText,setEditText]=useState<string>('')

    const addTodo=()=>{
        if(inputValue.trim()==='')
    return;

        const newTodo:Todo={
            id:Date.now(),
            text:inputValue
        }
        setTodos([...todos,newTodo])
        setInputValue('')
    }
    const deleteTodo=(id:number)=>{
        setTodos(todos.filter(todo=>todo.id !== id))
    }

    const startEdit=(todo:Todo)=>{
        setEditId(todo.id)
        setEditText(todo.text)
    }

    const saveEdit=()=>{
        if(editText.trim()==='') return

        setTodos(todos.map(todo=>(todo.id===editId ? {...todo,text:editText} : todo )))

        setEditId(null)
        setEditText('')
    }
    return(
        <div className='max-w-md mx-auto mt-10'>
            <h1 className='text-2xl font-bold mb-4'>To Do List</h1>
            <div className='flex mb-4'>
                <input 
                    type='text'
                    value={editId ? editText : inputValue}
                    onChange={(e)=>editId ? setEditText(e.target.value) : setInputValue(e.target.value)}
                    className='border border-gray-300 p-2 flex-grow'
                    placeholder='Add a new task...'
                />
                <button onClick={editId ? saveEdit : addTodo} className='bg-blue-500 text-white p-2 ml-2'>
                    {editId ? 'Save' : 'Add'}
                </button>
            </div>
            <ul className='list-disc pl-5'>
                {todos.map(todo=>(
                    <li key={todo.id} className='flex justify-between items-center mb-2'>
                        <span>{todo.text}</span>
                        <div>
                            <button onClick={()=> startEdit(todo)} className='bg-yellow-500 text-white p-1 mr-2'>Edit</button>
                            <button onClick={()=> deleteTodo(todo.id)} className='bg-red-500 text-white p-1'>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default App