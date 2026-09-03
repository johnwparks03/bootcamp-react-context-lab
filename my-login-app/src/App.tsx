import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import type { User } from "./shared.types";

import userService from "./utils/userService";
import NavBar from "./components/NavBar/NavBar";
import Users from "./components/Users/Users";
import { UserProvider } from "./contexts/UserContext";
import UserProfile from "./components/UserProfile/UserProfile";
import ThemeProvider from "./contexts/ThemeContext";

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
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  if (!user) {
    return (
        <UserProvider user={user} handleLogout={handleLogout}>
          <NavBar></NavBar>
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
        </UserProvider>
    );
  }

  return (
      <UserProvider user={user} handleLogout={handleLogout}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<UserProfile></UserProfile>} />
          <Route path="/users" element={<Users></Users>}></Route>
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
        </Routes>
      </UserProvider>
  );
}

export default App;
