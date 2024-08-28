import { useEffect } from "react";
import { useState } from "react";
import classes from "./style.module.css"
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details";

function App() {

  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [errorMsg,setErrorMsg] = useState(null)
  const [todoDetails,setTodoDetails] = useState(null)
  const [dialog,setDialog] = useState(false)

  async function fetchTodoList(){
    try{
    setIsLoading(true)
    const response = await fetch('https://dummyjson.com/todos')
    const result = await response.json()

    if (result.todos.length > 0) {
      setTodoList(result.todos)
      setIsLoading(false)
      setErrorMsg("")
    }
    else{
      setTodoList([])
      setErrorMsg("")
    }
    }
    catch(e){
      setErrorMsg("some error occured")
      console.log(e)
    }
  }

  async function fetchSingleTodoDetails(todoId){
    try{
      const response = await fetch(`https://dummyjson.com/todos/${todoId}`)
      const details = await response.json()
      if (details){
        setTodoDetails(details)
        setDialog(true)
      }
      else{
        setTodoDetails(null)
        setDialog(false)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    fetchTodoList()
  },[])


  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.title}>Simple Todo List Application</h1>
      <div className={classes.todoListWrapper}>
      { todoList.length>0? 
        todoList.map((todoItem)=><TodoItem todo={todoItem} key={todoItem.id} fetchSingleTodoDetails={fetchSingleTodoDetails} /> )
        : null
      }
      </div>
      <TodoDetails todoDetails={todoDetails} dialog={dialog} setDialog={setDialog} setTodoDetails={setTodoDetails} />
    </div>
  )
}

export default App
