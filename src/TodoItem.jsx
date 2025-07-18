import React, {use, useState} from 'react'

const TodoItem = ({ item, list, setList }) => {
  const handleDelete = (id) => {
    const newList = list.filter(item => item.id !== id)
    setList(newList)
  }
  const handleComplete = id => {
    const newList = list.map(item => item.id === id ? {
      ...item, completed: !item.completed
    }: item)
    setList(newList)
  }
  // console.log(i)
  return (
    <li onDrop={e => {
      e.preventDefault()
      const droppedId = e.dataTransfer.getData('text/plain')
      const currentId = item.id
      if(currentId === droppedId) return
      const droppedIdx = list.findIndex(item => item.id === droppedId)
      const currentIdx = list.findIndex(item => item.id === currentId)
      const changedList = [...list]
      const currentItem = changedList.splice(droppedIdx, 1)[0]
      changedList.splice(currentIdx, 0, currentItem)
      setList(changedList)
      console.log(currentItem)
      // console.log(droppedId, currentId)
      // console.log(droppedIdx)
    }} onDragOver={e => e.preventDefault()} draggable={true} key={item.id} onDragStart={e => e.dataTransfer.setData('text/plain', item.id)}> 
      {item.task} completed: <input type='checkbox' checked={item.completed} onChange={() => handleComplete(item.id)}/> <button onClick={() => handleDelete(item.id)}>delete</button>
    </li>
  )
}

export default TodoItem