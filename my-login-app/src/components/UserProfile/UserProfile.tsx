import { useEffect, useState } from "react";
import userService from "../../utils/userService";
import { type RandomUser } from "../../shared.types";
import "./UserProfile.css";

export default function UserProfile() {
  const [randomUser, setRandomUser] = useState<RandomUser>();

  useEffect(() => {
    async function loadRandomUser() {
      try {
        const data = await userService.getRandomUser();
        setRandomUser(data);
      } catch (err) {
        console.log(err);
      }
    }

    void loadRandomUser();
  }, []);

  return (
    <>
      <div className="UserProfile">
        <h1>Home Page</h1>
        <h2>Random User</h2>
        <div className="UserCard">
          <p>Name: {randomUser?.name}</p>
          <p>Email: {randomUser?.email}</p>
          <img
            src={randomUser?.picture}
            alt={`Picture of ${randomUser?.name}`}
          />
        </div>
      </div>
    </>
  );
}
