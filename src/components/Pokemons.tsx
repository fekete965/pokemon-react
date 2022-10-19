import { usePokemonsWithPagination } from 'utils/hooks'
import { ItemsPerPage } from 'utils/index'

import PokemonCard from './PokemonCard'

export const Pokemons = () => {
  const { error, changeLimit, data, limit, loadNextPage, loadPrevPage, isLoading, totalPage } =
    usePokemonsWithPagination()

  if (!data && isLoading) {
    return <div className="loading-container">💿 Loading...</div>
  }

  if (error) {
    return <div className="error-container">❗ Something went wrong: {error.message}</div>
  }

  if (!data) {
    return <div className="no-data-container">😞 No data found</div>
  }

  return (
    <div className="m-4">
      <div className="mt-2 flex justify-end">
        <label className="label self-center" htmlFor="items-per-page">
          Items per page:
        </label>
        <select
          className="select-input"
          aria-label="Items per page"
          name="items-per-page"
          onChange={changeLimit}
          defaultValue={limit}>
          {Object.entries(ItemsPerPage).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="pokemons-action-button-container">
        <button className="button col-span-3 col-end-4" disabled={!data?.previous} type="button" onClick={loadPrevPage}>
          Prevous page
        </button>
        <div className="self-center font-semibold text-center col-start-4 col-end-7">Total Pages: {totalPage}</div>
        <button className="button col-span-3 col-end-10" disabled={!data?.next} type="button" onClick={loadNextPage}>
          Next page
        </button>
      </div>
      <ul className="pokemons-card-container">
        {data?.results.map(d => (
          <PokemonCard key={d.name} url={d.url} />
        ))}
      </ul>
    </div>
  )
}

export default Pokemons
