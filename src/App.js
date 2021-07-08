import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import TaskInput from './components/TaskInput';
import AddModal from './components/AddModal';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
const todoList = [
  { id: 2, todo: 'Pick up groceries', completed: true },
  { id: 1, todo: 'Work out', completed: false },
  { id: 4, todo: 'Work on Project', completed: true },
  { id: 3, todo: 'Read', completed: false },
]
function App() {
  const [tasks, setTasks] = useState(todoList);
  const [showTasks, setShowTasks] = useState(tasks);
  const [whichTask, setWhichTask] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [order, setOrder] = useState(todoList.map(task => task.id));
  // Task Functions
  const delTask = (id) => {
    setTasks(tasks.filter(task => (task.id !== id)));
    setOrder(order.filter(orderId => (orderId !== id)));
  }
  const compTask = (id) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return { ...task };
    }))
  }
  const removeModal = () => {
    setShowModal(false);
  }
  const addTask = (newTodo) => {
    if (newTodo === "") {
      setShowModal(true);
    }
    else {
      let newId = Math.max(...order) + 1;
      let newOrder = order.concat([Math.max(...order) + 1]);

      newOrder.length === 1 && (newOrder = [1])
      order.length === 0 && (newId = 1)

      setTasks([...tasks, { id: newId, todo: newTodo, completed: false }]);
      setOrder(newOrder);
    }
  }
  // Display Tasks
  const setWhich = (which) => {
    setWhichTask(which);
  }
  // Clear Completed Tasks
  const clearCompleted = () => {
    const newList = tasks.filter((task) => (task.completed === false));
    const newListIds = newList.map((task) => task.id);
    const newOrder = order.filter(id => newListIds.includes(id));
    setTasks(newList);
    setOrder(newOrder);
  }
  // Theme Function
  const changeTheme = () => {
    setDarkTheme(!darkTheme);
  }
  // Drag and drop
  const drop = e => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('id')
    let newOrder = order;
    if (e.target.id !== taskId) {
      newOrder = order.filter(id => id !== parseInt(taskId));
      if (order.indexOf(parseInt(e.target.id)) > order.indexOf(parseInt(taskId))) {
        newOrder.splice(newOrder.indexOf(parseInt(e.target.id)) + 1, 0, parseInt(taskId));
      }
      else {
        newOrder.splice(newOrder.indexOf(parseInt(e.target.id)), 0, parseInt(taskId));
      }
    }
    setOrder(newOrder);
  }
  const dragOver = (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    switch (whichTask) {
      case "all":
        setShowTasks(tasks);
        break;
      case "active":
        setShowTasks(tasks.filter((task) => (task.completed !== true)));
        break;
      case "completed":
        setShowTasks(tasks.filter((task) => (task.completed !== false)));
        break;
      default:
        setShowTasks(tasks);
    }
  }, [tasks, whichTask])

  return (
    <div className={darkTheme ? "bg" : "bg lightMode"} >
      <div className="container" onDragOver={dragOver}>
        {showModal && <AddModal removeModal={removeModal} />}
        <Header darkTheme={darkTheme} changeTheme={changeTheme} />
        <TaskInput addTask={addTask} />
        <TodoList tasks={showTasks} delTask={delTask} compTask={compTask} order={order} drop={drop} />
        <Footer
          tasks={showTasks.reduce((accumulator, task) => { if (task.completed === false) accumulator++; return accumulator; }, 0)}
          setWhich={setWhich}
          clearCompleted={clearCompleted} />
        <p style={{ textAlign: "center", marginTop: "1rem", color: "hsl(233, 14%, 35%)" }}>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}
export default App;
