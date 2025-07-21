import React, { useState } from 'react'

const TodoForm = ({ setList, setTask, task, user }) => {
  const [addDesc, setAddDesc] = useState(false)
  const [desc, setDesc] = useState('')
  const [dueDate, setDueDate] = useState()
  const handleSubmit = e => {
    // const random = Math.random()
    // const s = random.toString(16)
    // const id = s.slice(2)
    
    //checks if due date exists
    if(!dueDate) {
      window.alert('Please provide a due date')
      return 
    }
    e.preventDefault()
    setList(prev => [...prev, {
      id: Math.random().toString(16).slice(2),
      task,
      completed: false,
      description: desc,
      dueDate, 
      user
    }])
    // storing in localstorage after new task
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="" id="" value={task} onChange={e => setTask(e.target.value)} />
        <button type='submit'>Save</button>
        <div>
          <button type='button' onClick={() => setAddDesc(prev => !prev)}>Add Description</button>
          {addDesc && <textarea name="" id="" value={desc} onChange={e => setDesc(e.target.value)}></textarea>}
        </div>
        <div>Due date: <input min={new Date().toISOString().split("T")[0]} type="date" name="" id="" value={dueDate} onChange={e => setDueDate(e.target.value)}/></div>
      </form>
    </div>
  )
}

export default TodoForm