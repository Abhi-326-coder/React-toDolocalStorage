import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm'
import TodoItems from './components/TodoItems'

function App() {
  const [todos,setTodos] = useState([]);
 
  // for adding an object in an array we used map function and to access previous arr, we have used callback (prev)=>[{id:Date.now ,...todo},...prev]
  const addTodo = (todo)=>{
    //We cant simply add todo like this as it will override the previous state
    // setTodos([todo]);
    //Instead we will use a callback function to get the previous state and add the new todo to it
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prev.id===id? todo : prevTodo))
  }

  const deleteTodo = (id)=>{
    // Vo wala Do jo id ko match nhi kartha
    setTodos((prev)=>prev.filter((todo)=>todo.id !== id))
  }

  // if We use ()=>{curly braces} then it becomes a arrow function then we have to return something if we don't want to return then use ()=>()
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed} : prevTodo ))
  }
  

  useEffect(()=>{
    // localStorage.getItem will give in String format so convert it into We have to convert it into JSON format 
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map((todo)=>(
                    <div key={todo.id} 
                    className='w-full'
                      >
                      <TodoItems todo={todo} />
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
