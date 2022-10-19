import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { ReferenceResourceResponse } from 'models/ReferenceResource'

import getPokemons from 'api/getPokemons'

import { ItemsPerPage, calculateMaxPageNum } from './index'

export const usePokemonsWithPagination = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(ItemsPerPage['12']!)

  const { data, isLoading, error } = useQuery<ReferenceResourceResponse, Error, ReferenceResourceResponse>(
    ['pokemons', page, limit],
    () => getPokemons(page * limit, limit),
    { keepPreviousData: true },
  )

  const totalPage = useMemo(() => (data?.count ? calculateMaxPageNum(data.count, limit) : 0), [data?.count, limit])

  const changeLimit = useCallback((event: SyntheticEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.currentTarget.value, 10))
  }, [])

  const loadPrevPage = useCallback(() => {
    if (data?.previous) {
      setPage(p => Math.max(0, p - 1))
    }
  }, [data?.previous])

  const loadNextPage = useCallback(() => {
    if (data?.next) {
      setPage(p => Math.min(totalPage, p + 1))
    }
  }, [data?.next])

  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(['pokemons', page, limit], () => getPokemons(page * limit, limit))
    }
  }, [data?.next, page, limit, queryClient])

  return useMemo(
    () => ({
      error,
      changeLimit,
      data,
      limit,
      loadNextPage,
      loadPrevPage,
      isLoading,
      totalPage,
    }),
    [error, changeLimit, data, limit, loadNextPage, loadPrevPage, isLoading, totalPage],
  )
}
