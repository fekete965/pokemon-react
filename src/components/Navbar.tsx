import { NavLink } from 'react-router-dom'

const linkClassName: (props: { isActive: boolean; isPending: boolean }) => string | undefined = ({ isActive }) =>
  isActive ? 'nav-item-active' : undefined

const Navbar = () => (
  <div>
    <ul className="nav-list">
      <li className="nav-item-container">
        <NavLink className={linkClassName} to="/" end>
          Home
        </NavLink>
      </li>
      <li className="nav-item-container">
        <NavLink className={linkClassName} to="/pokemons">
          Pokemon
        </NavLink>
      </li>
    </ul>
  </div>
)

export default Navbar
