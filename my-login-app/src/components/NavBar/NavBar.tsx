import type { User } from "../../shared.types";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

type NavBarProps = {
  user: User | null;
  handleLogout: () => void;
};

export default function NavBar({ user, handleLogout }: NavBarProps) {
  const navigate = useNavigate();

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
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
