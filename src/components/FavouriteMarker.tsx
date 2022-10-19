import { FC } from 'react'

import StarIcon from 'icons/StarIcon'
import StarIconSolid from 'icons/StarIconSolid'

import { useFavourites } from 'context/FavouritesContext'

type Props = {
  id: number
}

const FavouriteMarker: FC<Props> = ({ id }) => {
  const { addToFavourites, isFavourite, removeFromFavourites } = useFavourites()
  const isFavouritePokemon = isFavourite(id)
  const handleAddFavourite = () => addToFavourites(id)

  const handleRemoveFavourite = () => removeFromFavourites(id)

  return (
    <>
      {isFavouritePokemon ? (
        <StarIconSolid onClick={handleRemoveFavourite} />
      ) : (
        <StarIcon onClick={handleAddFavourite} />
      )}
    </>
  )
}

export default FavouriteMarker
