# Express JWT Auth Template

## About

This repo is an Express JWT Auth template meant to be paired with a front-end app utilizing JWT tokens.

## Requirements

Use Node.js `20.19+` and make sure MongoDB is running locally.

## Getting started

From this directory, install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

The default local values are:

```plaintext
MONGODB_URI=mongodb://127.0.0.1:27017/react-auth-lab
JWT_SECRET=dev-secret
PORT=3000
```

Start the app in your terminal with:

``` sh
npm run dev
```
