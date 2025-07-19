import React, { useEffect, useState, useRef } from 'react'
import FilterBar from './FilterBar'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

//implementing local storage
const TodoList = () => {
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [filterState, setFilterState] = useState(() => localStorage.getItem('filter') || 'all')
  const firstRender = useRef(true)
  const [darkMode, setDarkMode] = useState(true)

  const getList = (item) => {
    if (filterState === 'all') return item
    if (filterState === 'active') return item.completed === false
    if (filterState === 'done') return item.completed === true
  }

  //to retrieve the list from localstorage at load
  useEffect(() => {
    const newList = localStorage.getItem('todos')
    const filter = localStorage.getItem('filter')
    if(newList) setList(JSON.parse(newList))
    console.log('filter', filter)
    // console.log("test", newList)
    // setList(JSON.parse(newList))
  },[])

  useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false
      return
    }
    localStorage.setItem('todos', JSON.stringify(list))
  },[list])

  useEffect(() => {
    localStorage.setItem('filter', filterState)
  }, [filterState])

  const stats = () => {
    const total = list.length
    const active = list.filter(item => item.completed === false).length
    const completed = list.filter(item => item.completed !== false).length
    const percentCompleted = (completed / total) * 100
    return {
      total,
      active,
      completed,
      percentCompleted
    }
  }

  const s = stats()

  // console.log(stats())

  // console.log(list)
  return (
    <div className={darkMode ? 'light' : "dark"}>
      <div style={{
        display: "flex",
        gap: "40px"
      }}>
        <FilterBar setFilterState={setFilterState} setList={setList} />
        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'dark' : "light"}</button>
      </div>
      <TodoForm setList={setList} setTask={setTask} task={task} list={list}/>
      <ul>
        {list?.filter(item => {
          return getList(item)
        }).map(item => (
          <TodoItem item={item} list={list} setList={setList} setTask={setTask} />
        ))}
      </ul>
      {/* stats */}
      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <p>Total Tasks: {s.total}</p>
        <p>Active Tasks: {s.active}</p>
        <p>Completed Tasks:  {s.completed}</p>
        <div>
          % Completed: <progress value={s.percentCompleted} max="100">{s.percentCompleted}</progress>
        </div>
      </div>
    </div>
  )
}

export default TodoList