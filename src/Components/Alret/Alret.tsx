import { useNavigate } from "react-router-dom";
import AlretBox from "./Alret.module.css";
import { deleteAll, deleteType } from "../Utils/utils";
export default function Alret(props: any) {
  const navigate = useNavigate();
  const { open, setOpen, message } = props;
  function cancelAlret(): void {
    setOpen(false);
  }
  function navigateList(): void {
    if(message?.deleteTodo){
      message.deleteTodo(deleteAll)
    }else{
     
      navigate("/mylist");
    }
    cancelAlret();
   
  }
  return (
    <div style={message.style.box} className={open ? AlretBox.alretBox : AlretBox.alretBoxClose}>
      <p className={AlretBox.cancel} onClick={cancelAlret}>
        ❌
      </p>
      <p className={AlretBox.message}>
        {message.text}
        <span className={AlretBox.goList} style={message.style.button} onClick={navigateList}>
          {message.type}
        </span>
      </p>
    </div>
  );
}
