import {useEffect,useRef,useState} from "react"
const Footer = ({tasks,setWhich,clearCompleted}) => {
  const [current,setCurrent] = useState("all");
  const allRef = useRef();
  const activeRef = useRef();
  const completedRef = useRef();
  const prevCurrent = useRef();
  const handleCurrent = (newCurrent) => {
    setCurrent(()=>newCurrent);
  }
  useEffect(() => {
    switch(current){
      case "all": 
        allRef.current.classList.add("current");
        prevCurrent.current === "active" ? activeRef.current.classList.remove("current") : completedRef.current.classList.remove("current");
        break;
      case "active": 
        activeRef.current.classList.add("current");
        prevCurrent.current === "all" ? allRef.current.classList.remove("current") : completedRef.current.classList.remove("current");
        break;
      case "completed": 
        completedRef.current.classList.add("current");
        prevCurrent.current === "all" ? allRef.current.classList.remove("current") : activeRef.current.classList.remove("current");
        break;
      default:
        console.log("allsdds") ;
    }
    prevCurrent.current = current;
  },[current])
  return (
    <div className = "footer">
      <p>{tasks} items left</p>
      <div className = "toggleList">
          <p ref = {allRef} onClick = {()=>{setWhich("all"); handleCurrent("all")}}>All</p>
          <p ref = {activeRef}  disabled onClick = {()=>{setWhich("active");handleCurrent("active")}}>Active</p>
          <p ref = {completedRef}  onClick = {()=>{setWhich("completed"); handleCurrent("completed")}}>Completed</p>
      </div>
      <p className = "clearComp"  onClick = {()=>clearCompleted()}>Clear Completed</p>
    </div>
  )
}
export default Footer;