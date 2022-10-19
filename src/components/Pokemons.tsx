import { SyntheticEvent, useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { ReferenceResourceResponse } from 'models/ReferenceResource'

import getPokemons from 'api/getPokemons'

import PokemonCard from './PokemonCard'

const calculateMaxPageNum = (totalItems: number, itemsPerPage: number) => {
  return Math.floor(totalItems / itemsPerPage) + 1
}

export const Pokemons = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(12)

  const { data, isLoading, error } = useQuery<ReferenceResourceResponse, Error, ReferenceResourceResponse>(
    ['pokemons', page, limit],
    () => getPokemons(page * limit, limit),
    { keepPreviousData: true },
  )

  const totalPage = data?.count ? calculateMaxPageNum(data.count, limit) : 0

  const changeLimit = (event: SyntheticEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.currentTarget.value, 10))
  }

  const loadPrevPage = () => {
    if (data?.previous) {
      setPage(p => Math.max(0, p - 1))
    }
  }

  const loadNextPage = () => {
    if (data?.next) {
      setPage(p => Math.min(totalPage, p + 1))
    }
  }

  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(['pokemons', page, limit], () => getPokemons(page * limit, limit))
    }
  }, [data?.next, page, limit, queryClient])

  if (!data && isLoading) {
    return <div className="m-4">Loading...</div>
  }

  if (error) {
    return <div className="m-4">Something went wrong: {error.message}</div>
  }

  if (!data) {
    return <div className="m-4">No data found</div>
  }

  return (
    <div className="m-4">
      <div className="mt-2 flex justify-end">
        <label className="font-semibold self-center px-2" htmlFor="items-per-page">
          Items per page:
        </label>
        <select
          className="
            appearance-none
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700
            focus:bg-white
            focus:border-blue-600
            focus:outline-none"
          aria-label="Items per page"
          name="items-per-page"
          onChange={changeLimit}
          defaultValue={limit}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>
      </div>
      <div className="mt-2 grid grid-cols-9">
        <button
          className="col-span-3 col-end-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          disabled={!data?.previous}
          type="button"
          onClick={loadPrevPage}>
          Prevous page
        </button>
        <div className="self-center font-semibold text-center col-start-4 col-end-7">Total Pages: {totalPage}</div>
        <button
          className="col-end-10 col-span-3 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          disabled={!data?.next}
          type="button"
          onClick={loadNextPage}>
          Next page
        </button>
      </div>
      <ul className="mt-2 grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {data?.results.map(d => (
          <PokemonCard key={d.name} url={d.url} />
        ))}
      </ul>
    </div>
  )
}

export default Pokemons
