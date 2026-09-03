import type { User } from "../../shared.types";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useUser } from "../../contexts/UserContext";
import { useTheme } from "../../contexts/ThemeContext";

// type NavBarProps = {
//   user: User | null;
//   handleLogout: () => void;
// };

export default function NavBar() {
  const navigate = useNavigate();
  const { user, handleLogout } = useUser();
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return (
      <nav>
        <ul className="NavBar">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <button type="button" onClick={toggleTheme}>
              {theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="NavBar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Users">Users</Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
        <li>
          <button type="button" onClick={toggleTheme}>
            {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
