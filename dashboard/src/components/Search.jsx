// import React from 'react'
const Search = ({searchValue,setSearchValue}) => {
  return (
    <div className="flex justify-between items-center">
        <input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className="bg-[#37415e] px-4 py-1 focus:border-indigo-500 outline-none text-[#f3efef]"
        type="text"
        placeholder="search"
        />
    </div>
  )
}

export default Search