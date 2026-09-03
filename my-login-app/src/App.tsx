import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import type { User } from "./shared.types";

import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import Users from "./components/Users/Users";

function App() {
  const navigate = useNavigate();
  // the userService.getUser() when the page loads it goes into localstorage and looks for a jwt
  // token, decodes and sets it in state
  const [user, setUser] = useState<User | null>(userService.getUser());

  function handleSignUpOrLogin() {
    // we call this function after userService.login(), or userService.signup()
    // in order to get the token sent back from express and store the decoded token in the state
    setUser(userService.getUser());
  }

  async function handleLogout() {
    try {
      await userService.logout();
      setUser(userService.getUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  if (!user) {
    return (
      <>
        <NavBar user={null} handleLogout={handleLogout}></NavBar>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout}></NavBar>
      <Routes>
        <Route path="/" element={<Users user={user}></Users>} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Routes>
    </>
  );
}

export default App;
