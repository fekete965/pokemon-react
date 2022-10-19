import { SyntheticEvent, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useDebouncedCallback } from 'use-debounce'

import Navbar from '../components/Navbar'

const Pokemons = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>('')
  const debouncedNavigate = useDebouncedCallback((id: string) => navigate(id), 500)

  useEffect(() => {
    if (search) {
      debouncedNavigate(`/pokemons/${search}`)
    }
  }, [search])

  const onChange = (event: SyntheticEvent<HTMLInputElement>) => setSearch(event.currentTarget.value)

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-center">Your pokemon</h1>
        <div className="flex mt-4">
          <label className="flex justify-center items-center font-semibold text-xl px-2" htmlFor="search">
            Search:
          </label>
          <input
            className="
          w-full
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
            name="search"
            value={search}
            onChange={onChange}
          />
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Pokemons
