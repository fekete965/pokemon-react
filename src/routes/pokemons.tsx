import { SyntheticEvent, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useDebouncedCallback } from 'use-debounce'

import Navbar from 'components/Navbar'

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
      <div className="px-4">
        <h1 className="title">Your pokemon</h1>
        <div className="flex mt-4">
          <label className="label mr-2 self-center" htmlFor="search">
            Search:
          </label>
          <input className="input" name="search" value={search} onChange={onChange} />
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Pokemons
