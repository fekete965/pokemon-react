import { NavLink } from 'react-router-dom'

const linkClassName: (props: { isActive: boolean; isPending: boolean }) => string | undefined = ({ isActive }) =>
  isActive ? 'font-semibold text-blue-700' : undefined

const Navbar = () => (
  <div>
    <ul className="flex flex-row">
      <li className="px-4 py-2 font-semibold hover:text-blue-700">
        <NavLink className={linkClassName} to="/" end>
          Home
        </NavLink>
      </li>
      <li className="px-4 py-2 font-semibold hover:text-blue-700">
        <NavLink className={linkClassName} to="/pokemons">
          Pokemon
        </NavLink>
      </li>
    </ul>
  </div>
)

export default Navbar
