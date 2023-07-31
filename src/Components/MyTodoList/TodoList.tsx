import { ChangeEvent, useState } from "react";
import TodoListCss from "./TodoList.module.css";
import { Todo } from "../../App";
type Todos = {
  title: string;
  description: string;
  resetTitle: string;
  resetDescription: string;
  isProcessing: boolean;
};
export default function TodoList(props: any) {
  const { todos, UpdateTodoList,deleteTodo } = props;
  const [editTodo, setEditTodo] = useState<Todos>({
    title: "",
    description: "",
    resetTitle: "",
    resetDescription: "",
    isProcessing: false,
  });
  const savehandler = (todo: Todo) => {
    if (editTodo.description && editTodo.title) {
      console.log(todo);
      todo.description = editTodo.description;
      todo.title = editTodo.title;
      todo.isEdit = false;
      UpdateTodoList(todo);
      editTodo.isProcessing = false;
    }
  };
  const editTodhandler = (todo: Todo) => {
    // todo.isEdit = true;
    if (!editTodo.isProcessing) {
      todo.isEdit = true;
      UpdateTodoList(todo);
      const todoCopy = {
        title: todo.title,
        description: todo.description,
        resetTitle: todo.title,
        resetDescription: todo.description,
        isProcessing: true,
      };
      setEditTodo(todoCopy);
    } else {
      alert("Please Complete Edited One");
    }
  };
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditTodo({ ...editTodo, [name]: value });
  };
  const resetData = (title:string, description:string) => {
    setEditTodo({ ...editTodo, title, description });
  };
  const clearTodo = (title:string,description:string)=>{
    setEditTodo({ ...editTodo, title, description });
  }
  return (
    <>
      <div className={TodoListCss.todoContainer}>
        {todos.length ? (
          todos.map((todo: Todo) => {
            return (
              <div className={TodoListCss.todo} key={todo.id}>
                {todo.isEdit ? (
                  <div>
                    <input
                      className={TodoListCss.inputBox}
                      value={editTodo.title}
                      name="title"
                      onChange={(e) => changeHandler(e)}
                    />
                    <textarea
                      className={TodoListCss.inputBox}
                      value={editTodo.description}
                      name="description"
                      onChange={(e) => changeHandler(e)}
                    ></textarea>
                    <p className={TodoListCss.btns}>
                      <button
                        className={TodoListCss.saveEdit}
                        onClick={() => savehandler(todo)}
                      >
                        Save Edit
                      </button>
                      <button
                        className={TodoListCss.resetTodo}
                        onClick={() =>
                          resetData(
                            editTodo.resetTitle,
                            editTodo.resetDescription
                          )
                        }
                      >
                        Reset Todo
                      </button>
                      <button className={TodoListCss.clearTodo} onClick={()=>clearTodo("","")}>
                        Clear Todo
                      </button>
                    </p>
                  </div>
                ) : (
                  <div key={todo.id}>
                    <p className={TodoListCss.titleText}>{todo.title} :</p>
                    <p className={TodoListCss.description}>
                      {todo.description}
                    </p>
                    <p className={TodoListCss.editDelete}>
                      <button
                        className={TodoListCss.edit}
                        onClick={() => editTodhandler(todo)}
                      >
                        Edit
                      </button>
                      <button className={TodoListCss.delete} onClick={()=>deleteTodo(todo.id)}>Delete</button>
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h4 className={TodoListCss.noTodo}>No Record Found</h4>
        )}
      </div>
    </>
  );
}
