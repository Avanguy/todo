import {useEffect} from "react";

const AddModal = ({removeModal}) => {
  useEffect(()=>{

    setTimeout(()=>{
      removeModal();
    },1500);
  
  })
  return (
    <div className = "addModal">
      <p>Enter a task</p>
    </div>
  )
}
export default AddModal;