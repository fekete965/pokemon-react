import { useParams } from 'react-router-dom'

const Pokemon = () => {
  const { pokemonId } = useParams()

  return (
    <>
      <h1 className="my-4 text-2xl font-semibold text-center">Pokemon App</h1>
      <h1>{pokemonId}</h1>
    </>
  )
}

export default Pokemon
