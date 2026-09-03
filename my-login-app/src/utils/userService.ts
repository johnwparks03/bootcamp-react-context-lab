import tokenService from "./tokenService";
import type { RandomUser, RandomUserApiResult, User } from "../shared.types";
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

function transformRandomUser(
  randomUserApiResult: RandomUserApiResult,
): RandomUser {
  return {
    name: `${randomUserApiResult.name.title} ${randomUserApiResult.name.first} ${randomUserApiResult.name.last}`,
    email: randomUserApiResult.email,
    picture: randomUserApiResult.picture.large,
  };
}

async function getRandomUser(): Promise<RandomUser> {
  try {
    const res = await axios.get("https://randomuser.me/api/", {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    console.log(`Random User: ${res.data}`);
    return transformRandomUser(res.data.results[0]);
  } catch (err) {
    console.log("err", "this is error", err);
    throw new Error("Failed to return random user!");
  }
}

export default {
  signup,
  getUser,
  logout,
  login,
  getUsers,
  getRandomUser,
};
