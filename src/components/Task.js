import {useEffect,useRef} from "react"
import del from '.././images/icon-cross.svg';
const Task = ({task,delTask,compTask, drop}) => {
  const {id,todo,completed} = task[0];
  const ref = useRef(null);
  useEffect(()=>{
    completed ? ref.current.classList.add("completed"): ref.current.classList.remove("completed");
  },[completed])
  const dragStart = (e) =>{
    e.target.style.transparency = 0;
    e.dataTransfer.setData('id',e.target.id);
  }
  const dragOver = (e) =>{
    e.preventDefault();
  }
  return (
    <>
      <div className = "task"  ref = {ref} draggable = "true" onDragStart={dragStart} onDragOver={dragOver} onDrop = {drop} id = {id}>
        <div className = "taskInfo" id = {id}>
          <input type = "checkbox" className = "checkBox" onChange = {() => {compTask(id)}} checked = {completed} id = {id} />
          <h4 className = "todo" id = {id} onClick ={()=>{compTask(id)}}>{todo} </h4>
        </div>
          <img src = {del} alt = "delete" onClick = {() => delTask(id)} name = {todo} className = "delete" />
      </div>
      <hr></hr>
    </>
  )
}
export default Task;