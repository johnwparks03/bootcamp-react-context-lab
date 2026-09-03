import { useEffect, useState } from "react";
import type { User } from "../../shared.types";
import userService from "../../utils/userService";
import "./Users.css";

type UsersProps = {
  user: User;
};

export default function Users(props: UsersProps) {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <>
      <h1>Home Page</h1>
      <h2>Welcome {props.user.email}</h2>
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
