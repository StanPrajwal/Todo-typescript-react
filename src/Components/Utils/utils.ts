const deleteAll: string = "deleteAll";
const todoConfirmMessage: string = "✅ Your New Todo Added";
const markCompleted: string = "Completed";
const markNotCompleted: string = "Mark as Completed";
const noList: string = "No Record Found";
const numberType: string = "number";
const textDecoration:string= "line-through"
const deleteAllTodConfirm = "❗Are you sure,You want to delete all Todos?"
const deleteType = 'Delete'
const addType = "Go List"
export type Todos = {
  title: string;
  description: string;
  resetTitle: string;
  resetDescription: string;
  isProcessing: boolean;
};

export type All = {
  deleteAll: boolean;
  markAll: boolean;
};

export type Todo = {
  title: string;
  description: string;
  id: number;
  isEdit: boolean;
  isCompleted: boolean;
};
const confirmBox={
  color: "rgb(24, 176, 24)",
  backgroundColor: "rgb(176, 236, 176)"
}
const deleteBox={
  backgroundColor: "rgb(239, 183, 155)",
  color: "rgb(217, 88, 18)"
}
const deleteBtn={
  backgroundColor: "rgb(240, 159, 129)",
  color: "rgb(182, 72, 32)"
}
const confirmBtn ={
  color: "white",
  backgroundColor: "rgb(15, 81, 15)"
}

export {
  deleteAll,
  todoConfirmMessage,
  markCompleted,
  markNotCompleted,
  noList,
  numberType,
  textDecoration,
  deleteAllTodConfirm,
  deleteType,
  addType,
  confirmBox,
  deleteBtn,
  confirmBtn,
  deleteBox
};
