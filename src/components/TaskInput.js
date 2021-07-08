const TaskInput = ({addTask}) => {
  return (
    <>
      <input type = "text" className = "task input" placeholder = "Create a new todo..." onKeyPress ={ (e) => {if(e.key ==='Enter'){addTask(e.target.value); e.target.value=""}}} />
    </>
  )
}
export default TaskInput;