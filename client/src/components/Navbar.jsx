import { NavLink } from 'react-router-dom';

const links = [
  ['Dashboard', '/dashboard'],
  ['Lesson', '/lesson'],
  ['Assignment', '/assignment'],
  ['Progress', '/progress'],
  ['Weekly Challenge', '/weekly-challenge']
];

function Navbar() {
  return (
    <header className="navbar">
      <h1>AI Learning Coach</h1>
      <nav>
        {links.map(([label, path]) => (
          <NavLink key={path} to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
