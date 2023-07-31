import { useState, ChangeEvent } from "react";
import CreateTodos from "./CreateTodo.module.css";
import { Todo } from "../../App";
// import uuidv4 from "uuid/dist/v4"
export default function CreateTodo(props:any){
  const [todo, setTodo] = useState<Todo>({ title: "", description: "",id:NaN,isEdit:false });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    const id = Date.now()
  
    setTodo({ ...todo, [name]: value ,id});
  };
  //   console.log(todo);
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // console.log(todo);
    if(todo.title && todo.description){
    props.setTodoList(todo);
    const title = ''
    const description = ""
    setTodo({...todo,title,description})
    }else{
      alert("Complete Your Todo")
    }
    
  };
  return (
    <>
      <form className={CreateTodos.form} onSubmit={handleSubmit}>
        <div className={CreateTodos.inputBox}>
          <input
            className={CreateTodos.input}
            placeholder="Todo Title"
            value={todo.title}
            onChange={changeHandler}
            name="title"
          />
        </div>
        <div className={CreateTodos.inputBox}>
          <textarea
            className={CreateTodos.input}
            placeholder="Todo Description"
            value={todo.description}
            onChange={changeHandler}
            name="description"
          ></textarea>
        </div>
        <div className={CreateTodos.inputBox}>
          <button type="submit" className={CreateTodos.button}>
            Save My Todo
          </button>
        </div>
      </form>
    </>
  );
}
