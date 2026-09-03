import { useEffect, useState } from "react";
import type { User } from "../../shared.types";
import userService from "../../utils/userService";
import "./Users.css";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

// type UsersProps = {
//   user: User;
// };

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { user, handleLogout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }

    void loadUsers();
  }, []);

  if (!user) {
    navigate("/login");
  } else {
    return (
      <>
        <h2>Users</h2>
        <ul>
          {users.map((currentUser, index) => {
            return (
              <li>
                User {index + 1}: {currentUser.email}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
