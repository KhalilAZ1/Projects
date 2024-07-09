import React from 'react'

export default function List(props) {
    const {taskList, handleTaskClick} = props

    return (
        <div>
            {taskList.map((task, index) => (
                <div>
                    <input type='checkbox' checked={task.done} onChange={() => handleTaskClick(index)} />
                    <span key={index}>{task.task}</span>
                </div>
            ))}
        </div>  
    )
}