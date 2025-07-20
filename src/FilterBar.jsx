import React from 'react'

const FilterBar = ({setFilterState, setList, search, setSearch}) => {
  const handleClear = () => {
    setList(prev => prev.filter(item => item.completed !== true))
  }
  return (
    <div>
        <button onClick={() => setFilterState('all')}>All</button>
        <button onClick={() => setFilterState('active')}>Active</button>
        <button onClick={() => setFilterState('done')}>Done</button>
        <button onClick={handleClear}>Clear completed</button>
        <div>
          {/* search */}
          <div>
            <input type="text" name="" id="" value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
        </div>
    </div>
  )
}

export default FilterBar