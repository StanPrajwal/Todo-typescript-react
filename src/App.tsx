import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import CreateTodo from "./Components/CreateTodo/CreateTodo";
import TodoList from "./Components/MyTodoList/TodoList";
import { Routes, Route } from "react-router-dom";

export type Todo = {
  title: string;
  description: string;
  id: number;
  isEdit: boolean;
};
// export const UpdateTodoList = (todo:Todo):void=>{
//   console.log(todo);

// }
function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  function setTodoList(todo: Todo) {
    setTodos([...todos, todo]);
  }
  function UpdateTodoList(todo:Todo) {
    const todoCopy = todos.map(item=>item.id === todo.id ? todo : item)
    setTodos(todoCopy)
  }
  function deleteTodo(id:number){
    const todoCopy = todos.filter(item=>item.id !== id)
    setTodos(todoCopy)
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<CreateTodo setTodoList={setTodoList} />}
        />
        <Route
          path="/mylist"
          element={<TodoList todos={todos} UpdateTodoList={UpdateTodoList} deleteTodo={deleteTodo} />}
        />
      </Routes>
    </div>
  );
}

export default App;
