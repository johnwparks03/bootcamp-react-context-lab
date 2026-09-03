import tokenService from "./tokenService";
import type { User } from "../shared.types";
import axios from "axios";

const BASE_URL = "/api/auth/";

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupData = {
  username: string;
  email: string;
  password: string;
  passwordConf: string;
};

async function signup(user: SignupData): Promise<void> {
  try {
    const res = await axios.post(BASE_URL + "signup", user);
    tokenService.setToken(res.data.token);
  } catch (err) {
    console.log(err, " this is err");
    throw new Error("Email already taken!");
  }
}

function getUser(): User | null {
  return tokenService.getUserFromToken();
}

function logout(): void {
  tokenService.removeToken();
}

async function login(creds: LoginCredentials): Promise<void> {
  try {
    const res = await axios.post(BASE_URL + "login", creds);
    tokenService.setToken(res.data.token);
  } catch (err) {
    console.log("err", "this is error", err);
    throw new Error("Bad Credentials!");
  }
}

async function getUsers(): Promise<User[]> {
  try {
    // const res = await axios.get("/api/users")
    const res = await axios.get<User[]>("/api/users", {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("err", "this is error", err);
    throw new Error("Failed to return users!");
  }
}

export default {
  signup,
  getUser,
  logout,
  login,
  getUsers,
};
