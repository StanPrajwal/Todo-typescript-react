import { ChangeEvent, useState } from "react";
import TodoListCss from "./TodoList.module.css";
import { MdOutlineDelete, MdResetTv } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { TfiSave } from "react-icons/tfi";
import { AiOutlineClear } from "react-icons/ai";

import {
  All,
  Todo,
  Todos,
  deleteAll,
  deleteAllTodConfirm,
  deleteBox,
  deleteBtn,
  deleteType,
  markCompleted,
  markNotCompleted,
  noList,
  textDecoration,
} from "../Utils/utils";
import Alret from "../Alret/Alret";

export default function TodoList(props: any) {
  const { todos, UpdateTodoList, deleteTodo, markAllCompleted } = props;
  const message = {
    text: deleteAllTodConfirm,
    type: deleteType,
    style: {
      box: deleteBox,
      button: deleteBtn,
    },
    deleteTodo,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [todoControl, setTodoControl] = useState<All>({
    deleteAll: false,
    markAll: false,
  });
  const [editTodo, setEditTodo] = useState<Todos>({
    title: "",
    description: "",
    resetTitle: "",
    resetDescription: "",
    isProcessing: false,
  });
  const savehandler = (todo: Todo) => {
    if (editTodo.description && editTodo.title) {
      // console.log(todo);
      todo.description = editTodo.description;
      todo.title = editTodo.title;
      todo.isEdit = false;
      // console.log(editTodo)
      if (
        editTodo.title !== editTodo.resetTitle ||
        editTodo.description !== editTodo.resetDescription
      ) {
        // console.log("true");
        todo.isCompleted = false;
      }

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
  const resetData = (title: string, description: string) => {
    setEditTodo({ ...editTodo, title, description });
  };
  const clearTodo = (title: string, description: string) => {
    setEditTodo({ ...editTodo, title, description });
  };
  const todoComplete = (todo: Todo) => {
    todo.isCompleted = true;
    UpdateTodoList(todo);
  };
  return (
    <>
    {todos.length? 
      <div className={TodoListCss.allClear}>
        <button
          className={
            todoControl.markAll
              ? TodoListCss.completeTodoAfter
              : TodoListCss.completeTodoBefore
          }
          onClick={() => {
            markAllCompleted();
            setTodoControl({ ...todoControl, markAll: true });
          }}
        >
          {todoControl.markAll ? `✅ ${markCompleted}` : markNotCompleted}
        </button>
        <button className={TodoListCss.deleteAll} onClick={() => setOpen(true)}>
          Delete All List
        </button>
      </div>:""}
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
                      <span
                        className={TodoListCss.saveEdit}
                        onClick={() => savehandler(todo)}
                      >
                        <TfiSave />
                      </span>
                      <span
                        className={TodoListCss.resetTodo}
                        onClick={() =>
                          resetData(
                            editTodo.resetTitle,
                            editTodo.resetDescription
                          )
                        }
                      >
                        <MdResetTv />
                      </span>
                      <span
                        className={TodoListCss.clearTodo}
                        onClick={() => clearTodo("", "")}
                      >
                        <AiOutlineClear />
                      </span>
                    </p>
                  </div>
                ) : (
                  <div key={todo.id}>
                    <p
                      className={TodoListCss.titleText}
                      style={
                        todo.isCompleted
                          ? { textDecoration: textDecoration }
                          : {}
                      }
                    >
                      {todo.title} :
                    </p>
                    <p
                      className={TodoListCss.description}
                      style={
                        todo.isCompleted
                          ? { textDecoration: textDecoration }
                          : {}
                      }
                    >
                      {todo.description}
                    </p>
                    <p className={TodoListCss.editDelete}>
                      <span
                        className={TodoListCss.edit}
                        onClick={() => editTodhandler(todo)}
                      >
                        <RiEdit2Fill />
                      </span>
                      <span
                        className={TodoListCss.delete}
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <MdOutlineDelete />
                      </span>
                      <button
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "12px",
                        }}
                        className={
                          todo.isCompleted
                            ? TodoListCss.completeTodoAfter
                            : TodoListCss.completeTodoBefore
                        }
                        onClick={() => todoComplete(todo)}
                      >
                        {todo.isCompleted
                          ? `✅ ${markCompleted}`
                          : markNotCompleted}
                      </button>
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h4 className={TodoListCss.noTodo}>{noList}</h4>
        )}
      </div>
      <Alret open={open} setOpen={setOpen} message={message} />
    </>
  );
}
