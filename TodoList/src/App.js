import React, { useState, useRef, useEffect } from 'react';
import List from './List'

function App() {
  const [taskLeft, setTaskLeft] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    const storedTaskLeft = localStorage.getItem('taskLeft');
    if (storedTaskLeft) {
      setTaskLeft(parseInt(storedTaskLeft));
    }
    
    const storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskLeft', taskLeft);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskLeft, taskList]);  

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  function addTask(){
    if(inputValue) {
      setTaskLeft(taskLeft + 1)
      setInputValue('')
      setTaskList([...taskList, {task:inputValue, done: false}])
    }
  }

  const handleTaskClick = (index) => {
    setTaskList([...taskList.slice(0, index), {task: taskList[index].task, done: !taskList[index].done} ,...taskList.slice(index + 1)])
    if(!taskList[index].done) {
      setTaskLeft(taskLeft - 1)
    } else {
      setTaskLeft(taskLeft + 1)
    }
  }

  function removeAll() {
    setTaskList([])
    setTaskLeft(0)
  }

  function removeDone() {
    let tasks = []
    taskList.forEach(task => {
      if (!task.done) {
        tasks.push(task)
      }
    })
    setTaskList(tasks)
  }

  return (
    <>
      <h1>TODO List</h1>
      <input type='text' placeholder='Enter task' value={inputValue} onChange={handleInputChange}/>
      <button onClick={addTask}>Add</button>
      <button onClick={removeDone}>Remove Done</button>
      <button onClick={removeAll}>Remove All</button>
      <div>{taskLeft} task left</div>
      <List taskList={taskList} handleTaskClick={handleTaskClick}/>
    </>
  )
}

export default App;
