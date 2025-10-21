import { Link, NavLink } from "react-router-dom";

const NavLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "#about",
  },
  {
    name: "Services",
    path: "#services",
  },
  {
    name: "Contact",
    path: "#contact",
  },
  {
    name: "Find a Provider",
    path: "/find-a-provider"
  }
];

const Navigation = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <nav className="w-full px-4 sm:px-8  lg:px-25 h-25 flex items-center justify-between">
        <div>
          <img src="/logo.png" alt="Logo" className="h-25" />
        </div>
        <ul className="flex space-x-8">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-lg font-medium rounded-md ${
                    isActive
                      ? " text-gray-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <Link to="/login">
            <button className="border border-blue-600 px-8 text-primary py-2 rounded-md hoverBg text-base">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 text-white text-base">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;