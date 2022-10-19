import { ReactElement, createContext, useCallback, useContext, useMemo, useState } from 'react'

type FavouritesContextValue = {
  addToFavourites: (id: number) => void
  isFavourite: (id: number) => boolean
  favourites: number[]
  removeFromFavourites: (id: number) => void
}

const FavouritesContext = createContext<FavouritesContextValue | undefined>(undefined)

export const FavouritesProvider = ({ children }: { children: ReactElement }) => {
  const [favourites, setFavourites] = useState<number[]>([])

  const isFavourite = useCallback(
    (id: number) => {
      return favourites.findIndex(fav => fav === id) >= 0
    },
    [favourites],
  )

  const addToFavourites = useCallback(
    (id: number) => {
      if (isFavourite(id)) return
      setFavourites(fav => [...fav, id])
    },
    [isFavourite],
  )

  const removeFromFavourites = useCallback((id: number) => {
    setFavourites(fav => fav.filter(fav => fav !== id))
  }, [])

  const value = useMemo(
    () => ({
      addToFavourites,
      favourites,
      isFavourite,
      removeFromFavourites,
    }),
    [addToFavourites, favourites, isFavourite, removeFromFavourites],
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export const useFavourites = () => {
  const context = useContext(FavouritesContext)

  if (context === undefined) {
    throw new Error('useFavouritesData must be used within FavouritesProvider')
  }

  return context
}
