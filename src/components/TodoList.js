import Task from './Task'
const TodoList = ({tasks,delTask,compTask,order, drop}) => {
  return (
    <div className="todoList" >
      {order.map((id)=>(
        tasks.some(el=> el.id === id) && <Task key ={id} task = {tasks.filter((task)=> task.id === id)} delTask = {delTask} compTask = {compTask} drop = {drop}/>
        ))
      }
    </div>
  )
}
export default TodoList;