## Welcome to 3ViA - Tactical gamified quizes [ work in progress ]
<br />

---
[Live demo](https://trivia-monorepo-client-movf6.ondigitalocean.app/)

[Technical article](https://dev.to/zdravkokirilov/monorepo-code-sharing-with-the-mern-stack-3via-series-part-2-3dbj)

---
<br />

The project is scaffolded with NX as a monorepo with the goal of demonstrating code sharing between the front end React application and the back end Nest.js API.

Some of the technologies used are react-query, react-hook-form, MUI, zod.

## Structure

The main 3 parts reside in the "packages" folder:
- "client" holds the FE React code
- "api is for the "Nest.js" BE
- "core" is a library which is imported in both FE and BE though which we do code sharing

## Notes

- BE data is kept in memory for simplicity so it's lost after a server restart
- both FE and BE get deployed automatically to Digital Ocean whenever the main branch gets updated