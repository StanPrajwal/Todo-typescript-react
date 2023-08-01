import React from "react";
import { Routes, Route } from "react-router-dom";
import { Todo, deleteAll, numberType } from "./Components/Utils/utils";
const Navbar = React.lazy(() => import("./Components/Navbar/Navbar"));
const TodoList = React.lazy(() => import("./Components/MyTodoList/TodoList"));
const CreateTodo = React.lazy(
  () => import("./Components/CreateTodo/CreateTodo")
);

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  function setTodoList(todo: Todo) {
    setTodos([...todos, todo]);
  }
  function UpdateTodoList(todo: Todo) {
    const todoCopy = todos.map((item) => (item.id === todo.id ? todo : item));
    setTodos(todoCopy);
  }
  function deleteTodo(cmd: number | string) {
    if (typeof cmd === numberType) {
      const todoCopy = todos.filter((item) => item.id !== cmd);
      setTodos(todoCopy);
    } else if (cmd === deleteAll) {
      setTodos([]);
    }
  }
  function markAllCompleted() {
    const todoCopy = todos.map((todo) => (todo.isCompleted = true));
  }
  return (
    <div className="App">
      <Navbar />
      <React.Suspense fallback={<div>...Loading</div>}> 
        <Routes>
          <Route path="/" element={<CreateTodo setTodoList={setTodoList} />} />
          <Route
            path="/mylist"
            element={
              <TodoList
                todos={todos}
                UpdateTodoList={UpdateTodoList}
                deleteTodo={deleteTodo}
                markAllCompleted={markAllCompleted}
              />
            }
          />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
