# React Authentication Lab

#### About

You will build a React client to interact with a provided Node.js and Express backend. The goal is to implement a complete authentication flow, including user signup, login, session management with JWTs, and protected routing.

#### User Stories

- As a new user, I want to be able to sign up with my email and password so I can create an account.
- As a registered user, I want to be able to log in with my email and password to access protected content.
- As a logged-in user, I want to be able to log out to end my session.
- As an unauthenticated user, I should be prevented from accessing protected pages.

#### Technical Requirements

Use Vite to scaffold a new React application with the TypeScript template.

Implement client-side routing using `react-router-dom`.

Use React hooks (`useState`, `useEffect`) for managing component state.

Build controlled forms for signup and login.

Use the `fetch` API to interact with the backend.

On successful login or signup, the client will receive a JSON Web Token. Store the JWT in the browser's `localStorage`. For requests to protected endpoints, include the JWT in the `Authorization` header with the Bearer scheme (e.g., `Authorization: Bearer <token>`).

Basic styling is sufficient. The focus is on functionality.

#### Setting Up the Backend

The backend runs in Docker, alongside a MongoDB container. Clone this repo and `cd` into it:

```bash
cd react-auth-lab
```

Start the backend and database in the background:

```bash
docker compose up --build -d
```

Confirm both containers are running:

```bash
docker ps
```

You should see two containers, `mongo` and `api`. If either is missing, check the logs:

```bash
docker compose logs api
docker compose logs mongo
```

The server runs on `http://localhost:3000`.

#### Setting Up the Frontend

Scaffold your React app inside the cloned repo:

```bash
npm create vite@latest react-login-lab -- --template react-ts
cd react-login-lab
npm install
```

Since your React dev server and the Express API run on different ports, set up a proxy so requests to `/api` get forwarded to the backend. Add this to `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
```

The target is `localhost`, not a Docker service name, since your Vite dev server runs directly on your machine, not inside Docker, so it can only reach the backend through the port `docker-compose.yml` exposes to your host.

Start the dev server:

```bash
npm run dev
```

#### API Endpoints

`POST /api/auth/signup` creates a new user. Body: `{ "email": "user@example.com", "password": "yourpassword" }`

`POST /api/auth/login` authenticates a user and returns a JWT. Body: `{ "email": "user@example.com", "password": "yourpassword" }`

`GET /api/users` is protected, and returns a list of all users. Requires a valid JWT.

#### Route Requirements

`/login` is a public route that displays the login form.

`/signup` is a public route that displays the signup form.

`/` is a protected route that displays a welcome message or dashboard for authenticated users. Unauthenticated users should be redirected to `/login`.

The navbar should be visible on all pages. For unauthenticated users, it should show links to Login and Signup. For authenticated users, it should show a Logout button. Clicking Logout should clear the JWT from `localStorage` and redirect to `/login`.

#### Bonus Challenge

In your main authenticated view (at the `/` route), fetch the list of users from the protected `/api/users` endpoint and display their emails. This will require you to properly attach the JWT to your fetch request.
