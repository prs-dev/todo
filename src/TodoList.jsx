import React, { useEffect, useState, useRef } from 'react'
import FilterBar from './FilterBar'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import useLocalStore from './hooks/useLocalStore'
import LoginForm from './LoginForm'

//implementing local storage
const TodoList = () => {
  const [task, setTask] = useState('')
  // const [list, setList] = useState([])
  const [list, setList] = useLocalStore('todos', []) //hook used here
  const [search, setSearch] = useState('')
  const [filterState, setFilterState] = useLocalStore('filter', 'all') //hook used here 
  // const [filterState, setFilterState] = useState(() => localStorage.getItem('filter') || 'all')
  // const firstRender = useRef(true)
  const [darkMode, setDarkMode] = useState(true)
  const [user, setUser] = useLocalStore('user', '')

  const getList = (item) => {
    if (filterState === 'all') return item
    if (filterState === 'active') return item.completed === false
    if (filterState === 'done') return item.completed === true
  }

  //to retrieve the list from localstorage at load
  // useEffect(() => {
    // const newList = localStorage.getItem('todos')
    // const filter = localStorage.getItem('filter')
    // if(newList) setList(JSON.parse(newList))
    // console.log('filter', filter)
    // console.log("test", newList)
    // setList(JSON.parse(newList))
  // },[])

  // useEffect(() => {
  //   if(firstRender.current) {
  //     firstRender.current = false
  //     return
  //   }
  //   localStorage.setItem('todos', JSON.stringify(list))
  // },[list])

  // useEffect(() => {
  //   localStorage.setItem('filter', filterState)
  // }, [filterState])

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

  const s = stats() //performance wise a better choice

  // useEffect(() => {
  //   const newList = list.filter(item => {
  //     return item.task.toLowerCase().includes(search.toLowerCase())
  //   })
  //   console.log(newList)
  // },[search])

  // console.log(stats())

  // console.log(list)
  return (
    <div className={darkMode ? 'light' : "dark"}>
      <div>
        <h1>{user} logged in</h1>
      </div>
      <div style={{
        display: "flex",
        gap: "40px"
      }}>
        <FilterBar setFilterState={setFilterState} setList={setList} setSearch={setSearch} search={search}/>
        <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'dark' : "light"}</button>
      </div>
      <TodoForm user={user} setList={setList} setTask={setTask} task={task} list={list}/>
      <ul>
        {list?.filter(item => {
          return getList(item) && item.task.toLowerCase().includes(search.toLowerCase()) && item.user === user       
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
      {/* login form */}
      <LoginForm user={user} setUser={setUser}/>
    </div>
  )
}

export default TodoList