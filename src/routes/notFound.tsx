import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="my-8 mx-auto max-w-[15rem]">
    <h1 className="title--big">Oops! 404</h1>
    <p className="text-center text-xl mt-4">
      <i>Not Found </i>
      <span role="img" aria-label="thinking">
        🤔
      </span>
    </p>
    <p className="mt-4 text-center text-sm text-blue-500">
      <Link to="/">Back to homepage</Link>
    </p>
  </div>
)

export default NotFound
