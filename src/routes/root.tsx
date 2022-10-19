import Navbar from 'components/Navbar'
import Pokemons from 'components/Pokemons'

const Home = () => (
  <>
    <Navbar />
    <h1 className="my-4 text-2xl font-semibold text-center">Pokemon App</h1>
    <Pokemons />
  </>
)

export default Home
